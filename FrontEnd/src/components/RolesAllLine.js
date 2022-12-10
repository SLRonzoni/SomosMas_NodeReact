import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const RolesAllLine = ({id, name, description, create,update,remove}) =>{
  
    return (
        <tr>
            <td className="centerText">{id}</td>
            <td >{name}</td>
            <td className='MQdescripRoles'>{description}</td>
            <td className='MQcreatedRoles'>{formatDate(new Date(create))}</td>
            <td>{formatDate(new Date(update))}</td>
            <td>   
                <div className="flex-Center MQbuttons"> 
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
export default RolesAllLine;
             