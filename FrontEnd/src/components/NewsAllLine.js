import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import "./styles/news-comments.css";
import {formatDate} from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const NewsAllLine = ({id, name, image, content, categoryId, create,update,remove}) =>{
  
    return (
        <tr>
            <td className='centerText'>{id}</td>
            <td className="imageChar centerText MQimageCharNews" ><img src={image}  alt="newsImage"></img> </td>
            <td>{name}</td>
            <td className='MQcategNews'>{categoryId}</td>
            <td className='MQcontentNews'>{content}</td>
            <td className='MQcreatedNews'>{formatDate(new Date(create))}</td>
            <td>{formatDate(new Date(update))}</td>
            
            <td>
                <div className="flex-Center MQbuttons"> 
                    <Link to={`/news/update/${id}`}> 
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
export default NewsAllLine;