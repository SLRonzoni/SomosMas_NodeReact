import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { ErrorText,IconUser, InputUser, InputGroup,Defaultvalue} from './elements/ElementsFormStyles';
import { msgRequired, msgValidationDuplicated} from './helpers/validationMessages';
import { formatDate} from './helpers/FormatDate';
import buttonsResponsive from "./buttonsResponsive";
import * as FaIcons from "react-icons/fa";

const RolesUpdate = ({match,history}) => {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const id  = match.params.id;

  const [roles, setRoles] = useState({ 
          id:"", 
          name: "", 
          description:""          
        });
    
  const [duplicated,setDuplicated]=useState('')

  //DEFAULT VALUES
  useEffect(() => {
    const getRoles = async () => {
      await axiosClient.get(`/roles/${id}`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getRoles();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body ={"name":values.name,"description":values.description};
  
    const updateRole = async () => {
      await axiosClient
        .put(`/roles/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setRoles(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de role exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/RolesAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateRole();
  };
  
  //DUPLICATED NAME
  const repeat= (searchName,errors)=>{
    if (errors.formOk !=='v'){
      getRolesByName(searchName)
    }
  };

  const getRolesByName = async (searchName) => {
    await axiosClient.get(`/roles/byName/${searchName}`)
    .then((response) => {
      if(response.data[0]){
        setDuplicated(response.data[0].name )
      }
    })
    .catch((error=>{
      console.log(error);
    }));
  }; 

  
  //FORMIK INITIAL VALUES
  let initialValues={name:roles.name, description:roles.description}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   
  
    let errors = {name: '',description:'',  
                icoNname:'', icoNdescription:'',formOk:''};  
                
                if (!values.name) {
                  errors.name=msgRequired
                  errors.icoNname= X
                  return errors
                } else {
                  errors.icoNname= V
                };
              
                
                let searchName=values.name
                repeat(searchName, errors)
                if(duplicated===searchName){
                  errors.name=msgValidationDuplicated
                  errors.icoNname= X         
                  return errors
                } else {
                  errors.icoNname= V
                };
              
              
                if (!values.description) {
                  errors.description=msgRequired
                  errors.icoNdescription= X
                  return errors
                } else {
                  errors.icoNdescription= V
                }; 
              
                
                if(errors.name || errors.description ){
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
          <h4 className="mb-5 flex-Center">Nuevos valores para role</h4>
          <div>
            <div className="w-75 m-auto mb-3">  
              <InputGroup className="d-block">
                <label htmlFor='name'>Nombre y Apellido</label>
                <InputUser className="form-control"
                  type="text"
                  name="name"
                  placeholder="Ingrese nuevo nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                <Defaultvalue>actual : {roles.name} </Defaultvalue>
              </InputGroup >
            </div>
            {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
          </div>
           
          <div>
          <div className="w-75 m-auto mb-3">  
              <InputGroup className="d-block">
                <label htmlFor='description'>Descripción :</label>
                <InputUser className="form-control"
                type="text"
                name="description"
                placeholder="Ingrese nueva descripción"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
              <Defaultvalue>actual : {roles.description} </Defaultvalue>
              </InputGroup >
            </div>
            {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
          </div>
             
          <div className="flex-Center">
            <div className="d-flex">
              <label htmlFor="name">Creada  :</label>
              <span >{formatDate(new Date(roles.createdAt))}</span>
            </div>
            <div className="d-flex ms-4">   
              <label htmlFor="name">Última modificación  :</label>
              <span >{formatDate(new Date(roles.updatedAt))}</span>
            </div>
          </div>
            
          {buttonsResponsive("/RolesAll", "Guardar")}
        </form>
      )}
      </Formik>
    </div>
  </>
  );
};

export default RolesUpdate;
