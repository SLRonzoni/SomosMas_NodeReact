import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired,msgValidationCategoryName,msgValidationCategoryDescription} from './helpers/validationMessages';
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

  let formOk='';
  

  const send = (values) => {
    let body=values
console.log('body',values)    
    //UPDATE  
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
  
 
 //
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
  }, [id]);
  

  //FORMIK INITIAL VALUES
  let initialValues={name:categories.name,
                     description:categories.description}
  

  //FORMIK VALIDATIONS
 let validations=(values) =>{
 let errors = {name: '', image:'',description:'',  
               icoNname:'', icoNimage:'', icoNdescription:''};  

  if (!values.name) {
    errors.name=msgRequired
  };
  if (!regexCategoryName.test(values.name)) {
      errors.name=msgValidationCategoryName
      errors.icoNname= '❌'
  } else {
      errors.icoNname= '✔️'
      formOk='v'
  }; 

  if (!regexCategoryDescription.test(values.description)) {
    errors.description=msgValidationCategoryDescription
    errors.icoNdescription= '❌'
  } else {
    errors.icoNdescription= '✔️'
    formOk='v'
  };

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= '❌'
  } else {
    errors.icoNimage= '✔️'
    formOk='v'
  }
  return errors
}


  //FORM
  return (
    <>
    <Formik
        initialValues={initialValues}           
        validate={validations}
        onSubmit={(values)=>{         
        send(values)
        }}
    >
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
         <form onSubmit={handleSubmit} className="container-sm col-6 col-md-4 bg-light">
            <br></br>
            <h3 className="centrar">Ingrese nuevos valores ...</h3>
            <br></br>
            <div >

              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="name"
                    label="Nombre :"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.icoNname && <Icon>{errors.icoNname}</Icon>}
                </div>
                {touched.name && errors.name && <ErrorText>{errors.name} </ErrorText>}
              </div>

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
              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="description"
                    label="Descripción :"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.icoNdescription && <Icon>{errors.icoNdescription}</Icon>}
                </div>
                {touched.description && errors.description  && <ErrorText> {errors.description} </ErrorText>}
              </div>

              <div className="centrar displayFlex">
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

            { formOk !== "v" && formOk!=='' && 
              <MsjWrong> 
              <p className="centrar">
                <br /> Algun dato es incorrecto. 
                <br/> Por favor complete el formulario correctamente
              </p>        
              </MsjWrong>
              }
            
            <div>
              <br></br>
              <div className="centrar">
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
