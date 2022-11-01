import React from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import { Link } from "react-router-dom";
import email from './images/email.jpg';
import mapa from './images/mapa.png';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";
import ActivitiesPublicAll from "./ActivitiesPublicAll";
import imagen from "./images/manos_logo-sinFondo.png";

function Home() {
  return (  
    <div className="containerBasic">
      <div className="containerTransparent">
        <div className="contentHome">
          <h1> Somos Más <img className="handsLogo shadowFilterNav imgHome" src={imagen} alt="manosNiños"></img> </h1>
          <p>  Organización No Gubernamental</p>
          <div className="container1Home displayFlex">
            <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
              <img className='contentHomeIcon contentHomeIconMap' src={mapa} alt="Mapa"></img>  
            </a>   
            <span >Av. R. Balbin 4780  CABA  - ( 011-6011-2988 )</span>
          </div>
          
          <div className="buttons">
            <div>
              <Link to={'/Beggin'} className="m-5 btn buttonIngresar"role="button"> Ingresar </Link> 
            </div>
            <div>
              <Link to={'/PaymentMethod'} className="m-5 btn btn-success"role="button"> Donar </Link> 
            </div>
          </div>
        
          <div className="container2Home">
            <div className={ViewRegularUserOptions()}> 
              <span>Escribinos</span>
              <a href="/contactForm" >
                <img className="contentHomeIcon"src={email} alt="Email"></img>  
              </a>    
            
              <span>Click en nuestras redes</span>
                <div className="buttons">
                  <a href="http://instagram.com/somosmasong/" >
                    <img className="contentHomeIconFI"src={instagram} alt="Instagram"></img>
                  </a>

                  <a href="https://www.facebook.com/profile.php?id=100086643616310"  >
                    <img className="contentHomeIconFI"src={facebook} alt="Facebook"></img>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slideHome-right-col">
        <div className="sliderHome">
          <ActivitiesPublicAll/>
        </div>
      </div>

    </div>    
  );
};

export default Home;