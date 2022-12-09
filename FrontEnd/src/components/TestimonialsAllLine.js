import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";
import * as FaIcons from 'react-icons/fa';

const TestimonialsAllLine = ({id, name, image, content, userId,  create,update,remove}) =>{
  
    return (
        <tr >
            <td>{id}</td>
            <td className="imageChar centerText borderTransparent" ><img src={image}  alt="testimonialImage"></img> </td>
            <td>{name}</td>
            <td>{content}</td>
            <td>{userId}</td>
            <td>{formatDate(new Date(create))}</td>
            <td>{formatDate(new Date(update))}</td>
            
            <td >
                <div className={ViewAdministratorOptions()}>   
                    <div className="button" onClick={()=>{remove(id)}}> 
                        <FaIcons.FaTrashAlt className='iconRed'/>
                    </div>
                 </div>   
            </td>   
        </tr>
    );
};
export default TestimonialsAllLine;