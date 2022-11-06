import React from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import image from "./images/manos_fondo-sinFondo.png";
import Login from "./Login";


function Beggin() {
  return (     
      <div className="containerBeggin">
       
        <div className="contentHome">          
          <h1>Bienvenid@s !!!</h1>
          <main className="mainBeggin">
            <img className="imgBeggin" src={image} alt="manos" ></img>
          </main>
        </div>     

        <div className="begginLogin-right-col">
          <div className="begginLogin">
            <Login/>
          </div>
        </div>
        
      </div>    
  );
};

export default Beggin;