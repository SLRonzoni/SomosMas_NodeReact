import React, {Fragment}from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';


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
            <Card.Text className=""><b> Facebook  :</b> {facebookUrl}</Card.Text> 
            <Card.Text className=""><b> Instagram :</b> {instagramUrl}</Card.Text>
            <Card.Text className=""><b> Linkedin  :</b> {linkedinUrl}</Card.Text>
            <Card.Text className="displayFlex center">
                <div className={getRoleView()}>
                  <p className=""><b> Ingreso :</b> {formatDate(new Date(created))}</p>
                  <p className='colorBlack'>.......</p>
                  <p className=""><b> Actualizado : </b>{formatDate(new Date(updated))}</p>
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