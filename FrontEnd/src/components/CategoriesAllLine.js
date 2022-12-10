import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const CategoriesAllLine = ({id, name, image, description, create,update,remove}) =>{
  
    return (
        <tr>
            <td className='centerText'>{id}</td>
            <td className="imageChar MQimageChar centerText" ><img src={image}  alt="categoryImage"></img> </td>
            <td >{name}</td>
            <td className='MQcontent'>{description}</td>
            <td className='MQcreated'>{formatDate(new Date(create))}</td>
            <td className='MQupdated'>{formatDate(new Date(update))}</td>
            
            <td>
                <div> 
                    <Link to={`/categories/update/${id}`}> 
                        <FaIcons.FaPencilAlt className='iconBlue'/> 
                    </Link>
                    <div className="button" onClick={()=>{remove(id)}}> 
                        <FaIcons.FaTrashAlt className='iconRed'/>
                    </div>                          
                </div>  
            </td>      
        </tr>
    );
};
export default CategoriesAllLine;