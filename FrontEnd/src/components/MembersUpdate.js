import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import './styles/members-organizations.css';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { InputUser,ErrorText,IconUser, Defaultvalue, InputGroup} from './elements/ElementsFormStyles';
import { msgValidationCategoryName,msgValidationCategoryDescription,msgValidationUrl} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryDescription, regexUrl} from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';
import * as FaIcons from "react-icons/fa";
import buttonsResponsive from "./buttonsResponsive";

const MembersUpdate = ({match, history}) => {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const id = match.params.id;

  const [members, setMembers] = useState({
    id: "",
    name: "",
    image:"",
    description:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:"",
    createdAt:"",
    updatedAt:""
  });
 
  //DEFAULT VALUES
  useEffect(() => {
    const getMember = async () => {
      await axiosClient.get(`/members/${id}`)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getMember();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("description",values.description);
    body.append("image",values.image);
    body.append("facebookUrl",values.facebookUrl);
    body.append("instagramUrl",values.instagramUrl);
    body.append("linkedinUrl",values.linkedinUrl);

  
    const updateMember = async () => {
      await axiosClient
        .put(`/members/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setMembers(response.data);
            Swal.fire({
              icon: "success",
              title: "Colaborador actualizado !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/MembersAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateMember();
  };



 //FORMIK INITIAL VALUES
  let initialValues={name:members.name, description:members.description,
                     facebookUrl:members.facebookUrl, instagramUrl:members.instagramUrl,
                     linkedinUrl:members.linkedinUrl}

//FORMIK VALIDATIONS   
  let validateInputs=(values) =>{    

    let errors = {name: '', image:'',description:'', facebookUrl:'', instagramUrl:'', linkedinUrl:'',icoNname:'', icoNimage:'',
                  icoNdescription:'', icoNfacebookUrl:'', icoNinstagramUrl:'', icoNlinkedinUrl:'',formOk:''};

    if(!values.image) {
        values.image=members.image
        errors.icoNimage= V
        return errors
    } else {
        errors.icoNimage=V
    };

    if (!values.name) {
      values.name=members.name
      errors.icoNname=V
      return errors
    }

    if (!regexCategoryName.test(values.name)) {
      errors.name=msgValidationCategoryName
      errors.icoNname= X
      return errors
    } else {
      errors.icoNname=V
    }

    if (!values.description) {
      values.description=members.description
      errors.icoNdescription=V
      return errors
    }

    if (!regexCategoryDescription.test(values.description)) {
      errors.description=msgValidationCategoryDescription
      errors.icoNdescription= X
      return errors
    } else {
      errors.icoNdescription=V
    }
  
    if(values.facebookUrl) {
      if(!regexUrl.test(values.facebookUrl)){
        errors.facebookUrl=msgValidationUrl
        errors.icoNfacebookUrl=X
        return errors
      } else{
        errors.icoNfacebookUrl=V
      }
    }else {
      values.facebookUrl=members.facebookUrl
      errors.icoNfacebookUrl=V
      return errors
    }  
  
    if(values.instagramUrl) {
      if(!regexUrl.test(values.instagramUrl)){
        errors.instagramUrl=msgValidationUrl
        errors.icoNinstagramUrl=X
        return errors
      } else{
        errors.icoNinstagramUrl=V
      }
    } else {
        values.instagramUrl=members.instagramUrl
        errors.icoNinstagramUrl=V
    }
  
    if(values.linkedinUrl) {
      if(!regexUrl.test(values.linkedinUrl)){
        errors.linkedinUrl=msgValidationUrl
        errors.icoNlinkedinUrl=X
       return errors
      } else{
        errors.icoNlinkedinUrl=V 
      }
    }else {
      values.linkedinUrl=members.linkedinUrl
      errors.icoNlinkedinUrl=V
    } 

    if(errors.name || errors.image || errors.description || errors.facebookUrl || errors.instagramUrl|| errors.linkedinUrl){
      errors.formOk='f'
    } else {
      errors.formOk='v'
    }
  };

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
        <h4 className="mb-5 flex-Center">Nuevos datos</h4>

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
                <Defaultvalue>  actual : {<img className="imageSmall" src={members.image}  alt="memberImage"/>} </Defaultvalue>
              </InputGroup>
          </div>
          {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
        </div>            
          
        <div>
          <div className="w-75 m-auto">           
            <InputGroup className="d-block">
              <label htmlFor='name'>Nombre</label>
              <InputUser className="form-control pt-1"
                type="text"
                name="name"
                placeholder="Ingrese nuevo nombre"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                <Defaultvalue> actual : {members.name} </Defaultvalue>
                </InputGroup>
          </div>
          {touched.name && errors.name && <ErrorText className="errorTextUpdate" >{errors.name} </ErrorText> }
        </div> 
         
        <div>
          <div className="w-75 m-auto">           
            <InputGroup className="d-block">
              <label htmlFor='description'>Detalle</label>
              <textarea className="form-control borderRounded"
                type='text'
                rows='3'
                cols='75'
                name="description"
                placeholder="Ingrese nuevo detalle"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
              <Defaultvalue> actual : {members.name} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
        </div>
                
        <div>
          <div className="w-75 m-auto">           
            <InputGroup className="d-block">
              <label htmlFor='facebookUrl'>Facebook</label>
              <InputUser className="form-control pt-1"
                type="text"
                name="facebookUrl"
                placeholder="Ingrese nuevo facebook"
                value={values.facebookUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {touched.facebookUrl && errors.icoNfacebookUrl && <IconUser className="mt-4">{errors.icoNfacebookUrl}</IconUser>}
                <Defaultvalue> actual : {members.facebookUrl} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.facebookUrl && errors.facebookUrl  && <ErrorText  className="errorTextUpdate"> {errors.facebookUrl} </ErrorText>}
        </div>
            
        <div>
          <div className="w-75 m-auto">           
            <InputGroup className="d-block">
              <label htmlFor='instagramUrl'>Instagram</label>
              <InputUser className="form-control pt-1"
                type="text"
                name="instagramUrl"
                placeholder="Ingrese nuevo instagram"
                value={values.instagramUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {touched.instagramUrl && errors.icoNinstagramUrl && <IconUser className="mt-4">{errors.icoNinstagramUrl}</IconUser>}
                <Defaultvalue> actual : {members.instagramUrl} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.instagramUrl && errors.instagramUrl  && <ErrorText  className="errorTextUpdate"> {errors.instagramUrl} </ErrorText>}
        </div>
         
        <div >
          <div className="w-75 m-auto">           
            <InputGroup className="d-block">
              <label htmlFor='name'>LinkedIn</label>
              <InputUser className="form-control pt-1"
              type="text"
              name="linkedinUrl"
              placeholder="Ingrese nuevo linkedin"
              value={values.linkedinUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {touched.linkedinUrl && errors.icoNlinkedinUrl && <IconUser className="mt-4">{errors.icoNlinkedinUrl}</IconUser>}
              <Defaultvalue> actual : {members.linkedinUrl} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText  className="errorTextUpdate"> {errors.linkedinUrl} </ErrorText>}
        </div>
        
        <div className="flex-Center">
          <div>
            <label htmlFor="name">Creado  :
              <span className="fontNotBold " >{formatDate(new Date(members.createdAt))}</span>
            </label>
          </div>
          <div className="ms-4"> 
            <label htmlFor="name">Última modificación  :
              <span className=" fontNotBold" >{formatDate(new Date(members.updatedAt))}</span>
            </label>
          </div>
        </div>
        {buttonsResponsive("/MembersAll","Guardar")}   
      </form>
      )}
    </Formik>
    </div>
  </>
);

}

export default MembersUpdate;