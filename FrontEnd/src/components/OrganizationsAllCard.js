import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/members-organizations.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";
import * as FaIcons from 'react-icons/fa';

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{

  return (
      <div className="cardContainerMember cardContainerOrganization" >
        <img className="cardImageOrganization m-2 ms-4" src={image}  alt="organization" ></img>
       
        <div className='cardContentOrganization'>
          <div className="cardTitle centerText"><em>{name}</em></div>
          <br/>
          <p className='centerText'>Domicilio : {address}</p>
          <div className='iconNetwork'>
            <p className='m-1'><FaIcons.FaPhone className='me-1'/>{phone}</p>
            <p className='m-1'><FaIcons.FaMailBulk className='me-1'/>{email}</p>
            <p className='m-1'><FaIcons.FaFacebook className='me-1'/>{facebook}</p>
            <p className='m-1'> <FaIcons.FaInstagram className='me-1'/>{instagram}</p>
            <p className='m-1'> <FaIcons.FaLinkedin className='me-1'/>{linkedin}</p>
          </div>

          <br/>    
          <div className='fixedSizeCardWelcomeOrganization'>Bienvenid@s !, {welcomeText}</div>
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