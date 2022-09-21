import React, {Fragment}from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import facebookLogo from './images/facebook.jpg';
import instagramLogo from './images/instagram.jpg';
import linkedinLogo from'./images/linkedin.png';
import emailLogo from './images/email.jpg';
import whatsapp from './images/whatsapp.jpg';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const OrganizationsAllCard = ({ id, name, image, address, phone, email, facebook, instagram, linkedin,welcomeText, aboutUsText, created, updated, remove}) =>{


  return (
    <>
    <Fragment >
        <Card  className="cardOrganization ">
          <Card.Body  >
            <Card.Title className="centerText"><b>{name}</b></Card.Title>
            <Card.Text className=" imagenCardOrganization centerText "> <img className="borderRounded boxShadow" src={image}  alt="organization" ></img></Card.Text>
            <br></br>
            <Card.Text className='centerText'><u> Domicilio</u> : {address}</Card.Text>
            <Card.Text className='marginLeft25px' >        
                <span><img className="iconSocialNetworksOrganizations"src={whatsapp} alt="telefono"></img> {phone}</span>
                <br></br> <br></br>
                <span><img className="iconSocialNetworksOrganizations"src={emailLogo} alt="email"></img> {email}</span>
                <br></br><br></br>
                <span><img className="iconSocialNetworksOrganizations"src={facebookLogo} alt="logoFacebook"></img> {facebook}</span>
                <br></br><br></br>
                <span><img className="iconSocialNetworksOrganizations"src={instagramLogo} alt="logoIg" ></img> {instagram}</span>
                <br></br><br></br>
                <span><img className="iconSocialNetworksOrganizations bgWhite"src={linkedinLogo} alt="logoLinkedin"></img> {linkedin}</span>
            </Card.Text>  
           
            <br></br>
            <Card.Text className='fixedSizeCardOrganization'><> Hola !, </> {welcomeText}</Card.Text>
            <Card.Text className='fixedSizeCardOrganization'><u> Sobre nosotros</u> : {aboutUsText}</Card.Text>
            <br></br>
            <br></br>
            <Card.Text >
                <div className={ViewAdministratorOptions()}>
                  <div className="displayFlex centerText">
                    <span ><b> Ingreso :</b> {formatDate(new Date(created))}</span>
                    <span className='colorBlack'>.....</span>
                    <span ><b> Actualizado : </b>{formatDate(new Date(updated))}</span>
                  </div>
                </div>
            </Card.Text>
            <Card.Text >
              <div className={ViewAdministratorOptions()}>    
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