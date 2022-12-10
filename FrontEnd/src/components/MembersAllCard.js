import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/members-organizations.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';
import * as FaIcons from "react-icons/fa";


const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, linkedinUrl, created, updated, remove}) =>{

 
  return (
    <div className="cardContainerMember">
      <img className="cardImageMember" src={image} alt="colaborador"></img>        
      <div>
        <div className="cardTitleMember"><em>{name}</em></div>
          <div className='iconNetwork'>
            <p className='m-1'><FaIcons.FaFacebook className='me-1'/>{facebookUrl}</p>
            <p className='m-1'> <FaIcons.FaInstagram className='me-1'/>{instagramUrl}</p>
            <p className='m-1'> <FaIcons.FaLinkedin className='me-1'/>{linkedinUrl}</p>
          </div>
        </div>
        <br/>
        <p className='fixedSizeMember'>{description}</p> 
        <div className={ViewAdministratorOptions()}>
          <div className="iconNetwork">
            <p><b> Ingreso</b> {formatDate(new Date(created))}</p>
            <p><b> Actualizado </b>{formatDate(new Date(updated))}</p>
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
  );
};
export default MembersCard;