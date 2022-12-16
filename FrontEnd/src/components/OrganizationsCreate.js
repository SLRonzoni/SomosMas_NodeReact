import React, { useState } from "react";
import "./styles/styles.css";
import './styles/members-organizations.css';
import * as FaIcons from "react-icons/fa";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Formik } from 'formik';
import { ErrorText, InputUser, IconUser, Defaultvalue, InputGroup} from './elements/ElementsFormStyles';
import { msgRequired, msgValidationActivitiesName} from './helpers/validationMessages';
import { regexActivitiesName } from "./helpers/RegExp";
import buttonsResponsive from "./buttonsResponsive";


function OrganizationsCreate(props) {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
  const [organizations, setOrganizations] = useState({
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

    const saveOrganizations = async () => {
      await axiosClient
        .post("/organizations",body)     
        .then((response) => {
          if(response) {
            setOrganizations(response.data)
            Swal.fire({
              icon: "success",
              title: "Organization Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            props.history.push("/OrganizationsAll");
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
    saveOrganizations();
  };

  //FORMIK INITIAL VALUES
  let initialValues={name:organizations.name,
                    content:organizations.content}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   

    let errors = {name: '', image:'',content:'',  
                  icoNname:'', icoNimage:'', icoNcontent:'',formOk:''};  

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

    if (!values.content) {
      errors.content=msgRequired
      errors.icoNcontent= X
      return errors
    } else {
      errors.icoNcontent= V
    };

    if(errors.name || errors.image || errors.content){
      errors.formOk='f'
    } else {
      errors.formOk='v'
    };
  }


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
          <h4 className="mb-4 flex-Center">Nueva organización</h4>
          <div>
            <div className="w-75 mb-3 m-auto">          
              <InputGroup className="d-block">
                <label  htmlFor='image'>Imágen</label>
                <input className=" pt-1 d-block"
                  type="file"
                  name="image"
                  encType="multipart/form-data"
                  onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                  onBlur={handleBlur}
                />
                {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={organizations.image}  alt="ImágenOrganización"/>} </Defaultvalue>
              </InputGroup>
            </div>
            {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
          </div>

          <div>
            <div className="w-75 m-auto">           
              <InputGroup className="d-block">
                <label htmlFor='name'>Organización</label>
                <InputUser className="form-control pt-1"
                  type="text"
                  name="name"
                  placeholder="Ingrese nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                <Defaultvalue> actual : {organizations.name} </Defaultvalue>
            </InputGroup>
            </div>
            {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
          </div>
          <div>
            <div className="w-75 m-auto">          
              <InputGroup className="d-block">
                <label  htmlFor='content'>Descripción</label>
                <InputUser className="form-control pt-1"
                  type="text"
                  name="content"
                  placeholder="Ingrese descripción"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
                <Defaultvalue> actual : {organizations.content} </Defaultvalue>
              </InputGroup>
            </div>
            {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
          </div>
              
          {buttonsResponsive("/OrganizationsAll","Guardar")}          
        </form>
      )}
      </Formik>
    </div>
</>
);

}
export default OrganizationsCreate;