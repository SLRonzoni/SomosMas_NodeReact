import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired, msgValidationCategoryName, msgValidationIsNumber} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryId } from "./helpers/RegExp";
import "./styles/styles.css";
import "./styles/news-comments.css";

function NewsCreate(props) {
  
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
    errors.icoNname= '❌'
    return errors
  };

  if (!regexCategoryName.test(values.name)) {
    errors.name=msgValidationCategoryName
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

  if(!regexCategoryId.test(values.categoryId)){
    errors.categoryId=msgValidationIsNumber
    errors.icoNcategoryId= '❌'
    return errors
  } else {
    errors.icoNcategoryId= '✔️'
  };


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
          <h3 className="centerText">Nueva noticia</h3>
          <div >
            <div>
              <div className="displayInLineFlex">
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
            <br></br>
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
            <br></br>
            <div>
              <div className="displayInLineFlex">
                <InputForm
                  type="text"
                  name="content"
                  label="Descripción : "
                  defaultValue=""
                  placeholder="Ingrese contenido"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.content && errors.icoNcontent && <Icon>{errors.icoNcontent}</Icon>}
              </div>
              {touched.content && errors.content  && <ErrorText> {errors.content} </ErrorText>}
            </div>
            <br></br>
              <div >
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="categoryId"
                    label="Categoría : "
                    defaultValue=""
                    placeholder="Ingrese categoría"
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
                    defaultValue=""
                    placeholder="Ingrese tipo"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.type && errors.icoNtype && <Icon>{errors.icoNtype}</Icon>}
                </div>
                {touched.type && errors.type  && <ErrorText> {errors.type} </ErrorText>}
              </div>
            </div>
            <br></br>
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

}
export default NewsCreate;