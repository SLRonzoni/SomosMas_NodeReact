import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/card.css';
import './styles/members-organizations.css';
import {formatDate} from './helpers/FormatDate';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import linkedin from'./images/linkedin.png';
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';
import * as FaIcons from 'react-icons/fa';


const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, linkedinUrl, created, updated, remove}) =>{

 
  return (
        <div className="cardContainerMember">
            <div className="imageContainerMember"> 
              <img className="cardImageOrganization" src={image} alt="colaborador"></img>
            </div>
            
            <div className='cardContentMember'>
              <div className="cardTitleMember centerText"><em>{name}</em></div>
              <br/>
              <p className="fixedSizeCardMember">{description}</p>
              <div className='centerText m-4'>
                <img className="iconSocialNetworksOrganization" src={facebook} alt="facebook"></img> {facebookUrl} 
                <span className='colorBlack'><br></br></span>
                <img className="iconSocialNetworksOrganization" src={instagram} alt="instagram"></img> {instagramUrl}
                <span className='colorBlack'><br></br></span>
                <img className="iconSocialNetworksOrganization bgWhite" src={linkedin} alt="linkedin"></img> {linkedinUrl}
              </div>
              <br/>
              <div className={ViewAdministratorOptions()}>
                <div className="displayFlex centerText">
                  <span><b> Ingreso</b> {formatDate(new Date(created))}</span>
                  <span><b> Actualizado </b>{formatDate(new Date(updated))}</span>
                </div>
              </div> 
              <div className={ViewAdministratorOptions()}>  
                <div className="d-flex centerText m-1"> 
                  <Link to={`/members/update/${id}`}> 
                    <FaIcons.FaPencilAlt className='iconBlue'/> 
                  </Link>
                  <div className="button" onClick={()=>{remove(id)}}> 
                    <FaIcons.FaTrashAlt className='iconRed'/>
                  </div>                          
                </div>  
              </div>        
          </div>
        </div>    
  );
};
export default MembersCard;