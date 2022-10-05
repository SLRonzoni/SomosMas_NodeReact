import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgValidationCategoryName, msgValidationIsNumber} from './helpers/validationMessages';
import {regexCategoryName , regexCategoryId} from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';

const FormNews = ({match,history}) => {

  const id  = match.params.id;

  const [news, setNews] = useState({ 
          id:"", 
          name: "", 
          image:"",
          content:"" ,
          categoryId:'',
          type:""    
        });
    

  //DEFAULT VALUES
  useEffect(() => {
    const getNews = async () => {
      await axiosClient.get(`/news/${id}`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getNews();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("content",values.content);
    body.append("image",values.image);
    body.append("categoryId",values.categoryId);
    body.append("type",values.type);
    
  
    const updateNews = async () => {
      await axiosClient
        .put(`/news/update/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setNews(response.data);
            Swal.fire({
              icon: "success",
              title: "Noticia actualizada !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/NewsAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateNews();
  };

  
  //FORMIK INITIAL VALUES
  let initialValues={name:news.name,categoryId:news.categoryId,
                     type:news.type,content:news.content}

  //FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {name: '', image:'',content:'', categoryId:'', type:'' ,
                icoNname:'', icoNimage:'', icoNcontent:'',icoNtype:'',formOk:''};  

  if (!values.name) {
    values.name=news.name
    errors.icoNname= '✔️'
  };

  if (!regexCategoryName.test(values.name)) {
    errors.name=msgValidationCategoryName
    errors.icoNname= '❌'
    return errors
  } else {
    errors.icoNname= '✔️'
  };

  if(!values.image) {
    values.image=news.image
    errors.icoNimage= '✔️'
  };

  if (!values.content) {
    values.content=news.content
    errors.icoNcontent= '✔️'
  };

  if (!values.categoryId) {
    values.categoryId=news.categoryId
    errors.icoNcategoryId= '✔️'
  } else {
    if(!regexCategoryId.test(values.categoryId)){
      errors.categoryId=msgValidationIsNumber
      errors.icoNcategoryId= '❌'
      return errors
    } else {
      errors.icoNcategoryId= '✔️'
    };
  }

  if(errors.name || errors.image || errors.content || errors.categoryId || errors.type){
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
         <form  className="containerUpdateCreate containerBorderWhiteBgGrey" onSubmit={handleSubmit}>
            <h3 className="centerText">Ingrese nuevos valores ...</h3>
            
            <div>
              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="name"
                    label="Nombre actual : " 
                    defaultValue={news.name}
                    placeholder="Ingrese nuevo nombre"
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
                    defaultValue={<img className="imageSmall" src={news.image}  alt="categoryImage"/>}
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
                    name="content"
                    label="Descripción actual : "
                    defaultValue={news.content}
                    placeholder="Ingrese nueva descripción"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.content && errors.icoNcontent && <Icon>{errors.icoNcontent}</Icon>}
                </div>
                {touched.content && errors.content  && <ErrorText> {errors.content} </ErrorText>}
              </div>
             
              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="categoryId"
                    label="Categoría : "
                    defaultValue={news.categoryId}
                    placeholder="Ingrese nueva categoría"
                    value={values.categoryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.categoryId && errors.icoNcategoryId && <Icon>{errors.icoNcategoryId}</Icon>}
                </div>
                {touched.categoryId && errors.categoryId  && <ErrorText> {errors.categoryId} </ErrorText>}
              </div>
              
              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="type"
                    label="Tipo : "
                    defaultValue={news.type}
                    placeholder="Ingrese nueva tipo"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.type && errors.icoNtype && <Icon>{errors.icoNtype}</Icon>}
                </div>
                {touched.type && errors.type  && <ErrorText> {errors.type} </ErrorText>}
              </div>
              
              <div className="centerText displayFlex">
                <div className="displayFlex">
                  <Label htmlFor="name">Creada  :</Label>
                  <span className="center" >{formatDate(new Date(news.createdAt))}</span>
                </div>
                <div className="displayFlex" >   
                  <Label htmlFor="name">Última modificación  :</Label>
                  <span className="center" >{formatDate(new Date(news.updatedAt))}</span>
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
             
              <div className="centerText">
                  <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                  <Link 
                    to={"/NewsAll"}
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

export default FormNews;