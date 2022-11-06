import React from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram,FaMailBulk,FaMapMarker,FaPhone } from "react-icons/fa";
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";
import ActivitiesPublicAll from "./ActivitiesPublicAll";
import imagen from "./images/manos_logo-sinFondo.png";


function Home() {
  return (  
    <div className="containerBasic containerHome">      
      <div className="containerTransparent">       
          <div className="contentHome">
            <h1 className="d-flex centerText"> Somos Más
              <img className="shadowFilterNav imgHome" src={imagen} alt="manosNiños"></img>
            </h1> 
            <p>  Organización No Gubernamental</p>
            <div className="container1Home d-flex">
              <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
                <FaMapMarker className="iconHomeMap"/> 
              </a>   
              <span >Av. R. Balbin 4780  CABA  - ( 011-6011-2988 )</span>
            </div>
          
            <div className="buttons">
              <Link to={'/auth/login'} className="m-5 btn btn-success"role="button"> Donar </Link> 
            </div>
        
            <div className="container2Home">
              <div className={ViewRegularUserOptions()}> 
                <span className="spanEscribinos m-4">Escribinos</span>
               
                <a href="/contactForm" >
                  <FaMailBulk className="iconHome"/>
                </a>  
                <br/>
                <span className="spanEscribinos">Seguinos en nuestras redes</span>
                
                <div className="d-flex m-4 centerText ">
                  <a href="http://instagram.com/somosmasong/" >
                    <FaInstagram className="iconHome me-5"/> 
                  </a>
 
                  <a href="https://www.facebook.com/profile.php?id=100086643616310"  >
                    <FaFacebook className="iconHome"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="sliderHome">
        <ActivitiesPublicAll/>
      </div>

    </div>    
  );
};

export default Home;