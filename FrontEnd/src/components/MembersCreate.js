import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import {ErrorText,IconUser, InputUser, InputGroup} from './elements/ElementsFormStyles';
import { msgRequired, msgValidationActivitiesName, msgValidationCategoryDescription} from './helpers/validationMessages';
import { regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";
import "./styles/styles.css";
import './styles/members-organizations.css';
import * as FaIcons from "react-icons/fa";

function MembersCreate(props) {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
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
        .post("/members",body)     
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

  let errors = {name: '', image:'',description:'', facebookUrl:"", instagramUrl:"", linkedinUrl:"",
               icoNname:'', icoNimage:'', icoNdescription:'', icoNfacebookUrl:V,
               icoNinstagramUrl:V, icoNlinkedinUrl:V,formOk:''};  

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= X
    return errors
  };

  if (!regexActivitiesName.test(values.name)) {
    errors.name=msgValidationActivitiesName
    errors.icoNname= X
    return errors
  } else {
    errors.icoNname= V
  };

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= X
    return errors
  } else {
    errors.icoNimage= V
  };

  if (!values.description) {
    errors.description=msgRequired
    errors.icoNdescription= X
    return errors
  } else {
    errors.icoNdescription= V
  };

  if (!regexCategoryDescription.test(values.description)) {
    errors.description=msgValidationCategoryDescription
    errors.icoNdescription=X
    return errors
  } else {
    errors.icoNdescription= V
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
  <div className="containerFirst">
  <Formik
       initialValues={initialValues}           
       validate={validateInputs}
       onSubmit={(values)=>{ sendForm(values)}}
  >
  { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
       <form  className="containerFormUpdate" onSubmit={handleSubmit}>
          <h4 className="mb-4 flex-Center">Nuevo colaborador</h4>
          <div>
              <div className="w-75 m-auto mb-3">           
                <InputGroup className="d-block">
                  <label htmlFor='image'>Imágen</label>
                  <input className="pt-1 d-block"
                    type="file"
                    name="image"
                    label="Imágen :"
                    encType="multipart/form-data"
                    defaultValue=''
                    onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                    onBlur={handleBlur}
                  />
                  {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                </InputGroup>
              </div>
              {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
            </div>
            <div>
              <div className="w-75 m-auto mb-3">           
                <InputGroup className="d-block">
                  <label htmlFor='name'>Nombre</label>
                  <InputUser className="form-control pt-1"
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
                  <label htmlFor='description'>Descripción</label>
                  <InputUser className="form-control pt-1"
                  type="text"
                  name="description"
                  placeholder="Ingrese detalle"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
                </InputGroup>
              </div>
              {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
            </div>
            
            <div>
             <div className="w-75 m-auto mb-3">           
                <InputGroup className="d-block">
                  <label htmlFor='facebookUrl'>Facebook</label>
                  <InputUser className="form-control pt-1"
                    type="text"
                    name="facebookUrl"
                    placeholder="Ingrese facebook"
                    value={values.facebookUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.facebookUrl && errors.icoNfacebookUrl && <IconUser className="mt-4">{errors.icoNfacebookUrl}</IconUser>}
                  </InputGroup>
              </div>
              {touched.facebookUrl && errors.facebookUrl  && <ErrorText className="errorTextUpdate"> {errors.facebookUrl} </ErrorText>}
            </div>
            
            <div>
              <div className="w-75 m-auto mb-3">           
                <InputGroup className="d-block">
                  <label htmlFor='instagramUrl'>Instagram</label>
                  <InputUser className="form-control pt-1"
                    type="text"
                    name="instagramUrl"
                    placeholder="Ingrese instagram"
                    value={values.instagramUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.instagramUrl && errors.icoNinstagramUrl && <IconUser className="mt-4">{errors.icoNinstagramUrl}</IconUser>}
                </InputGroup>
              </div>
              {touched.instagramUrl && errors.instagramUrl  && <ErrorText className="errorTextUpdate"> {errors.instagramUrl} </ErrorText>}
            </div>
           
            <div>
            <div className="w-75 m-auto mb-3">           
                <InputGroup className="d-block">
                  <label htmlFor='linkedinUrl'>Linkedin</label>
                  <InputUser className="form-control pt-1"
                  type="text"
                  name="linkedinUrl"
                  placeholder="Ingrese linkedin"
                  value={values.linkedinUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.linkedinUrl && errors.icoNlinkedinUrl && <IconUser className="mt-4">{errors.icoNlinkedinUrl}</IconUser>}
                </InputGroup>
              </div>
              {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText className="errorTextUpdate"> {errors.linkedinUrl} </ErrorText>}
            </div>
          
            <div className="buttonsResponsive"> 
              <Link to={"/MembersAll"} className="btn buttonBlue"role="button"> Volver </Link>
              <button type="submit" className="btn buttonBlue buttonGreen "> Guardar </button>
          </div> 
        </form>
    )}
  </Formik>
  </div>
</>
);

}
export default MembersCreate;
