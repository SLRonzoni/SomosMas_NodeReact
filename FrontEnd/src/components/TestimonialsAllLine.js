import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const TestimonialsAllLine = ({id, name, image, content, create,update,remove}) =>{
  
    return (
        <tr  >
            <td >{id}</td>
            <td >{name}</td>
            <td className="imageChar centerText" ><img src={image}  alt="categoryImage"></img> </td>
            <td >{content}</td>
            <td className="centerText" >{formatDate(new Date(create))}</td>
            <td className="centerText" >{formatDate(new Date(update))}</td>
            
            <td className={ViewAdministratorOptions()}>   
                <button type="button" className="m-1 mr-md-2 btn btn-danger" onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>   
        </tr>
    );
};
export default TestimonialsAllLine;