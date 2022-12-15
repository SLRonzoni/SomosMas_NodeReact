import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import {InputUser, InputGroup,ErrorText,IconUser} from './elements/ElementsFormStyles';
import * as FaIcons from "react-icons/fa";
import { msgRequired, msgValidationCategoryName, msgValidationIsNumber} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryId } from "./helpers/RegExp";
import "./styles/styles.css";
import "./styles/news-comments.css";

function NewsCreate(props) {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
  const [news, setNews] = useState({
    name: "",
    content:"",
    image:"" ,
    categoryId:""   ,
    type:""    
  });


  //SEND
  const sendForm = (values) => {
  
    let body = new FormData()
    body.append("name",values.name);
    body.append("content",values.content);
    body.append("image",values.image);
    body.append("categoryId",values.categoryId);
    body.append("type",values.type);

    const saveNews = async () => {
      await axiosClient
        .post("/news",body)     
        .then((response) => {
          if(response) {
            console.log(response)
            setNews(response.data)
            Swal.fire({
              icon: "success",
              title: "Noticia Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            props.history.push("/NewsAll");
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
    saveNews();
  };

//FORMIK INITIAL VALUES
let initialValues={name:news.name, categoryId:news.categoryId,type:news.type,
                   content:news.content}

//FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {name: '', image:'',content:'',  categoryId:'', type:'',
                icoNname:'', icoNimage:'', icoNcontent:'',icoNcategoryId:'',icoNtype:'',formOk:''};  

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= X
    return errors
  };

  if (!regexCategoryName.test(values.name)) {
    errors.name=msgValidationCategoryName
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

  if(!regexCategoryId.test(values.categoryId)){
    errors.categoryId=msgValidationIsNumber
    errors.icoNcategoryId= X
    return errors
  } else {
    errors.icoNcategoryId= V
  };


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
  { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
       <form  className="containerFormUpdate" onSubmit={handleSubmit}>
          <h4 className="mb-4 flex-Center">Nueva noticia</h4>
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
            {touched.image && errors.image && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
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
            <div className="w-75 mb-3 m-auto"> 
              <InputGroup className="d-block">
                <label htmlFor='content'>Detalle :</label>
                <InputUser className="form-control"
                type="text"
                name="content"
                placeholder="Ingrese contenido"
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
              </InputGroup>
            </div>
            {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
          </div>
            
          <div>
            <div className="w-75 mb-3 m-auto"> 
              <InputGroup className="d-block">
                <label htmlFor='categoryId'>Categoría :</label>
                <InputUser className="form-control"
                  type="text"
                  name="categoryId"
                  placeholder="Ingrese categoría"
                  value={values.categoryId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.categoryId && errors.icoNcategoryId && <IconUser className="mt-4">{errors.icoNcategoryId}</IconUser>}
              </InputGroup>
            </div>
            {touched.categoryId && errors.categoryId  && <ErrorText className="errorTextUpdate"> {errors.categoryId} </ErrorText>}
          </div>

          <div>
            <div className="w-75 mb-3 m-auto"> 
              <InputGroup className="d-block">
                <label htmlFor='typr'>Tipo : </label>
                <InputUser className="form-control"
                type="text"
                name="type"
                placeholder="Ingrese tipo"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.type && errors.icoNtype && <IconUser className="mt-4">{errors.icoNtype}</IconUser>}
              </InputGroup>
            </div>
            {touched.type && errors.type  && <ErrorText className="errorTextUpdate"> {errors.type} </ErrorText>}
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

}
export default NewsCreate;