import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import "./styles/activity.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import {ErrorText,IconUser, InputUser, InputGroup, Defaultvalue} from './elements/ElementsFormStyles';
import { msgValidationActivitiesName, msgValidationDuplicated, msgValidationCategoryDescription} from './helpers/validationMessages';
import {regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";


const FormActivity = ({match,history}) => {

  const id  = match.params.id;

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const [activities, setActivities] = useState({ 
          id:"", 
          name: "", 
          image:"",
          content:""          
        });
    
  const [duplicated,setDuplicated]=useState('')

  //DEFAULT VALUES
  useEffect(() => {
    const getActivity = async () => {
      await axiosClient.get(`/activities/${id}`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getActivity();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("content",values.content);
    body.append("image",values.image);
  
    const updateActivity = async () => {
      await axiosClient
        .put(`/activities/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setActivities(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de actividad exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/ActivitiesAll");
          }
        })
        .catch((error=>{
          console.log(error);
        }));
    };
    updateActivity();
  };
  
  //DUPLICATED NAME
  const repeat= (searchName,errors)=>{
    if (errors.formOk !=='v'){
      getActivityByName(searchName)
    }
  };

  const getActivityByName = async (searchName) => {
    await axiosClient.get(`/activities/byName/${searchName}`)
    .then((response) => {
      if(response.status===404){
        setDuplicated(' ')
      } else {
        setDuplicated(response.data.name)
      }
    })
    .catch((error=>{
      console.log(error);
    }));
  }; 

  
  //FORMIK INITIAL VALUES
  let initialValues={name:activities.name, content:activities.content}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   

    let errors = {name:'', image:'',content:'',  
                  icoNname:'', icoNimage:'', icoNcontent:'',formOk:''};  

    if (!values.name) {
      values.name=activities.name;
    }

    if (!regexActivitiesName.test(values.name)) {
      errors.name=msgValidationActivitiesName
      errors.icoNname= X
      errors.formOk='f'
      return errors
    } else {
      errors.icoNname=V
      errors.formOk='v'
    }

    let searchName=values.name
    repeat(searchName, errors)
    if(duplicated===searchName){
      errors.name=msgValidationDuplicated
      errors.icoNname= X    
      errors.formOk='f'     
      return errors
    } else {
      errors.icoNname=V
      errors.formOk='v'
    };

    if (!values.image) {
      values.image=activities.image;
    };

    if (!values.content) {
      values.content=activities.content
    };

    if (!regexCategoryDescription.test(values.content)) {
      errors.content=msgValidationCategoryDescription
      errors.icoNcontent= X
      errors.formOk='f'
      return errors
    } else {
      errors.icoNcontent=V
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
            <h4 className="mb-4 flex-Center m-auto">Nuevos valores</h4> 
              <div>
                <div className="w-75 m-auto">           
                    <InputGroup className="d-block">
                      <label htmlFor='name'>Actividad</label>
                      <InputUser className="form-control pt-1"
                        type="text"
                        name="name"
                        placeholder='Ingrese nuevo nombre'
                        required
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                        <Defaultvalue> actual : {activities.name} </Defaultvalue>
                      </InputGroup>
                </div>
                {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
              </div>
              <div>
                <div className="w-75 mb-3 m-auto">          
                  <InputGroup className="d-block">
                    <label  htmlFor='image'>Imágen</label>
                    <input className=" pt-1 d-block"
                      type="file"
                      name="image"
                      required
                      encType="multipart/form-data"
                      onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                      onBlur={handleBlur}
                    />
                    {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                    <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={activities.image}  alt="categoryImage" />} </Defaultvalue>
                  </InputGroup>
                </div>
                {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
              </div>
              <div>
                <div className="w-75 m-auto">          
                  <InputGroup className="d-block">
                    <label  htmlFor='content'>Descripción</label>
                    <InputUser className="form-control pt-1"
                      type="text"
                      name="content"
                      required
                      placeholder="Ingrese nueva descripción"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
                    <Defaultvalue>actual : {activities.content} </Defaultvalue>
                  </InputGroup>
                </div>
                {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
              </div>  
            <h5 className="h5Update mt-2">( todos los campos son obligatorios )</h5>
           
            <div className="buttonsResponsive">
              <Link to={"/ActivitiesAll"} className="btn buttonBlue"  role="button" > Volver </Link>
              <button type="submit" className="btn buttonBlue buttonGreen "> Guardar </button>
            </div> 
           
          </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormActivity;
