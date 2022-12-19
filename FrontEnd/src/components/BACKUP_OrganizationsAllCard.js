import React from 'react';
import './styles/styles.css';
import './styles/members-organizations.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, 
      instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{

  return (
      <div className="cardContainerMember cardContainerOrganization" >
        <img className="cardImageOrganization m-2 ms-4" src={image}  alt="organization" ></img>
        <div className='cardContentOrganization'>
          <div className="cardTitle flex-Center mb-4"><em>{name}</em></div>
          <p className='centerText'>Domicilio : {address}</p>
          <div className='iconNetwork mb-4'>
            <p className='m-1'><FaIcons.FaPhone className='me-1'/>{phone}</p>
            <p className='m-1'><FaIcons.FaMailBulk className='me-1'/>{email}</p>
            <p className='m-1'><FaIcons.FaFacebook className='me-1'/>{facebook}</p>
            <p className='m-1'> <FaIcons.FaInstagram className='me-1'/>{instagram}</p>
            <p className='m-1'> <FaIcons.FaLinkedin className='me-1'/>{linkedin}</p>
          </div>
          <p className='fixedSizeCardWelcomeOrganization mb-4'>Bienvenid@s !, {welcomeText}</p>
          <p className='fixedSizeCardOrganization mb-3'><u> Sobre nosotros</u> : {aboutUsText}</p>
          <div>
            <div className={ViewAdministratorOptions()}>
              <hr></hr>
              <div className="centerText">
                <p ><b> Ingreso</b> {formatDate(new Date(created))}</p>
                <p ><b> Actualizado </b>{formatDate(new Date(updated))}</p>
              </div>
            </div>
          </div>
          <div>
            <div className={ViewAdministratorOptions()}>    
              <div className='flex-Center'>
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