import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import { msgRequired, msgValidationDuplicated} from './helpers/validationMessages';
import { formatDate} from './helpers/FormatDate';

const RolesUpdate = ({match,history}) => {

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
        .put(`/roles/update/${id}`,body)
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
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
         <form  className="container-sm col-6 col-md-6 bgGrey" onSubmit={handleSubmit}>
            <br></br>
            <h3 className="centerText">Ingrese nuevos valores ...</h3>
            <br></br>
            <div>

              <div>
                <div className="displayInLineFlex">
                  <InputForm
                    type="text"
                    name="name"
                    label="Nombre actual : " 
                    defaultValue={roles.name}
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
                    type="text"
                    name="description"
                    label="Descripción actual : "
                    defaultValue={roles.description}
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
              <div className="centerText displayFlex">
                <div>
                  <Label htmlFor="name">Creada  :</Label>
                  <span className="center" >{formatDate(new Date(roles.createdAt))}</span>
                </div>
                <div>   
                  <Label htmlFor="name">Última modificación  :</Label>
                  <span className="center" >{formatDate(new Date(roles.updatedAt))}</span>
                </div>
              </div>
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
};

export default RolesUpdate;
