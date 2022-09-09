import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired,msgValidationActivitiesName, msgValidationDuplicated} from './helpers/validationMessages';
import {regexActivitiesName } from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';

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
        .put(`/activities/update/${id}`,body)
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
  let initialValues={name:activities.name,
                     content:activities.content}

  //FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {name: '', image:'',content:'',  
                icoNname:'', icoNimage:'', icoNcontent:'',formOk:''};  

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

  let searchName=values.name
    repeat(searchName, errors)
    if(duplicated===searchName){
      errors.name=msgValidationDuplicated
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

  if (!values.content) {
    errors.content=msgRequired
    errors.icoNcontent= '❌'
    return errors
  } else {
    errors.icoNcontent= '✔️'
  };

  if(errors.name || errors.image || errors.content){
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
         <form  className="container-sm col-6 col-md-4 bg-light" onSubmit={handleSubmit}>
            <br></br>
            <h3 className="centerText">Ingrese nuevos valores ...</h3>
            <br></br>
            <div>

              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="name"
                    label="Nombre actual : " 
                    defaultValue={activities.name}
                    placeholder="Ingrese nuevo nombre"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.icoNname && <Icon>{errors.icoNname}</Icon>}
                </div>
                {touched.name && errors.name && <ErrorText>{errors.name} </ErrorText> }
              </div>
              <br></br>
              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="file"
                    name="image"
                    label="Imágen :"
                    encType="multipart/form-data"
                    defaultValue={<img className="imageSmall" src={activities.image}  alt="categoryImage"/>}
                    onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                    onBlur={handleBlur}
                  />
                  {touched.image && errors.icoNimage && <Icon>{errors.icoNimage}</Icon>}
                </div>
                {touched.image && errors.image   && <ErrorText> {errors.image} </ErrorText>}
              </div>
              <br></br>
              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="content"
                    label="Descripción actual : "
                    defaultValue={activities.content}
                    placeholder="Ingrese nueva descripción"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.content && errors.icoNcontent && <Icon>{errors.icoNcontent}</Icon>}
                </div>
                {touched.content && errors.content  && <ErrorText> {errors.content} </ErrorText>}
              </div>
              <br></br>
              <div className="centerText displayFlex">
                <div>
                  <Label htmlFor="name">Creada  :</Label>
                  <span className="center" >{formatDate(new Date(activities.createdAt))}</span>
                </div>
                <div>   
                  <Label htmlFor="name">Última modificación  :</Label>
                  <span className="center" >{formatDate(new Date(activities.updatedAt))}</span>
                </div>
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
};

export default FormActivity;
