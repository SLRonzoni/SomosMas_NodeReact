import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { ErrorText,IconUser, InputUser, InputGroup, Defaultvalue} from './elements/ElementsFormStyles';
import { msgRequired,msgValidationCategoryName,msgValidationCategoryDescription, msgValidationDuplicated} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryDescription } from "./helpers/RegExp";
import { formatDate } from "./helpers/FormatDate";
import DuplicatedName from "./helpers/DuplicatedName";
import buttonsResponsive from "./buttonsResponsive";


const CategoriesUpdate = ({match,history}) => {

  const id  = match.params.id;

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const [categories, setCategories] = useState({ 
          id:"", 
          name: "", 
          image:"",
          description:"",
          createdAt:"",
          updatedAt:""          
  });
    
  const [duplicated,setDuplicated]=useState({});

  //DEFAULT VALUES
  useEffect(() => {
    const getCategory = async () => {
      await axiosClient.get(`/categories/${id}`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getCategory();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("description",values.description);
    body.append("image",values.image);
  
    const updateCategory = async () => {
      await axiosClient
        .put(`/categories/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setCategories(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de categoría exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/CategoriesAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateCategory();
  };
  
  //DUPLICATED NAME
  const repeat= async (searchName,errors)=>{
    if (errors.formOk !=='v'){                                                              
      setDuplicated(await DuplicatedName(searchName,'categories'))
     
    };
  };
  
  //FORMIK INITIAL VALUES
  let initialValues={name:categories.name, description:categories.description}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   
  
    let errors = {name: '', image:'',description:'', icoNname:'', icoNimage:'', icoNdescription:'',formOk:''};  
                
    if (!values.name) {
      values.name=categories.name
      errors.icoNname= V
    };

       
    let searchName=values.name
    repeat(searchName, errors)
    if( (duplicated.respName===searchName) && !duplicated.respId  ) {  
      errors.name=msgValidationDuplicated
      errors.icoNname= X         
      return errors
    } else {
      errors.icoNname= V
    };

    if (!regexCategoryName.test(values.name)) {
      errors.name=msgValidationCategoryName
      errors.icoNname= X
      return errors
    } else {
      errors.icoNname= V
    };
  

    if (!values.description) {
      values.description=categories.description
      errors.icoNdescription= V
    }; 

    if (!regexCategoryDescription.test(values.description)) {
      errors.description=msgValidationCategoryDescription
      errors.icoNdescription= X
       return errors
    } else {
      errors.icoNdescription= V
    };

    if(!values.image) {
      errors.image=msgRequired
      errors.icoNimage= '❌'
       return errors
    } else {
      errors.icoNimage= V
    };

    if(errors.name || errors.description || errors.image){
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
      { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
          <form  className="containerFormUpdate" onSubmit={handleSubmit}>
              <h4 className="mb-4 flex-Center">Nuevos valores</h4>
                <div>
                  <div className="w-75 m-auto">           
                    <InputGroup className="d-block">
                      <label htmlFor='name'>Actividad</label>
                      <InputUser className="form-control pt-1"
                        type="text"
                        name="name"
                        placeholder="Ingrese nuevo nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                      <Defaultvalue> actual : {categories.name} </Defaultvalue>
                    </InputGroup>
                  </div>
                  {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                </div> 
                <div>
                  <div className="w-75 mb-3 m-auto">           
                    <InputGroup className="d-block">
                      <label htmlFor='image'>Imágen</label>
                      <input className="pt-1 d-block"
                        type="file"
                        name="image"
                        encType="multipart/form-data"
                        onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                        onBlur={handleBlur}
                      />
                      {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                      <Defaultvalue> actual : {<img className="imageSmall" src={categories.image}  alt="categoryImage"/>} </Defaultvalue>
                    </InputGroup>
                  </div>
                  {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                </div>
                <div>
                <div className="w-75 m-auto">           
                    <InputGroup className="d-block">
                      <label htmlFor='description'>Descripción</label>
                      <InputUser className="form-control pt-1"
                        type="text"
                        name="description"
                        placeholder="Ingrese nueva descripción"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
                      <Defaultvalue> actual : {categories.description} </Defaultvalue>
                    </InputGroup>
                  </div>
                  {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
                </div>
              
                <div className="flex-Center">
                  <div>
                    <label htmlFor="name">Creada  : </label>
                    <span>{formatDate(new Date(categories.createdAt))}</span>
                  </div>
                  <div className="ms-5">   
                    <label htmlFor="name">Última modificación  :</label>
                    <span>{formatDate(new Date(categories.updatedAt))}</span>
                  </div>
                </div>
            
              {buttonsResponsive("/CategoriesAll","Guardar")}
            </form>
        )}
      </Formik>
    </div>
  </>
  );
};

export default CategoriesUpdate;
