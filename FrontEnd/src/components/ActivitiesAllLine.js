import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import "./styles/activity.css";
import {formatDate} from './helpers/FormatDate'
import * as FaIcons from 'react-icons/fa';

const ActivitiesAllLine = ({id, name, image, content, create,update,remove}) =>{
  
    return (
        <tr>
            <td className='centerText'>{id}</td>
            <td className="imageChar MQimageChar centerText" ><img src={image}  alt="activityImage"></img> </td>
            <td >{name}</td>
            <td className='MQcontent'>{content}</td>
            <td className='MQcreated'>{formatDate(new Date(create))}</td>
            <td className='MQupdated'>{formatDate(new Date(update))}</td>
            
            <td className="centerText"> 
                <div> 
                    <Link to={`/activities/update/${id}`}> 
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
export default ActivitiesAllLine;