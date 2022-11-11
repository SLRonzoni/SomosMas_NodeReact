import React,{useState} from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import { Link,Redirect} from "react-router-dom"; 
import Swal from "sweetalert2";
import LoginGoogle from './LoginGoogle';
import { SendButton, MsjWrong, ErrorText,IconUser, Label, InputUser, InputGroup} from './elements/ElementsFormStyles';

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
     
    
    return (
      <div className="containerFirst">
        <div className="containerLogin">  
          <div>
            <LoginGoogle > </LoginGoogle>
          </div>
        
          <br/>
      
          <h3>Inicio de sesión</h3>

          <div >
          <Label htmlFor="email">Email </Label>
          <InputUser type="email" 
                  className="form-control" 
                  name="email"  
                  placeholder="correo@correo.xxx.xx" 
                  required
                  uppercase="true"
                  onChange={(e)=>setEmail(e.target.value)}
                  // onBlur={handleBlur}
                  />
          </div>
          <br/>
        
          <div className="form-group" >
            <Label htmlFor="password">Contraseña </Label>
            <InputUser type="password" 
                    className="form-control"  
                    name="password"  
                    placeholder="Contraseña" 
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    // onBlur={handleBlur}
                    />
          </div>
        
          <div className="centerText">
            <Link to={"/"} className="m-3 mr-md-2 btn buttonBlue" role="button" aria-pressed="true"> Volver </Link>
            <SendButton type="submit" className="m-2 btn" onClick={beginSession} >Login </SendButton> 
          </div>

          <div>
            <span>No tenés cuenta ? 
              <Link to={"/auth/register"} className="m-2 ">registrate</Link>
            </span>
          </div>
        </div>
      </div>
    );
  };
};

export default Login;