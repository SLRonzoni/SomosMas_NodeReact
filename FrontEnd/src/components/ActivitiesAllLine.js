import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate'

const ActivitiesAllLine = ({id, name, image, content, create,update,remove}) =>{
  
    return (
        <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglon" >{name}</td>
            <td className="imageChar centerText" ><img src={image}  alt="activityImage"></img> </td>
            <td className="renglon" >{content}</td>
            <td className="renglon centerText" >{formatDate(new Date(create))}</td>
            <td className="renglon centerText" >{formatDate(new Date(update))}</td>
            
            <td className="renglon centerText">   
                <Link to={`/categories/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default ActivitiesAllLine;