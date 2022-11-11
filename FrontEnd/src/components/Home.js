import React from "react";
import "./styles/styles.css";
import "./styles/navbarFooter.css";
import "./styles/beggin-login-register-home.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import ActivitiesPublicAll from "./ActivitiesPublicAll";

function Home() {
  return (  
    <div className="containerHome"> 
      <div className="containerLeft">  
            <div className="containerAddress">
              <p>
                Desde 1997 en Somos Más o.n.g. trabajamos con los chicos, chicas, mamás,
                papás, familiares, vecinas y vecinos del barrio La Tranquerita generando
                procesos de crecimiento y de inserción social. 
              </p>
            </div>

            <div className="buttonHome">
              <Link to={'/auth/login'} className="m-5 btn btn-success"role="button"> Donar </Link> 
            </div>

            <div className="containerAddress m-3 centerText">
              <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
              </a>  
                <FaIcons.FaMapMarkerAlt className="iconHomeMap"/>  
                <span>Av. R. Balbin 4780  CABA</span>
                  <FaIcons.FaWhatsapp className="iconPhone"/> 
                <span>011-6011-2988</span>
            </div>
            <span className="d-flex m-2 centerText ">Contactanos</span>
            <div className="d-flex centerText ">
              
              <a href="/contactForm" >
                <FaIcons.FaMailBulk className="iconHome me-5"/>
              </a>              
            
              <a href="http://instagram.com/somosmasong/" >
                <FaIcons.FaInstagram className="iconHome me-5"/> 
              </a>

              <a href="https://www.facebook.com/profile.php?id=100086643616310"  >
                <FaIcons.FaFacebook className="iconHome"/>
              </a>
            </div>  
          </div>
  
      <div className="sliderHome">
        <ActivitiesPublicAll/>
      </div>
    </div>  
  );
};

export default Home;