import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import axiosClient from "../configuration/axiosClient";

function RespuestaGoogle() {

 //Migracion que exige google  
 useEffect(() => {
  function start() {
    gapi.client.init({
      clientId:process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        scope: "email",
    });
  }
  gapi.load("client:auth2", start);
}, [])


  if(localStorage.getItem('loginData')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer: 5000,
    })
    
  } else {


  //RESPUESTA OK GOOGLE
  const onSuccess = (googleData) => {  

    let name=googleData.profileObj.name;
   
    const userData={
               user:{ 
                 name:googleData.profileObj.name,
                 email:googleData.profileObj.email
               }
    }
   
    sessionStorage.setItem('userInfo',JSON.stringify(googleData.profileObj))
    //sessionStorage.setItem('token',JSON.stringify(response.data.token))
    sessionStorage.setItem('loginData',true)


    const getUserData = async () => {
      //BUSCAR EN BD DATOS DEL ID Y ROLE DEL EMAIL LOGUEADO 
      //Busco id   
        const response=await axiosClient.get(`/users/redes?userEmail=${googleData.profileObj.email.toUpperCase()}`,
          { withCredentials: true }
        );
       
        if(response.status===200){  
         userData.user.role=response.data.role
         userData.user.id=response.data.id  
        }
        localStorage.setItem('userInfo',JSON.stringify(userData)) 
    }
    getUserData();
  
         
      //MENSAJE DE BIENVENIDA
      Swal.fire({
        icon: "success",
        title: `Bienvenid@ ${name}  !`,
        showConfirmButton: false,
        timer: 5000,
      });
      setTimeout( function() { window.location.href = "/"; },1000 );
  }  
  
    //RESPUESTA MAL GOOGLE
    const onFailure = (response) => {
      console.error("Error Google ! ", response);
      Swal.fire({
        icon: "error",
        title: "Error !",
        text: response,
        showConfirmButton:false,
        timer:1000
      })
    };
    
  return (
    <div>
        <GoogleLogin
          className='m-3 mr-md-2 btn-redes' 
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText='Iniciar sesion con Google'         
        />
    </div>
  );
 } 
};

export default RespuestaGoogle;
