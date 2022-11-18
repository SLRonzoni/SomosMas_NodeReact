import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/members-organizations.css';
import './styles/card.css';
import {formatDate} from './helpers/FormatDate';
import facebookLogo from './images/facebook.jpg';
import instagramLogo from './images/instagram.jpg';
import linkedinLogo from'./images/linkedin.png';
import emailLogo from './images/email.jpg';
import whatsapp from './images/whatsapp.jpg';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";
import * as FaIcons from 'react-icons/fa';

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{

  return (
      <div className="cardContainerMember" >
        <img className="cardImageOrganization" src={image}  alt="organization" ></img>
       
        <div className='cardContentOrganization'>
          <div className="cardTitle centerText"><em>{name}</em></div>
          <br/>
          <p className='centerText'>Domicilio : {address}</p>
          <div className='leftText'>        
              <img className="iconSocialNetworksOrganization "src={whatsapp} alt="telefono"></img>  {phone}
              <span className='colorBlack'><br></br></span>
              <img className="iconSocialNetworksOrganization "src={emailLogo} alt="email"></img> {email}
              <span className='colorBlack'><br></br></span>
              <img className="iconSocialNetworksOrganization "src={facebookLogo} alt="logoFacebook"></img> {facebook}
              <span className='colorBlack'><br></br></span>
              <img className="iconSocialNetworksOrganization "src={instagramLogo} alt="logoInstagram" ></img> {instagram}
              <span className='colorBlack'><br></br></span>
              <img className="iconSocialNetworksOrganization  bgWhite"src={linkedinLogo} alt="logoLinkedin"></img> {linkedin}
          </div> 
          <br/>    
          <div className='fixedSizeCardWelcomeOrganization'><> Hola !, </> {welcomeText}</div>
          <br></br>
          <div className='fixedSizeCardOrganization'><u> Sobre nosotros</u> : {aboutUsText}</div>
          <br/>
          <div >
            <div className={ViewAdministratorOptions()}>
              <hr></hr>
              <div className="displayFlex centerText">
                <span ><b> Ingreso</b> {formatDate(new Date(created))}</span>
                <span ><b> Actualizado </b>{formatDate(new Date(updated))}</span>
              </div>
              <br/>
            </div>
          </div>
          <div >
            <div className={ViewAdministratorOptions()}>    
              <div className='centerText d-flex'>
                <Link to={`/organizations/update/${id}`}> 
                  <FaIcons.FaPencilAlt className='iconBlue'/> 
                </Link>
                <div className="button" onClick={()=>{remove(id)}}> 
                  <FaIcons.FaTrashAlt className='iconRed'/>
                </div> 
              </div> 
            </div>        
          </div>
        </div>
      </div>
  );
};
export default OrganizationsAllCard;