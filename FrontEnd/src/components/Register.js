import React from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';
import { Formik } from "formik";
import { msgRequired,msgValidationUserFirstName,msgValidationUserLastName, msgValidationUserEmail, msgValidationUserPassword, msgValidationUserConfirmPassword} from './helpers/validationMessages';
import { regexUserfirstName, regexUserLastName, regexUserPassword, regexUserEmail } from "./helpers/RegExp";
import { SendButton, MsjWrong, ErrorText,IconUser, Label, InputUser, InputGroup} from './elements/ElementsFormStyles';
import Header from "./Header";
import Footer from "./Footer";
import image from "./images/manos_fondo-sinFondo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const Register=(props)=> {

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
                props.history.push("/auth/login");
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

        let errors = {firstName: '',lastName:'', photo:'', email:'',currentPassword:'', 
        icoNfirstName:'',icoNlastName:'', icoNphoto:'',iconNemail:'', icoNpassword:'',formOk:''};  

        if (!values.email) {
            errors.email=msgRequired
            errors.icoNemail= '❌'
            return errors
        };

        if (!regexUserEmail.test(values.email)) {
            errors.email=msgValidationUserEmail
            errors.icoNemail= '❌'
            errors.formOk='f'
            return errors
        } else {
            errors.icoNemail= '✔️'
            errors.formOk='v'
        };

        if (!values.firstName) {
            errors.firstName=msgRequired
            errors.icoNfirstName= '❌'
            return errors
        };

        if (!regexUserfirstName.test(values.firstName)) {
            errors.firstName=msgValidationUserFirstName
            errors.icoNfirstName= '❌'
            errors.formOk='f'
            return errors
        } else {
            errors.icoNfirstName= '✔️'
            errors.formOk='v'
        };

        if (!values.lastName) {
            errors.lastName=msgRequired
            errors.icoNlastName= '❌'
            return errors
        };

        if (!regexUserLastName.test(values.lastName)) {
            errors.lastName=msgValidationUserLastName
            errors.icoNlastName= '❌'
            errors.formOk='f'
            return errors
        } else {
            errors.icoNlastName= '✔️'
            errors.formOk='v'
        };
       

        if (!values.currentPassword) {
            errors.password=msgRequired
            errors.icoNpassword= '❌'
            return errors
        };

        if (!regexUserPassword.test(values.currentPassword)) {
            errors.password=msgValidationUserPassword
            errors.icoNpassword= '❌'
            errors.formOk='f'
            return errors
        } else {
            errors.icoNpassword= '✔️'
            errors.formOk='v'
        };

        if (values.currentPassword!==values.confirmPassword){
            errors.password=msgValidationUserConfirmPassword
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
    <div className="containerBeggin">
        <header>
            <Header />
        </header>

        <div className="contentHome">          
          <h1>Bienvenid@s !!!</h1>
          <main className="mainBeggin">
            <img className="imgBeggin" src={image} alt="manos" ></img>
          </main>
        </div>     

        <div className="begginRegister-right-col">
          <div className="begginRegister">
         
            <Formik  
                    initialValues={initialValues}           
                    validate={validateInputs}
                    onSubmit={(values)=>{ sendForm(values)}}
            > 
            { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {} 
        
                <form className="containerRegisterContactForm " onSubmit={handleSubmit}>
                    <h5 className="centerText ">Formulario de Registro</h5>
                    <div>
                        <div>
                            <div className="marginBottom05rem">
                                <div className="displayInLineFlex">   
                                    <Label className="labelRegister"  htmlFor="photo">Foto </Label>
                                    <InputGroup  >
                                        <InputUser className="form-image"
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

                            <div className="marginBottom05rem">
                                <div className="displayInLineFlex">   
                                    <Label className="labelRegister"  htmlFor="email">Email</Label>
                                    <InputGroup>
                                        <InputUser className="form-control"
                                        type="text" 
                                        name="email" 
                                        id="email"  
                                        value={values.email}
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        />
                                        {touched.email && errors.icoNemail && <IconUser>{errors.icoNemail}</IconUser>}
                                    </InputGroup>
                                </div> 
                                {touched.email && errors.email && <ErrorText className="errorsRegister">{errors.email} </ErrorText> }
                            </div>
                            
                            <div className="marginBottom05rem">
                                <div className="displayInLineFlex">   
                                    <Label className="labelRegister"  htmlFor="firstName">Nombre</Label>
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
                                {touched.firstName && errors.firstName && <ErrorText className="errorsRegister">{errors.firstName} </ErrorText> }
                            </div>

                            <div className="marginBottom05rem">
                                <div className="displayInLineFlex">   
                                    <Label className="labelRegister"  htmlFor="lastName">Apellido</Label>
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
                                {touched.lastName && errors.lastName && <ErrorText className="errorsRegister">{errors.lastName} </ErrorText> }
                            </div>
                        
                            <div className="marginBottom05rem">
                                <div className="displayInLineFlex">   
                                    <Label className="labelRegister"  htmlFor="currentPassword"> Password </Label>  
                                    <InputGroup>
                                        <InputUser className="form-control"
                                        type={shown ? "text" : "password" }
                                        name="currentPassword" 
                                        id="currentPassword"  
                                        value={values.currentPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        />
                                        {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>} 
                                        {<IconUser><button className="withoutBorder" type="button" onClick={switchShown}> 
                                                   {shown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />} 
                                        </button> </IconUser>} 
                                    </InputGroup>
                                </div> 
                                {touched.password && errors.password && <ErrorText>{errors.password} </ErrorText> }
                            </div>

                            <div className="marginBottom05rem">
                                <div className="displayInLineFlex">   
                                    <Label className="labelRegister"  htmlFor="confirmPassword"> Repetir Password</Label>  
                                    <InputGroup>
                                        <InputUser className="form-control"
                                        type={shown ? "text" : "password" }
                                        name="confirmPassword" 
                                        id="confirmPassword"  
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        />
                                    {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>}   
                                    </InputGroup>
                                </div> 
                                {touched.password && errors.password && <ErrorText>{errors.password} </ErrorText> }
                            </div>

                            <div className="registerMsj-Buttons">                              
                                { errors.formOk === "f" && 
                                    <MsjWrong className="centerText"> 
                                    <span className="centerText">
                                        <br /> Algun dato es incorrecto. 
                                        <br/> Por favor complete el formulario correctamente
                                    </span>        
                                </MsjWrong>
                                } 
                                { errors.formOk === "v" || !errors.formOk && 
                                    <span>
                                        <SendButton type="submit" className="m-3 btn buttonBlue">Guardar </SendButton>
                                        <Link to={"/Beggin"} className="m-3 btn  registerMsj-Buttons-button buttonBlue" role="button" aria-pressed="true"> Volver </Link>
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
        
        <footer className="footer">
            <Footer/>
        </footer>
    </div>    
  </>
  );
};
export default Register;
