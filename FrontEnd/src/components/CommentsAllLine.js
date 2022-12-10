import React from 'react';
import './styles/styles.css';
import "./styles/news-comments.css";
import {formatDate} from './helpers/FormatDate'
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';
import * as FaIcons from 'react-icons/fa';

const CommentsAllLine = ({id, body, user_id,user_firstName, user_lastName, news_id, create,update,remove}) =>{
  
    return (
        <tr>
            <td className='centerText'>{id}</td>
            <td >{body}</td>
            <td className='MQnews'>{news_id}</td>
            <td className='MQuser'>{user_id} - {user_firstName} {user_lastName}</td>
            <td className='MQcreated'>{formatDate(new Date(create))}</td>
            <td className='MQupdated'>{formatDate(new Date(update))}</td>
            
            <td className={ViewAdministratorOptions()}>   
                <div className="button" onClick={()=>{remove(id)}}> 
                    <FaIcons.FaTrashAlt className='iconRed'/>
                </div> 
            </td>     
        </tr>
    );
};
export default CommentsAllLine;