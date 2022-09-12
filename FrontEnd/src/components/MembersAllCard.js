import React, {Fragment}from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import linkedin from'./images/linkedin.png';


const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, linkedinUrl, created, updated, remove}) =>{

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
    <Fragment >
        <Card  className="card ">
          <Card.Body className="" >
            <Card.Title className="centerText"><b>{name}</b></Card.Title>
            <Card.Text className="imagenCharCard centerText"> <img src={image}  alt="miembro" ></img></Card.Text>
            <br></br>
            <Card.Text className="fixedSizeCard"><b> Detalle :</b> {description}</Card.Text>
            <Card.Text className="displayFlex centerText">
                <Card.Text ><img className="icono"src={facebook}></img> {facebookUrl}</Card.Text> 
                <Card.Text ><img className="icono"src={instagram}></img> {instagramUrl}</Card.Text>
            </Card.Text>
            <Card.Text className="displayFlex centerText">
                <Card.Text ><img className="iconoLinkedin"src={linkedin}></img> {linkedinUrl}</Card.Text>
            </Card.Text>
            <Card.Text >
                <div className={getRoleView()}>
                  <div className="displayFlex centerText">
                      <p className=""><b> Ingreso :</b> {formatDate(new Date(created))}</p>
                      <p className='colorBlack'>.....</p>
                      <p className=""><b> Actualizado : </b>{formatDate(new Date(updated))}</p>
                  </div>
                </div>
            </Card.Text>
            <Card.Text >
                <div className={getRoleView()}>    
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
  );
};
export default MembersCard;