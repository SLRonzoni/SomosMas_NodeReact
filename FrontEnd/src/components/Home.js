import React from "react";
import "./styles/styles.css";
import "./styles/navbarFooter.css";
import "./styles/login-register-home.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import ActivitiesPublicAll from "./ActivitiesPublicAll";

function Home() {
  let route;
  const userInfo=JSON.parse(sessionStorage.getItem('userInfo'));

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
          {!userInfo ?   
            <Link to={'/auth/login'} className="m-5 btn btn-success buttonGreen" role="button"> Donar </Link>
            :
            <a href="/PaymentMethod" className="m-5 btn btn-success buttonGreen" role="button">Donar</a>
          }  
        </div>

        <div className="containerAddress">
          <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
            <FaIcons.FaMapMarkedAlt className="iconHomeMap"/> 
          </a>
          <span className="me-3">Av. R.Balbin 4780 - CABA</span>
        
          <div className="d-flex centerText ms-4">
            <FaIcons.FaWhatsapp className="iconPhone "/> 
            <span >011-6011-2988</span>
          </div>
        </div>
        <span className="m-2 flex-Center ">Contactanos</span>

        <div className="flex-Center ">
          <a href="/contactForm" >
            <FaIcons.FaMailBulk className="iconHome me-4"/>
          </a>              
        
          <a href="http://instagram.com/somosmasong/" >
            <FaIcons.FaInstagram className="iconHome me-4"/> 
          </a>

          <a href="https://www.facebook.com/profile.php?id=100086643616310"  >
            <FaIcons.FaFacebook className="iconHome me-4"/>
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