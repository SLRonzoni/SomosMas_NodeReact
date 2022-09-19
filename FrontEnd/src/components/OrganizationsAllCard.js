import React, {Fragment}from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import facebookLogo from './images/facebook.jpg';
import instagramLogo from './images/instagram.jpg';
import linkedinLogo from'./images/linkedin.png';
import emailLogo from './images/email.jpg';

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{

  //hacer visibles opciones para administrador
  const getRoleView =()=> { 
    let isAdmin=JSON.parse( sessionStorage.getItem('userInfo'))   
    if(isAdmin.roleId === 1) { 
      return 'visible'
    } else {
      return 'invisible'
    };
  };

  return (
    <>
    <Fragment >
        <Card  className="cardOrganization ">
          <Card.Body  >
            <Card.Title className="centerText"><b>{name}</b></Card.Title>
            <Card.Text className="imagenCharCard centerText"> <img src={image}  alt="organization" ></img></Card.Text>
            <br></br>
            <Card.Text ><b> Domicilio :</b> {address}</Card.Text>
            <Card.Text ><b> Teléfono  :</b> {phone}</Card.Text>
            <Card.Text ><img className="iconoSocialNetworks"src={emailLogo} alt="email"></img> {email}</Card.Text>
            <Card.Text ><img className="iconoSocialNetworks"src={facebookLogo} alt="logoFacebook"></img> {facebook}</Card.Text> 
            <Card.Text ><img className="iconoSocialNetworks"src={instagramLogo} alt="logoIg" ></img> {instagram}</Card.Text>
            <Card.Text ><img className="iconoSocialNetworks"src={linkedinLogo} alt="logoLinkedin"></img> {linkedin}</Card.Text>
            <br></br>
            <Card.Text className='fixedSizeCardOrganization'><b> Bienvenida :</b> {welcomeText}</Card.Text>
            <Card.Text className='fixedSizeCardOrganization'><b> Sobre nosotros :</b> {aboutUsText}</Card.Text>
            <br></br>
            <Card.Text >
                <div className={getRoleView()}>
                  <div className="displayFlex centerText">
                    <span ><b> Ingreso :</b> {formatDate(new Date(created))}</span>
                    <span className='colorBlack'>.....</span>
                    <span ><b> Actualizado : </b>{formatDate(new Date(updated))}</span>
                  </div>
                </div>
            </Card.Text>
            <Card.Text >
              <div className={getRoleView()}>    
                <div className='centerText'>        
                  <Link to={`/organization/${id}`} className="btn btn-primary btn-sm mr-1 me-md-2 "
                        role="button" aria-pressed="true"> Modificar </Link>            
                  <button type="button" className="btn btn-danger btn-sm mr-1 me-md-2 "onClick={()=>{remove(id);}} >Eliminar </button>
                </div> 
              </div>        
            </Card.Text>
          </Card.Body>
        </Card>    
      </Fragment>
      </>
  );
};
export default OrganizationsAllCard;