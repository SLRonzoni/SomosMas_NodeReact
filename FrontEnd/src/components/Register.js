import React from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';
import { Formik } from "formik";
import * as msg  from './helpers/validationMessages';
import * as regex from "./helpers/RegExp";
import { ErrorText,IconUser, InputUser, InputGroup} from './elements/ElementsFormStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import imagen from "./images/manos_fondo-sinFondo.png";

const Register=(props)=> {

    const X='❌';
    const V='✔️';

    //SHOW PASSWORD
    const [shown, setShown] = React.useState(false);
    const switchShown = () => setShown(!shown);

    //SEND
    const sendForm = (values) => {
        //CREATE    
        let body = new FormData()
        body.append("firstName",values.firstName);
        body.append("lastName",values.lastName);
        body.append("email",values.email);
        body.append("roleId",process.env.REACT_APP_ROLE_REGULAR_USER);
        body.append("password",values.currentPassword);
        body.append("photo",values.photo);  

        const createUser = async () => {
            await axiosClient
            .post('/auth/register',body)
            .then(response=>{
                if(response.status===200 ){     
                    Swal.fire({
                        icon: "success",
                        title: `Te registraste correctamente !`,
                        timer:1000,
                        showConfirmButton:false
                    });
                props.history.push("/About");
                } else {             
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton:true
                    })
                };          
            })     
            .catch(error=>{
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Error"
                });
            });
        }
        createUser();
    };

    //FORMIK INITIAL VALUES
    let initialValues={firstName:'', 
        lastName:'',
        photo:'',
        email:'',
        currentPassword:'',
        confirmPassword:''}

    //FORMIK VALIDATIONS 
    let validateInputs=(values) =>{   

        let errors = {firstName: '',lastName:'', photo:'', email:'',currentPassword:'',confirmPassword:'', 
        icoNfirstName:'',icoNlastName:'', icoNphoto:'',iconNemail:'', icoNcurrentPassword:'', icoNconfirmPassword:'',formOk:''};  

        if (!values.email) {
            errors.email=msg.msgRequired
            errors.icoNemail=X
            return errors
        };

        if (!regex.regexUserEmail.test(values.email)) {
            errors.email=msg.msgValidationUserEmail
            errors.icoNemail= V
            errors.formOk='f'
            return errors
        } else {
            errors.icoNemail=V
            errors.formOk='v'
        };

        if (!values.firstName) {
            errors.firstName=msg.msgRequired
            errors.icoNfirstName= X
            return errors
        };

        if (!regex.regexUserfirstName.test(values.firstName)) {
            errors.firstName=msg.msgValidationUserFirstName
            errors.icoNfirstName=X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNfirstName= V
            errors.formOk='v'
        };

        if (!values.lastName) {
            errors.lastName=msg.msgRequired
            errors.icoNlastName= X
            return errors
        };

        if (!regex.regexUserLastName.test(values.lastName)) {
            errors.lastName=msg.msgValidationUserLastName
            errors.icoNlastName= X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNlastName= V
            errors.formOk='v'
        };
       

        if (!values.currentPassword) {
            errors.currentPassword=msg.msgRequired
            errors.icoNcurrentPassword= X
            return errors
        };

        if (!regex.regexUserPassword.test(values.currentPassword)) {
            errors.currentPassword=msg.msgValidationUserPassword
            errors.icoNcurrentPassword= X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNcurrentPassword= V
            errors.formOk='v'
        };

        if (!values.confirmPassword) {
            errors.confirmPassword=msg.msgRequired
            errors.icoNconfirmPassword=X
            return errors
        };

        if (values.currentPassword!==values.confirmPassword){
            errors.confirmPassword="las passwords ingresadas son distintas"
            errors.icoNconfirmPassword= X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNpassword= V
            errors.formOk='v'
        };
    }   


    return (
        <>
            <div className="containerFirst">
                <div className="containerImgHalfScreen"> 
                    <img className="imgHalfScreen" src={imagen} alt="ManitosPintatdas"></img>
                </div>

                <div className="begginRegister">
                    <Formik  
                        initialValues={initialValues}           
                        validate={validateInputs}
                        onSubmit={(values)=>{ sendForm(values)}}
                    > 
                    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => ( 
                
                        <form className="containerRegisterContactForm " onSubmit={handleSubmit}>
                            <h5 className="centerText mt-5 mb-4">Formulario de Registro</h5>
                            <div>
                                <div>
                                    <div className="mb-4">
                                        <div className="d-flex">   
                                            <label className="labelRegister"  htmlFor="photo">Foto </label>
                                            <InputGroup  >
                                                <InputUser className="form-control pt-1"
                                                    type="file" 
                                                    name="photo" 
                                                    id="photo"  
                                                    encType="multipart/form-data"
                                                    onChange={ (e)=>setFieldValue('photo',e.currentTarget.files[0]) } 
                                                    onBlur={handleBlur}
                                                />
                                                {touched.photo && errors.icoNphoto && <IconUser>{errors.icoNphoto}</IconUser>}    
                                            </InputGroup> 
                                        </div> 
                                        {touched.photo && errors.photo && <ErrorText>{errors.photo} </ErrorText> }
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex">   
                                            <label className="labelRegister"  htmlFor="email">Email</label>
                                            <InputGroup>
                                                <InputUser className="form-control"
                                                    type="email" 
                                                    name="email" 
                                                    id="email"  
                                                    value={values.email}
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur}
                                                />
                                                {touched.email && errors.icoNemail && <IconUser>{errors.icoNemail}</IconUser>}
                                            </InputGroup>
                                        </div> 
                                        {touched.email && errors.email && <ErrorText>{errors.email} </ErrorText> }
                                    </div>
                                    
                                    <div className="mb-4">
                                        <div className="d-flex">   
                                            <label className="labelRegister"  htmlFor="firstName">Nombre</label>
                                            <InputGroup >
                                                <InputUser className="form-control"
                                                    type="text" 
                                                    name="firstName" 
                                                    id="firstName"  
                                                    value={values.firstName}
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur}
                                                />              
                                                {touched.firstName && errors.icoNfirstName && <IconUser>{errors.icoNfirstName}</IconUser>}
                                            </InputGroup> 
                                        </div>
                                        {touched.firstName && errors.firstName && <ErrorText>{errors.firstName} </ErrorText> }
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex">   
                                            <label className="labelRegister"  htmlFor="lastName">Apellido</label>
                                            <InputGroup>
                                                <InputUser className="form-control"
                                                    type="text" 
                                                    name="lastName" 
                                                    id="lastName"  
                                                    value={values.lastName}
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur}
                                                />
                                                {touched.lastName && errors.icoNlastName && <IconUser>{errors.icoNlastName}</IconUser>}
                                            </InputGroup>
                                        </div> 
                                        {touched.lastName && errors.lastName && <ErrorText>{errors.lastName} </ErrorText> }
                                    </div>
                                
                                    <div className="mb-4">
                                        <div className="d-flex withoutBorder withoutBg">   
                                            <label className="labelRegister"  htmlFor="currentPassword"> Password 
                                                <button className="withoutBorder withoutBg ms-3" type="button" onClick={switchShown}> 
                                                    {shown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />} 
                                                </button> 
                                            </label> 
                                            <InputGroup>
                                                <InputUser className="form-control"
                                                    type={shown ? "text" : "password" }
                                                    name="currentPassword" 
                                                    id="currentPassword"  
                                                    value={values.currentPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.currentPassword && errors.icoNcurrentPassword && <IconUser>{errors.icoNcurrentPassword}</IconUser>}   
                                            </InputGroup>
                                        </div> 
                                        {touched.currentPassword && errors.currentPassword && <ErrorText>{errors.currentPassword} </ErrorText> }
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex">   
                                            <label className="labelRegister"  htmlFor="confirmPassword"> Repetir Password</label>  
                                            <InputGroup>
                                                <InputUser className="form-control"
                                                type={shown ? "text" : "password" }
                                                name="confirmPassword" 
                                                id="confirmPassword"  
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                            {touched.confirmPassword && errors.icoNconfirmPassword && <IconUser>{errors.icoNconfirmPassword}</IconUser>}   
                                            </InputGroup>
                                        </div> 
                                        {touched.confirmPassword && errors.confirmPassword && <ErrorText>{errors.confirmPassword} </ErrorText> }
                                    </div>

                                    <div className="registerMsj-Buttons ">                              
                                        { (errors.formOk === "v" || !errors.formOk )&& 
                                            <span className="buttonsResponsive">
                                                <Link to={"/"} className=" btn buttonBlue" role="button" aria-pressed="true"> Volver </Link>
                                                <button type="submit" className="btn buttonBlue buttonGreen">Guardar </button>
                                            </span>
                                        }
                                    </div> 
                                </div>  
                            </div>
                        </form>
                        )}
                    </Formik>
                </div>        
            </div>    
        </>
    );
};
export default Register;
