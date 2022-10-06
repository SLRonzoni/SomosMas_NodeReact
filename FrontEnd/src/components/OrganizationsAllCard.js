import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/card.css';
import {formatDate} from './helpers/FormatDate';
import facebookLogo from './images/facebook.jpg';
import instagramLogo from './images/instagram.jpg';
import linkedinLogo from'./images/linkedin.png';
import emailLogo from './images/email.jpg';
import whatsapp from './images/whatsapp.jpg';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{

  return (
    <div>
      <br></br>
      <div className="cardContainerOrganization" >
        <div className='imageContainer'> 
          <img className="cardImageOrganization" src={image}  alt="organization" ></img>
        </div>
        <div className='cardContent'>
          <div className="cardTitle centerText"><em>{name}</em></div>
          <br></br>
          <p className=''><u> Domicilio</u> : {address}</p>
          <div>        
              <img className="iconSocialNetworksOrganization "src={whatsapp} alt="telefono"></img> <span className="colorTransparent"></span> {phone}
              <span> <br></br></span>
              <img className="iconSocialNetworksOrganization "src={emailLogo} alt="email"></img> <span ></span>{email}
              <span><br></br></span>
              <img className="iconSocialNetworksOrganization "src={facebookLogo} alt="logoFacebook"></img> <span ></span>{facebook}
              <span><br></br></span>
              <img className="iconSocialNetworksOrganization "src={instagramLogo} alt="logoInstagram" ></img> <span ></span>{instagram}
              <span><br></br></span>
              <img className="iconSocialNetworksOrganization  bgWhite"src={linkedinLogo} alt="logoLinkedin"></img> <span ></span>{linkedin}
          </div>  
          <hr></hr>
          <div className='fixedSizeCardWelcomeOrganization'><> Hola !, </> {welcomeText}</div>
          <br></br>
          <div className='fixedSizeCardOrganization'><u> Sobre nosotros</u> : {aboutUsText}</div>
          <br></br>
          <div >
            <div className={ViewAdministratorOptions()}>
              <hr></hr>
              <div className="displayFlex centerText">
                <span ><b> Ingreso :</b> {formatDate(new Date(created))}</span>
              
                <span ><b> Actualizado : </b>{formatDate(new Date(updated))}</span>
              </div>
            </div>
          </div>
          <div >
            <div className={ViewAdministratorOptions()}>    
              <div className='centerText'>        
                <Link to={`/organizations/${id}`} className="btn btn-primary btn-sm mr-1 me-md-2 "
                      role="button" aria-pressed="true"> Modificar </Link>            
                <button type="button" className="btn btn-danger btn-sm mr-1 me-md-2 "onClick={()=>{remove(id);}} >Eliminar </button>
              </div> 
            </div>        
            </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationsAllCard;