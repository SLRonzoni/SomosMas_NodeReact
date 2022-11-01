import React, { useState } from "react";
import "./styles/styles.css";
import "./styles/activity.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { SendButton, MsjWrong, ErrorText,Label, InputGroup, IconUser, InputUser} from './elements/ElementsFormStyles';
import { msgRequired, msgValidationActivitiesName, msgValidationCategoryDescription} from './helpers/validationMessages';
import { regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";

function ActivitiesCreate(props) {
  
  const [ setActivities] = useState({
    name: "",
    content:"",
    image:""        
  });


  //SEND
  const sendForm = (values) => {
  
    let body = new FormData()
    body.append("name",values.name);
    body.append("content",values.content);
    body.append("image",values.image);

    const saveActivities = async () => {
      await axiosClient
        .post("/activities",body)     
        .then((response) => {
          if(response) {
            setActivities(response.data)
            Swal.fire({
              icon: "success",
              title: "Actividad Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            props.history.push("/ActivitiesAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
          icon:"error",
          title: "Error",
          text: error,
          });
        });
    };
    saveActivities();
  };

//FORMIK INITIAL VALUES
let initialValues={name:"", content:""}

//FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {name: '', image:'',content:'',  
                icoNname:'', icoNimage:'', icoNcontent:'',formOk:''};  

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= '❌'
    return errors
  }

  if (!regexActivitiesName.test(values.name)) {
    errors.name=msgValidationActivitiesName
    errors.icoNname= '❌'
    errors.formOk='f'
    return errors
  } else {
    errors.icoNname= '✔️'
    errors.formOk='v'
  }

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= '❌'
    return errors
  }

  if (!values.content) {
    errors.content=msgRequired
    errors.icoNcontent= '❌'
    return errors
  }

  if (!regexCategoryDescription.test(values.content)) {
    errors.content=msgValidationCategoryDescription
    errors.icoNcontent= '❌'
    errors.formOk='f'
    return errors
  } else {
    errors.icoNcontent= '✔️'
    errors.formOk='v'
  };
}

//FORM
return (
  <>
  <Formik
       initialValues={initialValues}           
       validate={validateInputs}
       onSubmit={(values)=>{ sendForm(values)}}
  >
  { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
       <form  className="containerUpdateCreate containerBorderWhiteBgGrey" onSubmit={handleSubmit}>
          <h3 className="centerText">Nueva actividad</h3>
          <br></br>
          <div className='centerText'>
            <div>
              <div className="displayFlex"> 
                <Label className="labelWidthForm" htmlFor='name'>Nombre y Apellido</Label>
                <InputGroup>
                  <InputUser
                    type="text"
                    name="name"
                    placeholder="Ingrese nombre"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.icoNname && <IconUser>{errors.icoNname}</IconUser>}
                </InputGroup>
              </div>
              {touched.name && errors.name && <ErrorText>{errors.name} </ErrorText> }
            </div>
            <br></br>
            <div className='centerText'>
            <div>
              <div className="displayFlex">
                <Label className="labelWidthForm" htmlFor='image'>Imágen</Label>
                <InputGroup >
                  <InputUser className="form-control"
                    type="file"
                    name="image"
                    encType="multipart/form-data"
                    onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                    onBlur={handleBlur}
                  />
                  {touched.image && errors.icoNimage && <IconUser>{errors.icoNimage}</IconUser>}
                  </InputGroup>
              </div>
              {touched.image && errors.image   && <ErrorText> {errors.image} </ErrorText>}
            </div>
            <br></br>
            <div>
              <div className="displayFlex">
                <Label className="labelWidthForm" htmlFor='content'>Descripción</Label>
                <InputGroup>
                  <InputUser
                    type="text"
                    name="content"
                    placeholder="Ingrese descripción"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.content && errors.icoNcontent && <IconUser>{errors.icoNcontent}</IconUser>}
                  </InputGroup>
              </div>
              {touched.content && errors.content  && <ErrorText> {errors.content} </ErrorText>}
            </div>
            <br></br>
            </div>

          { errors.formOk === "f" && 
            <MsjWrong> 
            <span className="centerText">
              <br /> Algun dato es incorrecto. 
              <br/> Por favor complete el formulario correctamente
            </span>        
            </MsjWrong>
          }
         </div>
          <div>
            <div className="centerText">
                <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                <Link 
                  to={"/ActivitiesAll"}
                  className="m-3 mr-md-2 btn buttonBlue"
                  role="button"
                > Volver
                </Link>
            </div> 
          </div>
          
        </form>
    )}
  </Formik>
</>
);

}
export default ActivitiesCreate;