import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate'

const NewsAllLine = ({id, name, image, content, categoryId, create,update,remove}) =>{
  
    return (
        <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglon" >{name}</td>
            <td className="imageChar centerText" ><img src={image}  alt="newsImage"></img> </td>
            <td className="renglon" >{categoryId}</td>
            <td className="renglon" >{content}</td>
            <td className="renglon centerText" >{formatDate(new Date(create))}</td>
            <td className="renglon centerText" >{formatDate(new Date(update))}</td>
            
            <td className="renglon centerText">   
                <Link to={`/news/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default NewsAllLine;