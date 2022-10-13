import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate'

const CategoriesAllLine = ({id, name, image, description, create,update,remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td className="imageChar centerText" ><img src={image}  alt="categoryImage"></img> </td>
            <td >{name}</td>
            <td >{description}</td>
            <td className="centerText" >{formatDate(new Date(create))}</td>
            <td className="centerText" >{formatDate(new Date(update))}</td>
            
            <td className="centerText">   
                <Link to={`/categories/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default CategoriesAllLine;