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


const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, linkedinUrl, created, updated, remove}) =>{

 
  return (
   
        <div className="cardContainerMember">
          
            <div className="imageContainerMember"> 
              <img className="cardImageMember" src={image} alt="colaborador"></img>
            </div>
            
            <div className='cardContentMember'>
              <div className="cardTitle centerText"><em>{name}</em></div>
              <br></br>
              <p className="fixedSizeCardMember"><b> </b> {description}</p>
              
              <div className='centerText'>
                <img className="iconSocialNetworksOrganization" src={facebook} alt="facebook"></img> {facebookUrl} 
                <span className='colorBlack'><br></br></span>
                <img className="iconSocialNetworksOrganization" src={instagram} alt="instagram"></img> {instagramUrl}
                <span className='colorBlack'><br></br></span>
                <img className="iconSocialNetworksOrganization bgWhite" src={linkedin} alt="linkedin"></img> {linkedinUrl}
              </div>

              <br></br>
           
            <div className={ViewAdministratorOptions()}>
              <div className="displayFlex centerText">
                <span><b> Ingreso</b> {formatDate(new Date(created))}</span>
                <span><b> Actualizado </b>{formatDate(new Date(updated))}</span>
              </div>
            </div> 

            <div className={ViewAdministratorOptions()}>    
              <div className='centerText'> 
              <br></br>       
                <Link to={`/members/update/${id}`} className="btn btn-primary btn-sm  me-md-5 "
                      role="button" aria-pressed="true"> Modificar </Link>            
                <button type="button" className="btn btn-danger btn-sm mr-1 me-md-1 "onClick={()=>{remove(id);}} >Eliminar </button>
              </div> 
            </div>        
          </div>
        </div>    
      
  );
};
export default MembersCard;