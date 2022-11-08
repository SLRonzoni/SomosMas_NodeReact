import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const TestimonialsAllLine = ({id, name, image, content, userId,  create,update,remove}) =>{
  
    return (
        <tr >
            <td >{id}</td>
            <td className="imageChar centerText borderTransparent" ><img src={image}  alt="testimonialImage"></img> </td>
            <td >{name}</td>
            <td >{content}</td>
            <td >{userId}</td>
            <td className="centerText" >{formatDate(new Date(create))}</td>
            <td className="centerText" >{formatDate(new Date(update))}</td>
            
            <td >
                <div className={ViewAdministratorOptions()}>   
                    <button type="button" className="m-1 mr-md-3 btn btn-danger" onClick={()=>{remove(id)}} >Eliminar </button>  
                 </div>   
            </td>   
        </tr>
    );
};
export default TestimonialsAllLine;