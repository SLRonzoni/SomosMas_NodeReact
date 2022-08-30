import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired,msgValidationCategoryName,msgValidationCategoryDescription, msgValidationDuplicated} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryDescription } from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';


const FormCategory = ({match,history}) => {

  const id  = match.params.id;

  const [categories, setCategories] = useState({ 
          id:"", 
          name: "", 
          image:"",
          description:""          
        });
    
  const [duplicated,setDuplicated]=useState('')

  //DEFAULT VALUES
  useEffect(() => {
    const getCategory = async () => {
      await axiosClient.get(`/categories/${id}`)
      .then((respuesta) => {
        setCategories(respuesta.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getCategory();
  },[]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("description",values.description);
    body.append("image",values.image);
  
    const updateCategory = async () => {
      await axiosClient
        .put(`/categories/update/${id}`,body)
        .then(respuesta => {
          if (respuesta.status===201) {
            setCategories(respuesta.data);
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
          console.log(error)
        });
    };
    updateCategory();
  };
  
  //DUPLICATED NAME
  const repeat= (searchName,errors)=>{
    if (errors.formOk !=='v'){
      getCategoryByName(searchName)
    }
  };

  const getCategoryByName = async (searchName) => {
    await axiosClient.get(`/categories/byName/${searchName}`)
    .then((respuesta) => {
      if(respuesta.status===404){
        setDuplicated(' ')
      } else {
        setDuplicated(respuesta.data.category.name)
      }
    })
    .catch((error=>{
      console.log(error);
    }));
  }; 


  
  //FORMIK INITIAL VALUES
  let initialValues={name:categories.name,
                     description:categories.description}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   
  
    let errors = {name: '', image:'',description:'',  
                icoNname:'', icoNimage:'', icoNdescription:'',formOk:''};  
                
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
   
    
    let searchName=values.name
    repeat(searchName, errors)
    if(duplicated===searchName){
      errors.name=msgValidationDuplicated
      errors.icoNname= '❌'         
      return errors
    } else {
      errors.icoNname= '✔️'
    };
  

    if (!values.description) {
      values.description=categories.description
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
         validate={validateInputs}
         onSubmit={(values)=>{ sendForm(values)}}
    >
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
         <form  className="container-sm col-6 col-md-4 bg-light" onSubmit={handleSubmit}>
            <br></br>
            <h3 className="centrarTexto">Ingrese nuevos valores ...</h3>
            <br></br>
            <div >

              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="name"
                    label="Nombre actual : " 
                    defaultValue={categories.name}
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
                    name="description"
                    label="Descripción actual : "
                    defaultValue={categories.description}
                    placeholder="Ingrese nueva descripción"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.icoNdescription && <Icon>{errors.icoNdescription}</Icon>}
                </div>
                {touched.description && errors.description  && <ErrorText> {errors.description} </ErrorText>}
              </div>
              <br></br>
              <div className="centrarTexto displayFlex">
                <div>
                  <Label htmlFor="name">Creada  :</Label>
                  <span className="" >{formatDate(new Date(categories.createdAt))}</span>
                </div>
                <div>   
                  <Label htmlFor="name">Última modificación  :</Label>
                  <span className="" >{formatDate(new Date(categories.updatedAt))}</span>
                </div>
              </div>
            </div>
            { errors.formOk === "f" && 
              <MsjWrong> 
              <span className="centrarTexto">
                <br /> Algun dato es incorrecto. 
                <br/> Por favor complete el formulario correctamente
              </span>        
              </MsjWrong>
            }
           
            <div>
              <br></br>
              <div className="centrarTexto">
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

export default FormCategory;
