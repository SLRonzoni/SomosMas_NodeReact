import React from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';
import { Formik } from "formik";
import { msgRequired,msgValidationUserFirstName,msgValidationUserLastName, msgValidationUserEmail, msgValidationUserPassword, msgValidationUserConfirmPassword} from './helpers/validationMessages';
import { regexUserfirstName, regexUserLastName, regexUserPassword, regexUserEmail } from "./helpers/RegExp";
import { SendButton, MsjWrong, ErrorText,IconUser, Label, InputUser, InputGroup} from './elements/ElementsFormStyles';

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
        body.append("password",values.password);
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
        password:'',
        confirmPassword:''}

    //FORMIK VALIDATIONS 
    let validateInputs=(values) =>{   

        let errors = {firstName: '',lastName:'', photo:'', email:'',password:'', 
        icoNfirstName:'',icoNlastName:'', icoNphoto:'',iconNemail:'', icoNpassword:'',formOk:''};  

        if (!values.firstName) {
            errors.firstName=msgRequired
            errors.icoNfirstName= '❌'
            return errors
        };

        if (!regexUserfirstName.test(values.firstName)) {
            errors.firstName=msgValidationUserFirstName
            errors.icoNfirstName= '❌'
            return errors
        } else {
            errors.icoNfirstName= '✔️'
        };

        if (!values.lastName) {
            errors.lastName=msgRequired
            errors.icoNlastName= '❌'
            return errors
        };

        if (!regexUserLastName.test(values.lastName)) {
            errors.lastName=msgValidationUserLastName
            errors.icoNlastName= '❌'
            return errors
        } else {
            errors.icoNlastName= '✔️'
        };

        if (!values.email) {
            errors.email=msgRequired
            errors.icoNemail= '❌'
            return errors
        };

        if (!regexUserEmail.test(values.email)) {
            errors.email=msgValidationUserEmail
            errors.icoNemail= '❌'
            return errors
        } else {
            errors.icoNemail= '✔️'
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

        if (values.password!==values.confirmPassword){
            errors.password=msgValidationUserConfirmPassword
            errors.icoNpassword= '❌'
            return errors
        } else {
            errors.icoNpassword= '✔️'
        };

        if(errors.firstName || errors.lastName || errors.email || errors.photo || errors.password){
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
        <form className="container-sm col-6 col-md-4 bgGrey " onSubmit={handleSubmit}>
            <br></br>
            <h4 className="centerText">Formulario de Registro</h4>
            <div className="centerContainer">
                <div className="alignCenter">
                    <div >
                        <div >   
                            <Label htmlFor="photo"> </Label>
                            <p className="pUpdateCateg">
                                { values.photo ? <img  src={values.photo}  alt="userPhoto"/> : ''}
                            </p>
                            <InputGroup  >
                            <InputUser className="form-control"
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
                    {touched.photo && errors.photo && <ErrorText>{errors.photo} </ErrorText> }
                    </div>
                    <br></br>
                    
                    <div>
                        <div>
                            <Label htmlFor="firstName">Nombre :</Label>
                            <InputGroup >
                                <InputUser
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
                    <br></br>

                    <div>
                        <div>
                        <Label htmlFor="lastName">Apellido : </Label>
                            <InputGroup>
                                <InputUser
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
                    <br></br>

                    <div>
                        <div>
                            <Label htmlFor="lastName">Email : </Label>
                            <InputGroup>
                                <InputUser
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
                    {touched.email && errors.email && <ErrorText>{errors.email} </ErrorText> }
                    </div>
                    <br></br>
                    
                    <div>
                        <div>
                            <Label htmlFor="password"> Password : 
                                <span className="colorGrey">.........</span>
                                <button type="button" 
                                        className='btn buttonBlue' 
                                        onClick={switchShown}> {shown ? 'Ocultar' : 'Ver'}
                                </button> 
                            </Label>  

                            <InputGroup>
                                <InputUser
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
                    {touched.password && errors.password && <ErrorText>{errors.password} </ErrorText> }
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="confirmPassword"> Repetir Password : </Label>  

                            <InputGroup>
                                <InputUser
                                type={shown ? "text" : "password" }
                                name="confirmPassword" 
                                id="password"  
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                            {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>}   
                            </InputGroup>
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
                        to={"/"}
                        className="m-3 mr-md-2 btn buttonBlue"
                        role="button"
                        > Volver
                        </Link>
                    </div>  
                </div>  
            </div>
        </form>
      )}
   </Formik>
  </>
  );
};
export default Register;
