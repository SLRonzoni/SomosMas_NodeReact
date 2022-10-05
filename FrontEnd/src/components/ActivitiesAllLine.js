import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate'

const ActivitiesAllLine = ({id, name, image, content, create,update,remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td >{name}</td>
            <td className="imageChar centerText" ><img src={image}  alt="activityImage"></img> </td>
            <td  >{content}</td>
            <td className=" centerText" >{formatDate(new Date(create))}</td>
            <td className=" centerText" >{formatDate(new Date(update))}</td>
            
            <td className=" centerText">   
                <Link to={`/activities/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default ActivitiesAllLine;