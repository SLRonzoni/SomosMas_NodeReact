import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,IconUser, InputUser, InputGroup, Defaultvalue} from './elements/ElementsFormStyles';
import { msgRequired,msgValidationActivitiesName, msgValidationDuplicated, msgValidationCategoryDescription} from './helpers/validationMessages';
import {regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";


const FormActivity = ({match,history}) => {

  const id  = match.params.id;

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
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
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

    let searchName=values.name
    repeat(searchName, errors)
    if(duplicated===searchName){
      errors.name=msgValidationDuplicated
      errors.icoNname= '❌'    
      errors.formOk='f'     
      return errors
    } else {
      errors.icoNname= '✔️'
      errors.formOk='v'
    };

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
            <h3 className="centerText displayFlex ">Nuevos valores</h3> 
            <div  className='centerText'>
              <div>
                <div>
                  <div className="displayFlex ">
                    <Label className="labelWidthForm" htmlFor='name'>Nombre</Label>
                    <Defaultvalue className="defaultValueWidthForm" >( actual : {activities.name} )</Defaultvalue>
                  </div>
                  <InputGroup >
                    <InputUser
                      type="text"
                      name="name"
                      placeholder='Ingrese nuevo nombre '
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
              <div>
                <div className="displayFlex">
                  <Label className="labelWidthForm" htmlFor='image'>Imágen</Label>
                  <Defaultvalue> {<img className="imageSmallUpdateForm" src={activities.image}  alt="categoryImage"/>} </Defaultvalue>
                </div>
                <InputGroup >
                  <InputUser
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
            <div>
              <div className="displayFlex">
                <Label className="labelWidthForm" htmlFor='content'>Descripción</Label>
                <Defaultvalue className="defaultValueWidthForm" >( actual : {activities.content} )</Defaultvalue>
              </div>
              <InputGroup>
                <InputUser
                  type="text"
                  name="content"
                  placeholder="Ingrese nueva descripción"
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
           
            <div>
              <span>( todos los campos son obligatorios )</span>
              <div className="centerText">
                  <SendButton type="submit" className="m-1 btn btn-primary md-end "> Guardar </SendButton>
                  <Link to={"/ActivitiesAll"} className="m-1 mr-md-2 btn buttonBlue"  role="button" > Volver </Link>
              </div> 
            </div>
            </div>
          </form>
      )}
    </Formik>
  </>
  );
  
};

export default FormActivity;
