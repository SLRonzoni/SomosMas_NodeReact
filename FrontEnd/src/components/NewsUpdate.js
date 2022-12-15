import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import "./styles/news-comments.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { InputGroup, InputUser,ErrorText,IconUser, Defaultvalue} from './elements/ElementsFormStyles';
import * as FaIcons from "react-icons/fa";
import { msgValidationCategoryName, msgValidationIsNumber} from './helpers/validationMessages';
import {regexCategoryName , regexCategoryId} from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';

const FormNews = ({match,history}) => {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

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
        .put(`/news/${id}`,body)
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
            title: "Error",
            text:error
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
    errors.icoNname= V
  };

  if (!regexCategoryName.test(values.name)) {
    errors.name=msgValidationCategoryName
    errors.icoNname= X
    return errors
  } else {
    errors.icoNname= V
  };

  if(!values.image) {
    values.image=news.image
    errors.icoNimage= V
  };

  if (!values.content) {
    values.content=news.content
    errors.icoNcontent= V
  };

  if (!values.categoryId) {
    values.categoryId=news.categoryId
    errors.icoNcategoryId= V
  } else {
    if(!regexCategoryId.test(values.categoryId)){
      errors.categoryId=msgValidationIsNumber
      errors.icoNcategoryId= X
      return errors
    } else {
      errors.icoNcategoryId= V
    };
  }

  if(errors.name || errors.image || errors.content || errors.categoryId || errors.type){
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
          <h4 className="mb-4 flex-Center">Ingrese nuevos valores</h4>
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
                <Defaultvalue>  actual : {<img className="imageSmall" src={news.image}  alt="newsImage"/>} </Defaultvalue>
              </InputGroup>
            </div>
            {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
          </div>
          <div>
            <div className="w-75 m-auto">           
              <InputGroup className="d-block">
                <label htmlFor='name'>Actividad</label>
                <InputUser className="form-control pt-1"
                  type="text"
                  placeholder="Ingrese nuevo nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                <Defaultvalue> actual : {news.name} </Defaultvalue>
              </InputGroup>
              </div>
              {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
            </div>
            <div>
              <div className="w-75 m-auto">           
                <InputGroup className="d-block">
                  <label htmlFor='content'>Descripcion</label>
                  <InputUser className="form-control pt-1"
                      type="text"
                      name="content"
                      defaultValue={news.content}
                      placeholder="Ingrese nueva descripción"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                  {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
                  <Defaultvalue> actual : {news.content} </Defaultvalue>
              </InputGroup>
              </div>
              {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
            </div>
            <div>
              <div className="w-75 m-auto">           
                <InputGroup className="d-block">
                  <label htmlFor='categoryId'>Categoría</label>
                  <InputUser className="form-control pt-1"
                    type="text"
                    name="categoryId"
                    placeholder="Ingrese nueva categoría"
                    value={values.categoryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.categoryId && errors.icoNcategoryId && <IconUser className="mt-4">{errors.icoNcategoryId}</IconUser>}
                  <Defaultvalue> actual : {news.categoryId} </Defaultvalue>
              </InputGroup>
              </div>
              {touched.categoryId && errors.categoryId  && <ErrorText className="errorTextUpdate"> {errors.categoryId} </ErrorText>}
            </div>
            <div>
              <div className="w-75 m-auto">           
                <InputGroup className="d-block">
                  <label htmlFor='type'>Tipo</label>
                  <InputUser className="form-control pt-1"
                    type="text"
                    name="type"
                    defaultValue={news.type}
                    placeholder="Ingrese nueva tipo"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                {touched.type && errors.icoNtype && <IconUser className="mt-4">{errors.icoNtype}</IconUser>}
                <Defaultvalue> actual : {news.type} </Defaultvalue>
              </InputGroup>
              </div>
              {touched.type && errors.type  && <ErrorText className="errorTextUpdate"> {errors.type} </ErrorText>}
            </div>
              
            <div className="flex-Center">
              <div className="d-flex">
                <label htmlFor="name">Creada  :</label>
                <span className="center" >{formatDate(new Date(news.createdAt))}</span>
              </div>
              <div className="d-flex ms-4" >   
                <label htmlFor="name">Última modificación  :</label>
                <span className="center" >{formatDate(new Date(news.updatedAt))}</span>
              </div>
            </div>
            <div className="buttonsResponsive">
              <Link to={"/NewsAll"}className="btn buttonBlue"role="button"> Volver</Link>
              <button type="submit" className="btn buttonBlue buttonGreen"> Guardar </button>
            </div> 
          </form>
      )}
    </Formik>
    </div>
  </>
  );
};

export default FormNews;