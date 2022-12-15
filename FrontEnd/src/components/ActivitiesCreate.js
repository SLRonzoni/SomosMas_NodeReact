import React, { useState } from "react";
import "./styles/styles.css";
import "./styles/activity.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as FaIcons from "react-icons/fa";
import { ErrorText,InputGroup, IconUser, InputUser} from './elements/ElementsFormStyles';
import { msgRequired, msgValidationActivitiesName, msgValidationCategoryDescription} from './helpers/validationMessages';
import { regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";

function ActivitiesCreate(props) {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
  const [ activities,setActivities] = useState({
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
      await axiosClient.post("/activities",body)     
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
    errors.icoNname= X
    return errors
  }

  if (!regexActivitiesName.test(values.name)) {
    errors.name=msgValidationActivitiesName
    errors.icoNname= X
    errors.formOk='f'
    return errors
  } else {
    errors.icoNname= V
    errors.formOk='v'
  }

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= X
    return errors
  }

  if (!values.content) {
    errors.content=msgRequired
    errors.icoNcontent= X
    return errors
  }

  if (!regexCategoryDescription.test(values.content)) {
    errors.content=msgValidationCategoryDescription
    errors.icoNcontent= X
    errors.formOk='f'
    return errors
  } else {
    errors.icoNcontent= V
    errors.formOk='v'
  };
}

//FORM
return (
        <>
          <div className="containerFirst">
            <Formik
                initialValues={initialValues}           
                validate={validateInputs}
                onSubmit={(values)=>{ sendForm(values)}}
            >
            { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
              <form  className="containerFormUpdate" onSubmit={handleSubmit}>
                <h4 className="mb-5 flex-Center">Nueva actividad</h4>
                  <div>
                    <div className="w-75 m-auto mb-3">  
                      <InputGroup className="d-block">
                        <label htmlFor='image'>Imágen</label>
                        <input className=" pt-1 d-block"
                          type="file"
                          name="image"
                          encType="multipart/form-data"
                          onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                          onBlur={handleBlur}
                        />
                        {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                        </InputGroup>
                    </div>
                    {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                  </div>
                  <div>
                    <div className="w-75 mb-3 m-auto"> 
                      <InputGroup className="d-block">
                        <label htmlFor='name'>Nombre y Apellido</label>
                        <InputUser className="form-control"
                          type="text"
                          name="name"
                          placeholder="Ingrese nombre"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                      </InputGroup>
                    </div>
                    {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                  </div>
                  <div>
                    <div className="w-75 m-auto mb-3">
                      <InputGroup className="d-block">
                        <label htmlFor='content'>Descripción</label>
                        <InputUser className="form-control pt-1"
                          type="text"
                          name="content"
                          required
                          placeholder="Ingrese descripción"
                          value={values.content}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
                        </InputGroup>
                    </div>
                    {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
                  </div>
                  
                  <div className="buttonsResponsive">
                    <Link to={"/ActivitiesAll"} className="btn buttonBlue"> Volver </Link>
                    <button type="submit" className="btn buttonBlue buttonGreen"> Guardar </button>
                  </div> 
                
                </form>
              )}
            </Formik>
          </div>
        </>
     );

}
export default ActivitiesCreate;