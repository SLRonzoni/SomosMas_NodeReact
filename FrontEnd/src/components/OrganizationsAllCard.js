import React, {useState} from 'react';
import './styles/styles.css';
import './styles/cards.css';
import './styles/members-organizations.css';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, 
      instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{

  const [show, setShow]=useState(false);
        
  const seeMore = () => setShow(!show);

  return (
      <div className="card">
        <div className="card_publication">
          <img className="card_img" src={image}  alt="organization" ></img>

          <span className='card_author'>
            <div className={ViewAdministratorOptions()}>    
              <div>
                <Link to={`/organizations/update/${id}`}> 
                  <FaIcons.FaPencilAlt className='iconPencil'/> 
                </Link>
                <div className="button" onClick={()=>{remove(id)}}> 
                  <FaIcons.FaTrashAlt className='iconTrash'/>
                </div> 
              </div> 
            </div> 
          </span>
        </div>

        <div className="card_info">
          <h2 className="card_title"><em>{name}</em></h2>
          <span className='card_subtitle'>Domicilio : {address}</span>
          <span className='card_subtitle ms-3'><FaIcons.FaPhone className='m-1'/>{phone}</span>

          {(show===false) ?
            <div>
              <p className='card_description'></p>
              <div className='mb-4'>
                <p className='m-1'><FaIcons.FaMailBulk className='me-1'/>{email}</p>
                <p className='m-1'><FaIcons.FaFacebook className='me-1'/>{facebook}</p>
                <p className='m-1'> <FaIcons.FaInstagram className='me-1'/>{instagram}</p>
                <p className='m-1'> <FaIcons.FaLinkedin className='me-1'/>{linkedin}</p>
              </div>  
              <div className='d-flex'>        
                <button className='btn ms-auto' onClick={()=>{seeMore()}}>            
                  Leer más 
                  &rarr;        
                </button>
              </div>  
            </div>     
          :
          <div>
            <div className="card-info">
              <p className='fixedSizeCardWelcomeOrganization mb-4'>Bienvenid@s !, {welcomeText}</p>
              <p className='fixedSizeCardOrganization mb-3'><u> Sobre nosotros</u> : {aboutUsText}</p>
              <div>
                <div className={ViewAdministratorOptions()}>
                  <div className="flex-Center">
                    <p><b> Ingreso</b> {formatDate(new Date(created))}</p>
                    <p className='ms-3'><b> Actualizado </b>{formatDate(new Date(updated))}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <button className='btn ms-auto' onClick={()=>{seeMore()}}>            
                &larr;    
              </button>
            </div> 
          </div>            
         }
        </div>
      </div>      
  );
};
export default OrganizationsAllCard;