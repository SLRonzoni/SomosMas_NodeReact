import React from 'react';
import './styles/styles.css';
import { formatDate } from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const MessageAllLine = ({id, name, email, message, create, remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td >{name}</td>
            <td >{email} </td>
            <td >{message}</td>
            <td className="centerText" >{formatDate(new Date(create))}</td>
            <td className='invisible'></td>

            <td className="centerText"> 
                <div className="button" onClick={()=>{remove(id)}}> 
                    <FaIcons.FaTrashAlt className='iconRed'/>
                </div>  
            </td>      
        </tr>
    );
};
export default MessageAllLine;