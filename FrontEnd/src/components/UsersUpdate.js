import React, {useState,useEffect} from 'react';
import axiosClient from '../configuration/axiosClient';
import './styles/styles.css';
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import * as msg from './helpers/validationMessages';
import * as regex  from "./helpers/RegExp";
import {formatDate} from './helpers/FormatDate';
import { SendButton, MsjWrong, ErrorText,IconUser, Label, InputUser, InputGroup} from './elements/ElementsFormStyles';
import Swal from "sweetalert2";


const MyProfileUpdate = ({match, history}) =>{
      
  const  id= match.params.id;

  const [user, setUser] = useState({
      id:'',
      firstName:'',
      lastName:'',
      photo:"",
      email:'',
      roleId:'',
      password:'',
      createdAt:'',
      updatedAt:''
  });

  //SHOW PASSWORD
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);


  //DEFAULT VALUES
  useEffect(() => {
    const getUser = async () => {
      await axiosClient.get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getUser();
  },[id]); 

  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("firstName",values.firstName);
    body.append("lastName",values.lastName);
    body.append("password",values.password);
    body.append("photo",values.photo);
    body.append("role",user.roleId);
    body.append("email",user.email);

    const updateUser = async () => {
      await axiosClient
        .put(`/users/${id}`,body)
        
        .then(response => {
          if (response.status===201) {
            setUser(response.data)
            Swal.fire({
              icon: "success",
              title: "Actualización de perfil exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/");
          }
          else {             
            Swal.fire({
              icon: "error",
              title: "Error !",
              text: response.message,
              showConfirmButton:true
            })
          };  
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    }   
    updateUser();
  };

  //FORMIK INITIAL VALUES
  let initialValues={firstName:user.firstName, 
                    lastName:user.lastName,
                    photo:user.photo,
                    password:user.password}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   

    let errors = {firstName: '',lastName:'', photo:'', password:'', 
                  icoNfirstName:'',icoNlastName:'', icoNphoto:'', icoNpassword:'',formOk:''};  

    if (!values.firstName) {
      values.firstName=user.firstName
    };

    if (!regex.regexUserfirstName.test(values.firstName)) {
      errors.firstName=msg.msgValidationUserFirstName
      errors.icoNfirstName= '❌'
      errors.formOk='f'
      return errors
    } else {
      errors.icoNfirstName= '✔️'
      errors.formOk='v'
    };

    if (!values.lastName) {
      values.lastName=user.lastName
    };

    if (!regex.regexUserLastName.test(values.lastName)) {
      errors.lastName=msg.msgValidationUserLastName
      errors.icoNlastName= '❌'
      errors.formOk='f'
      return errors
    } else {
      errors.icoNlastName= '✔️'
      errors.formOk='v'
    };

    if (!values.password) {
      errors.password=msg.msgRequired
      errors.icoNpassword= '❌'
      return errors
    };

    if (!regex.regexUserPassword.test(values.password)) {
      errors.password=msg.msgValidationUserPassword
      errors.icoNpassword= '❌'
      errors.formOk='f'
      return errors
    } else {
      errors.icoNpassword= '✔️'
      errors.formOk='v'
    };
  }

  //FORM
  return (
    <>
    <div className="containerHome">
    <br/>
    <Formik  
         initialValues={initialValues}           
         validate={validateInputs}
         onSubmit={(values)=>{ sendForm(values)}}
    >
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
        <form className="containerMyPerfil"onSubmit={handleSubmit} > 
            <h4 className='marginLeft25px'>Mi Perfil  
              <span className='margenEnd'><em className='font10px'> última actualización : {formatDate(new Date(user.updatedAt))} </em></span>
               <p className='pEmailRegisterUserUpdate font10px'><u className='font10px'>Email registrado</u> : {user.email}</p>
            </h4>
            <div className='marginLeft10px '>
              <div className="marginLeft10px">
                <br></br>
                <div>   
                  <div className='displayFlex profile'>
                    <p className="marginLeft10px"><img className='imageMyProfile' src={user.photo}  alt="userPhoto"/></p>
                   
                  </div> 
                  <InputGroup  >
                    <InputUser className="form-image"
                          type="file" 
                          name="photo" 
                          id="photo"  
                          encType="multipart/form-data"
                          onChange={ (e)=>setFieldValue('photo',e.currentTarget.files[0]) } 
                          onBlur={handleBlur}
                    />
                  </InputGroup>  
                  {touched.photo && errors.icoNphoto && <IconUser>{errors.icoNphoto}</IconUser>}    
                </div> 
                {touched.photo && errors.photo && <ErrorText className='errorText-myProfile-update'>{errors.photo} </ErrorText> }
              </div>
                
              <div className="marginLeft10px marginBottom05rem">
                <div>
                  <Label className='font12px' htmlFor="firstName" >Nombre ( actual : {user.firstName} )</Label>
                    <InputGroup >
                      <InputUser className='colorBlack form-control'
                        type="text" 
                        name="firstName" 
                        id="firstName"  
                        placeholder='Ingrese su nombre'
                        value={values.firstName}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />              
                      {touched.firstName && errors.icoNfirstName && <IconUser>{errors.icoNfirstName}</IconUser>}
                    </InputGroup> 
                </div>
                {touched.firstName && errors.firstName && <ErrorText className='errorText-myProfile-update'>{errors.firstName} </ErrorText> }
              </div>

              <div className="marginLeft10px marginBottom05rem">
                <div>
                <Label className='font12px'htmlFor="lastName" >Apellido  ( actual : {user.lastName} )</Label>
                    <InputGroup>
                      <InputUser className='form-control'
                        type="text" 
                        name="lastName" 
                        id="lastName"  
                        value={values.lastName}
                        placeholder='Ingrese su apellido'
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />
                      {touched.lastName && errors.icoNlastName && <IconUser>{errors.icoNlastName}</IconUser>}
                    </InputGroup>
                </div> 
                {touched.lastName && errors.lastName && <ErrorText className='errorText-myProfile-update'>{errors.lastName} </ErrorText> }
              </div>
              
              <div className="marginLeft10px marginBottom05rem">
                <div>
                    <Label className='font12px'htmlFor="password" > Password
                      <span className="colorTransparent">..</span>
                      <button type="button" 
                        className='btn btn-light' 
                        onClick={switchShown}> {shown ? '🙈' : '👀'}
                      </button> 
                    </Label>  

                    <InputGroup>
                      <InputUser className='colorBlack form-control'
                        type={shown ? "text" : "password" }
                        name="password" 
                        id="password"  
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>}   
                    </InputGroup>
                </div> 
                {touched.password && errors.password && <ErrorText className='errorText-myProfile-update'>{errors.password} </ErrorText> }
              </div>

              { errors.formOk === "f" && 
              <MsjWrong className='centerText'> 
              <span className="centerText">
                <br /> Algun dato es incorrecto. 
                <br/> Por favor complete el formulario correctamente
              </span>        
              </MsjWrong>
              }

              <div className="centerText">
                <Link to={"/"}  className="m-1 btn buttonBlue" role="button" > Volver </Link>
                <SendButton type="submit" className="m-1 btn  buttonGreen"> Guardar </SendButton> 
              </div>  
         </div> 
    </form>
    )}
   </Formik>
   </div>
  </>
  );
};
export default MyProfileUpdate;