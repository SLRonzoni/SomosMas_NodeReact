import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired,msgValidationDuplicated} from './helpers/validationMessages';
import "./styles/styles.css";

function RoleCreate(props) {
  
  const [roles, setRoles] = useState({
    name: "",
    description:""        
  });

  const [duplicated,setDuplicated]=useState({
    name: ""      
  });

  //SEND
  const sendForm = (values) => {
    console.log('values',values)
   
    let body ={"name":values.name,"description":values.description};

    const saveRoles = async () => {
      await axiosClient
        .post("/roles/create",body)     
        .then((response) => {
          if(response.status===201) {
            setRoles(response.data)
            console.log(response.data)
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
    errors.description=msgRequired
    errors.icoNdescription= '❌'
    return errors
  } else {
    errors.icoNdescription= '✔️'
  }; 

  
  if(errors.name || errors.description ){
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
  { ({values,handleBlur,handleSubmit,handleChange,touched,errors}) => (    // props con destrunturing {}
       <form  className="containerUpdateCreate containerBorderWhiteBgGrey" onSubmit={handleSubmit}>
          <br></br>
          <h3 className="centerText">Nuevo role ...</h3>
          <br></br>
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
            <br></br>
            
          </div>
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
                  to={"/RolesAll"}
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
export default RoleCreate;