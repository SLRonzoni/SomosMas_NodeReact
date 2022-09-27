import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired, msgValidationActivitiesName, msgValidationCategoryDescription} from './helpers/validationMessages';
import { regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";
import "./styles/styles.css";

function MembersCreate(props) {
  
  const [members, setMembers] = useState({
    name:"",
    description:"",
    image:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:""
  }); 


  //SEND
  const sendForm = (values) => {
  
    let body = new FormData()
    body.append("name",values.name);
    body.append("description",values.description);
    body.append("image",values.image);
    body.append("facebookUrl",values.facebookUrl);
    body.append("instagramUrl",values.instagramUrl);
    body.append("linkedinUrl",values.linkedinUrl);


    const saveMembers = async () => {
      await axiosClient
        .post("/members/create",body)     
        .then((response) => {
          if(response) {
            setMembers(response)
            console.log(response)
            Swal.fire({
              icon: "success",
              title: "Colaborador Agregado!",
              timer:1000,
              showConfirmButton: false
            });
            props.history.push("/MembersAll");
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
    saveMembers();
  };

//FORMIK INITIAL VALUES
let initialValues={name:members.name, description:members.description,
                   facebookUrl:members.facebookUrl, instagramUrl:members.instagramUrl,
                   linkedinUrl:members.linkedinUrl}

//FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {name: '', image:'',description:'', facebookUrl:"", instagramUrl:"", linkedinUrl:"",icoNname:'', icoNimage:'', icoNdescription:'', icoNfacebookUrl:"✔️",
                icoNinstagramUrl:'✔️', icoNlinkedinUrl:'✔️',formOk:''};  

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= '❌'
    return errors
  };

  if (!regexActivitiesName.test(values.name)) {
    errors.name=msgValidationActivitiesName
    errors.icoNname= '❌'
    return errors
  } else {
    errors.icoNname= '✔️'
  };

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= '❌'
    return errors
  } else {
    errors.icoNimage= '✔️'
  };

  if (!values.description) {
    errors.description=msgRequired
    errors.icoNdescription= '❌'
    return errors
  } else {
    errors.icoNdescription= '✔️'
  };

  if (!regexCategoryDescription.test(values.description)) {
    errors.description=msgValidationCategoryDescription
    errors.icoNdescription= '❌'
    return errors
  } else {
    errors.icoNdescription= '✔️'
  };



  if(errors.name || errors.image || errors.description || errors.facebookUrl || errors.instagramUrl|| errors.linkedinUrl){
    errors.formOk='f'
  } else {
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
  { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
       <form  className="container-sm col-6 col-md-6 bgGrey" onSubmit={handleSubmit}>
          <br></br>
          <h3 className="centerText">Nuevo colaborador ...</h3>
          <br></br>
          <div >

            <div>
              <div className="displayInLineFlex ">
                <InputForm
                  type="text"
                  name="name"
                  label="Nombre : " 
                  defaultValue=""
                  placeholder="Ingrese nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.icoNname && <Icon>{errors.icoNname}</Icon>}
              </div>
              {touched.name && errors.name && <ErrorText>{errors.name} </ErrorText> }
            </div>
           
            <div>
              <div className="displayInLineFlex">
                <InputForm
                  type="file"
                  name="image"
                  label="Imágen :"
                  encType="multipart/form-data"
                  defaultValue=''
                  onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                  onBlur={handleBlur}
                />
                {touched.image && errors.icoNimage && <Icon>{errors.icoNimage}</Icon>}
              </div>
              {touched.image && errors.image   && <ErrorText> {errors.image} </ErrorText>}
            </div>
           
            <div>
              <div className="displayInLineFlex">
                <InputForm
                  type="text"
                  name="description"
                  label="Detalle : "
                  defaultValue=""
                  placeholder="Ingrese detalle"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.icoNdescription && <Icon>{errors.icoNdescription}</Icon>}
              </div>
              {touched.description && errors.description  && <ErrorText> {errors.description} </ErrorText>}
            </div>
            
            <div>
              <div className="displayInLineFlex">
                <InputForm
                  type="text"
                  name="facebookUrl"
                  label="Facebook : "
                  defaultValue=""
                  placeholder="Ingrese facebook"
                  value={values.facebookUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.facebookUrl && errors.icoNfacebookUrl && <Icon>{errors.icoNfacebookUrl}</Icon>}
              </div>
              {touched.facebookUrl && errors.facebookUrl  && <ErrorText> {errors.facebookUrl} </ErrorText>}
            </div>
            
            <div>
              <div className="displayInLineFlex">
                <InputForm
                  type="text"
                  name="instagramUrl"
                  label="Instagram : "
                  defaultValue=""
                  placeholder="Ingrese instagram"
                  value={values.instagramUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.instagramUrl && errors.icoNinstagramUrl && <Icon>{errors.icoNinstagramUrl}</Icon>}
              </div>
              {touched.instagramUrl && errors.instagramUrl  && <ErrorText> {errors.instagramUrl} </ErrorText>}
            </div>
           
            <div>
              <div className="displayInLineFlex">
                <InputForm
                  type="text"
                  name="linkedinUrl"
                  label="Linkedin : "
                  defaultValue=""
                  placeholder="Ingrese linkedin"
                  value={values.linkedinUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.linkedinUrl && errors.icoNlinkedinUrl && <Icon>{errors.icoNlinkedinUrl}</Icon>}
              </div>
              {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText> {errors.linkedinUrl} </ErrorText>}
            </div>
          
            
          </div>
          { errors.formOk === "f" && 
            <MsjWrong> 
            <span className="centerText">
              <br /> Algun dato es incorrecto. 
              <br/> Por favor complete el formulario correctamente
            </span>        
            </MsjWrong>
          }
         
          <div>
            <br></br>
            <div className="centerText">
                <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                <Link 
                  to={"/MembersAll"}
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
export default MembersCreate;
