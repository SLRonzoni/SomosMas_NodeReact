import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";
import * as FaIcons from 'react-icons/fa';

const TestimonialsAllLine = ({id, name, image, content, userId,  create,update,remove}) =>{
  
    return (
        <tr>
            <td>{id}</td>
            <td className="imageChar centerText MQimageCharTestim"><img src={image}  alt="testimonialImage"></img> </td>
            <td className='MQtestim'>{name}</td>
            <td>{content}</td>
            <td>{userId}</td>
            <td className='MQcreatedTestim'>{formatDate(new Date(create))}</td>
            <td className='MQupdatedTestim'>{formatDate(new Date(update))}</td>
            
            <td>
                <div className={ViewAdministratorOptions()}>   
                    <div onClick={()=>{remove(id)}}> 
                        <FaIcons.FaTrashAlt className='iconRed MQiconDelTestim'/>
                    </div>
                 </div>   
            </td>   
        </tr>
    );
};
export default TestimonialsAllLine;