import React, {Fragment}from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import linkedin from'./images/linkedin.png';
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';


const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, linkedinUrl, created, updated, remove}) =>{

 
  return (
    <>
    <Fragment >
        <Card  className="cardMembers ">
          <Card.Body className="" >
            <Card.Title className="centerText"><b>{name}</b></Card.Title>
            <Card.Text className="imagenCharCard centerText"> <img src={image}  alt="miembro" ></img></Card.Text>
            <br></br>
            <Card.Text className="fixedSizeCardMembers"><b> Detalle :</b> {description}</Card.Text>
            <Card.Text ><img className="iconoSocialNetworks"src={facebook}></img> {facebookUrl}</Card.Text> 
            <Card.Text ><img className="iconoSocialNetworks"src={instagram}></img> {instagramUrl}</Card.Text>
            <Card.Text ><img className="iconoSocialNetworks"src={linkedin}></img> {linkedinUrl}</Card.Text>
            <br></br>
            <Card.Text >
                <div className={ViewAdministratorOptions()}>
                  <div className="displayFlex centerText">
                    <span className=""><b> Ingreso :</b> {formatDate(new Date(created))}</span>
                    <span className='colorBlack'>.....</span>
                    <span className=""><b> Actualizado : </b>{formatDate(new Date(updated))}</span>
                  </div>
                </div>
            </Card.Text>
            <Card.Text >
                <div className={ViewAdministratorOptions()}>    
                  <div className='centerText'>        
                    <Link to={`/members/update/${id}`} className="btn btn-primary btn-sm mr-1 me-md-2 "
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
export default MembersCard;