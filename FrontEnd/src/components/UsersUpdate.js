import React, {useState,useEffect} from 'react';
import axiosClient from '../configuration/axiosClient';
import './styles/styles.css';
import { Link } from "react-router-dom";
import { Formik } from 'formik';
import { msgRequired,msgValidationUserFirstName,msgValidationUserLastName, msgValidationUserPassword,msgValidationUserEmail} from './helpers/validationMessages';
import { regexUserfirstName, regexUserLastName, regexUserPassword } from "./helpers/RegExp";
import {formatDate} from './helpers/FormatDate';
import { SendButton, MsjWrong, ErrorText,Icon, Label, Input, InputGroup} from './elements/ElementsFormStyles';
import Swal from "sweetalert2";

const EditUsers = ({match, history}) =>{
      
  const  {id}=match.params;

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
  },[]); 


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("firstName",values.firstName);
    body.append("lastName",values.lastName);
    body.append("password",values.password);
    body.append("photo",values.photo);

  const updateUser = async () => {
    await axiosClient
      .put(`/users/update/${id}`,body)
      .then(response => {
        if (response.status===201) {
          setUser(response.data.data)
          Swal.fire({
            icon: "success",
            title: "Actualización de perfil exitosa !",
            timer:1000,
            showConfirmButton: false
          });
        history.push("/");
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon:"error",
          title: "Error"
          });
        });
  };
  updateUser();
};

//FORMIK INITIAL VALUES
let initialValues={firstName:user.firstName, 
                   lastName:user.lastName,
                   photo:user.photo,
                   email:user.email,
                   password:user.password}

//FORMIK VALIDATIONS 
let validateInputs=(values) =>{   

  let errors = {firstName: '',lastName:'', photo:'', password:'',  
  icoNfirstName:'',icoNlastName:'', icoNphoto:'', icoNpassword:'',formOk:''};  

  if (!values.firstName) {
    values.firstName=user.firstName
  };

  if (!regexUserfirstName.test(values.firstName)) {
    errors.firstName=msgValidationUserFirstName
    errors.icoNfirstName= '❌'
    return errors
  } else {
    errors.icoNfirstName= '✔️'
  };

  if (!values.lastName) {
    values.lastName=user.lastName
  };

  if (!regexUserLastName.test(values.lastName)) {
    errors.lastName=msgValidationUserLastName
    errors.icoNlastName= '❌'
    return errors
  } else {
    errors.icoNlastName= '✔️'
  };

  if(!values.photo) {
    values.photo=user.photo
  };

  if (!values.password) {
    errors.password=msgRequired
    errors.icoNpassword= '❌'
    return errors
  };

  if (!regexUserPassword.test(values.password)) {
    errors.password=msgValidationUserPassword
    errors.icoNpassword= '❌'
    return errors
  } else {
    errors.icoNpassword= '✔️'
  };

  if(errors.firstName || errors.lastName || errors.photo || errors.password){
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
        <form className="container-sm col-6 col-md-4 bg-light "onSubmit={handleSubmit} > 
            <h4>Mi Perfil  
              <span className='margenEnd'><em>( última actualización : {formatDate(new Date(user.updatedAt))} )</em></span>
            </h4>
              
            <div className='marginTop'>

              <div>
                <div >   
                    <Label htmlFor="photo"> </Label>
                    <p className="pUpdateCateg"><img  src={user.photo}  alt="userPhoto"/></p>
                    <InputGroup>
                      <Input className="form-control"
                            type="file" 
                            name="photo" 
                            id="photo"  
                            encType="multipart/form-data"
                           
                            onChange={ (e)=>setFieldValue('photo',e.currentTarget.files[0]) } 
                            onBlur={handleBlur}
                      />
                     </InputGroup>  
                   
                {touched.photo && errors.icoNphoto && <Icon>{errors.icoNphoto}</Icon>}    
                </div> 
                {touched.photo && errors.photo && <ErrorText>{errors.photo} </ErrorText> }
              </div>
              <br></br>
                
              <div>
                <div >
                <Label htmlFor="firstName">Nombre actual :<span className="pUpdateCateg" ><em>{user.firstName}</em></span></Label>
                    <InputGroup>
                      <Input  className="form-control"
                              type="text" 
                              name="firstName" 
                              id="firstName"  
                              value={values.firstName}
                              onChange={handleChange} 
                              onBlur={handleBlur}
                              autoFocus
                      />
                     </InputGroup> 
                {touched.firstName && errors.icoNfirstName && <Icon>{errors.icoNfirstName}</Icon>}    
                </div> 
                {touched.firstName && errors.firstName && <ErrorText>{errors.firstName} </ErrorText> }
              </div>
              <br></br>

              <div>
                <div>
                <Label htmlFor="lastName">Apellido actual : <span className="spanUpdateCateg"><em>{user.lastName}</em></span></Label>
                    
                    <InputGroup>
                      <Input  className="form-control"
                              type="text" 
                              name="lastName" 
                              id="lastName"  
                              value={values.lastName}
                              onChange={handleChange} 
                              onBlur={handleBlur}
                      />
                     </InputGroup>
                   
                {touched.lastName && errors.icoNlastName && <Icon>{errors.icoNlastName}</Icon>}    
                </div> 
                {touched.lastName && errors.lastName && <ErrorText>{errors.lastName} </ErrorText> }
              </div>
              <br></br>

              <div>
                <div>
                    <Label htmlFor="lastName">Email registrado ( no se permite modificar ) </Label>
                    <p className="pUpdateCateg"> {user.email}</p>
                </div> 
              </div>
              <br></br>
              
              <div>
                <div>
                    <Label htmlFor="password"> Password : <button className='btn buttonBlue' onClick={switchShown}> {shown ? 'Ocultar' : 'Mostrar'}</button> </Label>                   
                    <InputGroup>
                      <Input  className="form-control"
                              name="password" 
                              id="password"  
                              value={values.password}
                              onChange={handleChange}
                              type={shown ? "text" : "password" }
                              onBlur={handleBlur}
                      />
                    </InputGroup>
                {touched.password && errors.icoNpassword && <Icon>{errors.icoNpassword}</Icon>}    
                </div> 
                {touched.password && errors.password && <ErrorText>{errors.password} </ErrorText> }
              </div>
              { errors.formOk === "f" && 
              <MsjWrong> 
              <span className="centerText">
                <br /> Algun dato es incorrecto. 
                <br/> Por favor complete el formulario correctamente
              </span>        
              </MsjWrong>
            }
              <br></br>
              <div className="centerText">
                  <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                  <Link 
                    to={"/UsersAll"}
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
export default EditUsers;