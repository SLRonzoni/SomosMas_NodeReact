import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";

const TestimonialsAllLine = ({id, name, image, content, create,update,remove}) =>{
  
    return (
        <tr className='colorWhite' >
            <td className="renglonNro">{id}</td>
            <td className="renglon" >{name}</td>
            <td className="imageChar centerText" ><img src={image}  alt="categoryImage"></img> </td>
            <td className="renglon" >{content}</td>
            <td className="renglon centerText" >{formatDate(new Date(create))}</td>
            <td className="renglon centerText" >{formatDate(new Date(update))}</td>
            
            <td className={ViewAdministratorOptions()}>   
                <button type="button" className="m-1 mr-md-2 btn btn-danger centertext" onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>   
        </tr>
    );
};
export default TestimonialsAllLine;