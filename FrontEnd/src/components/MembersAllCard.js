import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/card.css';
import {formatDate} from './helpers/FormatDate';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import linkedin from'./images/linkedin.png';
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';


const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, linkedinUrl, created, updated, remove}) =>{

 
  return (
    <div>
        <div className="card-container">
            <div className='image-container'> 
              <img className='card-image' src={image} alt="foto"></img>
            </div>
           <div className='card-content'>
              <div className="card-title"><em>{name}</em></div>
                <p className="fixedSizeCardMembers "><b> </b> {description}</p>
                <br></br>
              </div>
              <div>
                <img className="iconNetworks" src={facebook} alt="facebook"></img> {facebookUrl} 
              </div> 
              <div>
                <img className="iconNetworks" src={instagram} alt="instagram"></img> {instagramUrl}
              </div>
              <div> 
                <img className="iconNetworks bgWhite" src={linkedin} alt="linkedin"></img> {linkedinUrl}
              </div>
            
            <br></br>
            <div >
                <div className={ViewAdministratorOptions()}>
                  <div className="displayFlex centerText">
                    <span className=""><b> Ingreso :</b> {formatDate(new Date(created))}</span>
                    <span className='colorBlack'>.....</span>
                    <span className=""><b> Actualizado : </b>{formatDate(new Date(updated))}</span>
                  </div>
                </div>
            </div>
            <div >
                <div className={ViewAdministratorOptions()}>    
                  <div className='centerText'>        
                    <Link to={`/members/update/${id}`} className="btn btn-primary btn-sm mr-1 me-md-2 "
                          role="button" aria-pressed="true"> Modificar </Link>            
                    <button type="button" className="btn btn-danger btn-sm mr-1 me-md-2 "onClick={()=>{remove(id);}} >Eliminar </button>
                  </div> 
                </div>        
              </div>
        </div>    
      </div>
  );
};
export default MembersCard;