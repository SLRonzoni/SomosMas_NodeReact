import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Formik } from 'formik';
import { ErrorText,IconUser,InputUser, InputGroup} from './elements/ElementsFormStyles';
import { msgRequired,msgValidationDuplicated} from './helpers/validationMessages';
import "./styles/styles.css";
import * as FaIcons from "react-icons/fa";
import buttonsResponsive from "./buttonsResponsive";

function RoleCreate(props) {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
  const [roles, setRoles] = useState({
    name: "",
    description:""        
  });

  const [duplicated,setDuplicated]=useState({name:""});

  
  const sendForm = (values) => {
    let body ={"name":values.name,"description":values.description};

    const saveRoles = async () => {
      await axiosClient.post("/roles",body)     
        .then((response) => {
          if(response.status===201) {
            setRoles(response.data)
            
            Swal.fire({
              icon: "success",
              title: "Role Agregado!",
              timer:1000,
              showConfirmButton: false
            });
            props.history.push("/RolesAll");
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
    saveRoles();
  };

  //DUPLICATED NAME
  const repeat= (searchName,errors)=>{
    if (errors.formOk !=='v'){
      getRoleByName(searchName)
    }
  };

  const getRoleByName = async (searchName) => {
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

  let errors = {name: '', description:'',icoNname:'', icoNdescription:'',formOk:''};  

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
      { ({values,handleBlur,handleSubmit,handleChange,touched,errors}) => ( 
          <form  className="containerFormUpdate" onSubmit={handleSubmit}>
              <h4 className="mb-5 flex-Center">Nuevo role</h4> 
              <div>
                <div className="w-75 mb-3 m-auto"> 
                  <InputGroup className="d-block">
                    <label htmlFor='name'>Nombre :</label>
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
                    <label htmlFor='name'> Descripción  :</label>
                    <InputUser className="form-control"
                      type="text"
                      name="description"
                      placeholder="Ingrese descripción"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
                  </InputGroup>
                </div>
                {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
              </div>
            
            { buttonsResponsive("/RolesAll", "Guardar")}          
      </form>
      )}
     </Formik>
    </div>
  </>
  );

}
export default RoleCreate;