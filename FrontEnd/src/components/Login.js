import React,{useState} from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import { Link,Redirect } from "react-router-dom"; 
import Swal from "sweetalert2";
import LoginGoogle from './LoginGoogle';
import { Formik } from "formik";
import * as msg  from './helpers/validationMessages';
import * as regex from "./helpers/RegExp"
import * as FaIcons from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import imagen from "./images/manos_fondo-sinFondo.png";
import {ErrorText,IconUser, Input, InputGroup} from './elements/ElementsFormStyles';

const Login =()=>{   
 
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const [password, setPassword] = useState("")

  const loginData= sessionStorage.getItem('loginData')

  //SHOW PASSWORD
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);
  
  if(loginData==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer:1000
    })
    return( <Redirect to="/"/>)
  } else {
    const loginOK = (usuario)=>{
      Swal.fire({
          icon: "success",
          title: `Bienvenid@ ${usuario} !`,
          showConfirmButton:false,
          timer:1000
      })    
    };

    const loginError = (response)=>{
      Swal.fire({
         icon: "error",
         title: "Error !",
         text: response,
         showConfirmButton:false,
         timer:1000
       })
   };
    
    //INICIO DE SESION
    const beginSession = async (values) => {    

      await axiosClient.post('/auth/login',{"email":values.email,"password":values.password},{withCredentials:true})

      .then(response=>{
        if(response.status===204 ||response.status===200 ){
          let name=response.data.user.firstName;
          
           sessionStorage.setItem('userInfo',JSON.stringify(response.data.user))
           sessionStorage.setItem('token',JSON.stringify(response.data.token))
           sessionStorage.setItem('loginData',true)

          loginOK(name);
          setTimeout( function() { window.location.href = "/About" }, 1000 );
          
        } else {
          loginError(response);          
        }
      }) 
      .catch(error=>{
        console.log(error)
        Swal.fire({
         icon: 'error',
         title: 'Error',
         text: ' Usuario o contraseña incorrectos'
       });
      });
    };  

     //FORMIK INITIAL VALUES
    let initialValues={ email:'', password }

    //FORMIK VALIDATIONS 
    let validateInputs=(values) =>{   

        let errors = {email:'',password:'',iconNemail:'', icoNpassword:'',formOk:''};  

        if (!values.email) {
            errors.email=msg.msgRequired
            errors.icoNemail= X
            return errors
        };

        if (!regex.regexUserEmail.test(values.email)) {
            errors.email=msg.msgValidationUserEmail
            errors.icoNemail= X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNemail=V
            errors.formOk='v'
        };

        if (!values.password) {
            errors.password=msg.msgRequired
            errors.icoNpassword= X
            return errors
        };

        if (!regex.regexUserPassword.test(values.password)) {
            errors.password=msg.msgValidationUserPassword
            errors.icoNpassword= X
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
        
        <div className="d-flex">
          <div className="containerImgHalfScreen "> 
            <img className="imgHalfScreen" src={imagen} alt="ManitosPintatdas"></img>
          </div>

           <div className="heart">
            <p>Para hacer una donación ... logueate</p>
          </div> 
        </div>
        
        <div className="containerLogin">
          <div className="buttonLoginGoogle">  
            <LoginGoogle> </LoginGoogle>        
          </div>

          <Formik  
            initialValues={initialValues}           
            validate={validateInputs}
            onSubmit={(values)=>{ beginSession(values)}}
          > 
          { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {} 
      
              <form className="containerLoginForm" onSubmit={handleSubmit}>
                  <h5 className="centerText m-4">Inicio de sesión</h5>
                  <div>
                      <div>   
                        <label className="d-block ms-2" htmlFor="email">Email</label>
                        <InputGroup className="iconInsideInputDiv">
                          <FaIcons.FaMailBulk className="iconInsideInputIcon"></FaIcons.FaMailBulk>
                          <Input className="ps-5 form-control"
                            type="email" 
                            name="email" 
                            id="email"  
                            value={values.email}
                            placeholder="correo@correo.xxx.xx" 
                            required
                            uppercase="true"
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            />
                          {touched.email && errors.icoNemail && <IconUser>{errors.icoNemail}</IconUser>}
                        </InputGroup>
                      </div> 
                      {touched.email && errors.email && <ErrorText className="ms-2">{errors.email} </ErrorText> }
                  </div>
                  <br/>
                  <div>
                    <div> 
                      <div className="withoutBorder withoutBg">
                        <label className="p-2" htmlFor="password">Password</label>
                        {<button className="withoutBorder withoutBg ms-1" type="button" onClick={switchShown}> 
                            {shown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />} 
                          </button>
                        }  
                      </div> 
                      <InputGroup className="iconInsideInputDiv">
                        <FaIcons.FaKey className="iconInsideInputIcon"></FaIcons.FaKey>
                        <Input className="ps-5 form-control"
                          type={shown ? "text" : "password" }
                          name="password" 
                          id="password"  
                          value={values.password}
                          placeholder="contraseña" 
                          required
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          />
                        {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>}
                      </InputGroup>
                    </div> 
                    {touched.password && errors.password && <ErrorText className="ms-2">{errors.password} </ErrorText> }
                  </div>

                  <div>                              
                    { (errors.formOk === "v" || !errors.formOk) && 
                      <span className="buttonsResponsive">
                        <Link to={"/"} className=" btn buttonBlue" role="button"> Volver </Link>
                        <button type="submit" className=" btn buttonBlue buttonGreen" onClick={beginSession} >Login </button> 
                      </span>
                    }
                  </div> 
                </form>
                )}
            </Formik>
        
              <div className="buttonsResponsive">
                <span className="ms-5">No tenés cuenta ? 
                  <Link to={"/auth/register"} className="p-1 ">registrate</Link>
                </span>
              </div>

        </div>
      </div>
      </>
    );
  };
};

export default Login;