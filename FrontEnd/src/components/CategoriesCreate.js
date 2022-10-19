import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired,msgValidationCategoryName,msgValidationCategoryDescription, msgValidationDuplicated} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryDescription } from "./helpers/RegExp";
import DuplicatedName from "./helpers/DuplicatedName";
import "./styles/styles.css";

function CategoriesCreate(props) {
  
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
    errors.icoNname= '❌'
    return errors
  };

  let searchName=values.name
    repeat(searchName, errors)
    if( duplicated.respName===searchName ) {  
      errors.name=msgValidationDuplicated
      errors.icoNname= '❌'         
      return errors
    } else {
      errors.icoNname= '✔️'
    };

  if (!regexCategoryName.test(values.name)) {
    errors.name=msgValidationCategoryName
    errors.icoNname= '❌'
    return errors
  } else {
    errors.icoNname= '✔️'
  };

  if (!values.description) {
    errors.description=msgRequired
    errors.icoNdescription= '❌'
    return errors
  }; 

  if (!regexCategoryDescription.test(values.description)) {
    errors.description=msgValidationCategoryDescription
    errors.icoNdescription= '❌'
    return errors
  } else {
    errors.icoNdescription= '✔️'
  };

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= '❌'
    return errors
  } else {
    errors.icoNimage= '✔️'
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
  <Formik
       initialValues={initialValues}      
       validate={ validateInputs }
       onSubmit={ (values)=>{ sendForm(values) } }
  >
  { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => ( 
       <form  className="containerUpdateCreate containerBorderWhiteBgGrey" onSubmit={handleSubmit}>
          <br></br>
          <h3 className="centerText">Nueva categoría</h3>
          <div>
            <div>
              <div className="displayInLineFlex inputCreateWidth">
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
              <div className="displayInLineFlex inputCreateWidth">
                <InputForm
                  type="file"
                  name="image"
                  label="Imágen :"
                  encType="multipart/form-data"
                  defaultValue=""
                  onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                  onBlur={handleBlur}
                />
                {touched.image && errors.icoNimage && <Icon>{errors.icoNimage}</Icon>}
              </div>
              {touched.image && errors.image   && <ErrorText> {errors.image} </ErrorText>}
            </div>
            <br></br>
            <div>
              <div className="displayInLineFlex inputCreateWidth">
                <InputForm
                  type="text"
                  name="description"
                  label="Descripción : "
                  defaultValue=""
                  placeholder="Ingrese descripción"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.icoNdescription && <Icon>{errors.icoNdescription}</Icon>}
              </div>
              {touched.description && errors.description  && <ErrorText> {errors.description} </ErrorText>}
            </div>
            
          </div>
          { errors.formOk === "f" && (
            <MsjWrong> 
            <span className="centerText">
              <br /> Algun dato es incorrecto. 
              <br/> Por favor complete el formulario correctamente
            </span>        
            </MsjWrong>
          )}
         
          <div>
            <div className="centerText">
                <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                <Link 
                  to={"/CategoriesAll"}
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
export default CategoriesCreate;