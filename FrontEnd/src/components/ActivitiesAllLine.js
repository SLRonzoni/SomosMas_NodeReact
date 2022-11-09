import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import "./styles/activity.css";
import {formatDate} from './helpers/FormatDate'
import * as FaIcons from 'react-icons/fa';

const ActivitiesAllLine = ({id, name, image, content, create,update,remove}) =>{
  
    return (
        <tr >
            <td >{id}</td>
            <td className="imageChar centerText" ><img src={image}  alt="activityImage"></img> </td>
            <td >{name}</td>
            <td  >{content}</td>
            <td className=" centerText" >{formatDate(new Date(create))}</td>
            <td className=" centerText" >{formatDate(new Date(update))}</td>
            
            <td className=" centerText"> 
                <div> 
                    <Link to={`/activities/update/${id}`} className="" role="button"> 
                        <FaIcons.FaPencilAlt className='iconBlue'/> 
                    </Link>
                    <Link to={`/activities/update/${id}`} className="" role="button"onClick={()=>{remove(id)}}> 
                        <FaIcons.FaTrashAlt className='iconRed'/>
                    </Link>              
                </div> 
            </td>      
        </tr>
    );
};
export default ActivitiesAllLine;