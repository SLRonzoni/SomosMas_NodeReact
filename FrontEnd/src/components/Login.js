import React,{useState} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import { Link,Redirect} from "react-router-dom"; 
import Swal from "sweetalert2";
import LoginGoogle from './LoginGoogle';// boton login con google

const Login =()=>{   
 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginData= sessionStorage.getItem('loginData')
  
  if(loginData==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer:1000
    })
    return( <Redirect to="/" />)
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
     const beginSession = async (e) => { 
      e.preventDefault();  
      
 //FALTAN VALIDACIONES     

      await axiosClient.post('/auth/login',{"email":email,"password":password},{withCredentials:true})

      .then(response=>{
        if(response.status===204 ||response.status===200 ){
          let name=response.data.user.firstName;
          
           sessionStorage.setItem('userInfo',JSON.stringify(response.data.user))
           sessionStorage.setItem('token',JSON.stringify(response.data.token))
           sessionStorage.setItem('loginData',true)

          loginOK(name);
          setTimeout( function() { window.location.href = "/" }, 1000 );
          
        } else {
          loginError(response);
          console.log(response)            
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
     
    
    return (
      <div className="container-sm col-6 col-md-4 bg-light" >  
 
        <div className="displayFlex" >  
          <div className="centrar">
           <LoginGoogle> </LoginGoogle>
          </div>
          <br/>
          <br/>
        </div>
        <br/>
     
        <h3>Inicio de sesión</h3>

        <div className="form-group">
         <label className="formLabel">Email </label>
         <input type="email" 
                className="form-control" 
                name="email"  
                placeholder="correo@correo.com.ar" 
                required
                uppercase="true"
                onChange={(e)=>setEmail(e.target.value)}
                />
        </div>
        <br/>
      
        <div className="form-group" >
          <label className="formLabel">Contraseña </label>
          <input type="password" 
                  className="form-control"  
                  name="password"  
                  placeholder="Contraseña" 
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                  />
        </div>
      
        <div className="d-grid gap-4 d-md-flex justify-content-md-center">
            <button
              className="m-2 btn btn-primary"
              onClick={beginSession}
            >
              Login
            </button>
            <Link
              to={"/"}
              className="m-2 btn btn-primary"
              role="button"
              aria-pressed="true"
            >
              {" "}
              Volver{" "}
            </Link>
        </div>

        <div>
          <span>No tienes cuenta ? 
            <Link to={"/auth/register"}
            className="m-2 ">
            {" "}
            registrarse{" "}
          </Link>
          </span>
        </div>
      </div>
    );
  };
};

export default Login;