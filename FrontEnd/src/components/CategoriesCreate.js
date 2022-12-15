import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { ErrorText,Icon,InputGroup, InputUser} from './elements/ElementsFormStyles';
import * as FaIcons from "react-icons/fa";
import { msgRequired,msgValidationCategoryName,msgValidationCategoryDescription, msgValidationDuplicated} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryDescription } from "./helpers/RegExp";
import DuplicatedName from "./helpers/DuplicatedName";
import "./styles/styles.css";

function CategoriesCreate(props) {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
  const [categories, setCategories] = useState({
    name: "",
    description:"",
    image:""        
  });

  const [duplicated,setDuplicated]=useState({});

  //SEND
  const sendForm = (values) => {
   
    let body = new FormData()
    body.append("name",values.name);
    body.append("description",values.description);
    body.append("image",values.image);

    const saveCategories = async () => {
      await axiosClient
        .post("/categories/",body)     
        .then((response) => {
          if(response.status===201) {
            setCategories(response.data)
            Swal.fire({
              icon: "success",
              title: "Categoría Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            props.history.push("/CategoriesAll");
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
    saveCategories();
  };

//DUPLICATED NAME
const repeat= async (searchName,errors)=>{
  if (errors.formOk !=='v'){                                                              
    setDuplicated(await DuplicatedName(searchName,'categories'))
  };
}

//FORMIK INITIAL VALUES
let initialValues={name:categories.name, description:categories.description}

//FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {name: '', image:'',description:'', icoNname:'', icoNimage:'', icoNdescription:'',formOk:''};  

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= X
    return errors
  };

  let searchName=values.name
    repeat(searchName, errors)
    if( duplicated.respName===searchName ) {  
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
    errors.description=msgRequired
    errors.icoNdescription= X
    return errors
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
    errors.icoNimage= X
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
          validate={ validateInputs }
          onSubmit={ (values)=>{ sendForm(values) } }
      >
      { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => ( 
          <form  className="containerFormUpdate" onSubmit={handleSubmit}>
              <h3 className="mb-5 flex-Center">Nueva categoría</h3>
                <div>
                  <div className="w-75 m-auto mb-3"> 
                    <InputGroup className="d-block">
                      <label htmlFor='name'>Nombre : </label> 
                      <InputUser className="form-control pt-1"
                        type="text"
                        name="name"
                        required
                        placeholder="Ingrese nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.icoNname && <Icon className="mt-0">{errors.icoNname}</Icon>}
                    </InputGroup>
                  </div>
                  {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                </div>
                <div>
                <div className="w-75 m-auto mb-3"> 
                    <InputGroup className="d-block">
                      <label htmlFor='name'>Imágen : </label> 
                      <input className="pt-1 d-block"
                      type="file"
                      name="image"
                      required
                      encType="multipart/form-data"
                      onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                      onBlur={handleBlur}
                      />
                      {touched.image && errors.icoNimage && <Icon className="mt-4">{errors.icoNimage}</Icon>}
                    </InputGroup>
                  </div>
                  {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                </div>
                <div>
                <div className="w-75 m-auto mb-3">  
                      <InputGroup className="d-block">
                        <label htmlFor='description'>Descripción</label>
                        <InputUser className="form-control"
                          type="text"
                          name="description"
                          placeholder="Ingrese descripción"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.description && errors.icoNdescription && <Icon className="mt-4">{errors.icoNdescription}</Icon>}
                    </InputGroup>
                  </div>
                  {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
                </div>
            
              <div className="buttonsResponsive mt-5">
                <Link to={"/CategoriesAll"}className="btn buttonBlue" role="button"> Volver</Link>
                <button type="submit" className="btn buttonBlue buttonGreen "> Guardar </button>
              </div> 
            </form>
        )}
      </Formik>
    </div>
</>
);

};
export default CategoriesCreate;