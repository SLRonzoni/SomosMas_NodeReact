import React from 'react';
import './styles/styles.css';
import { formatDate } from './helpers/FormatDate';

const MessageAllLine = ({id, name, email, message, create, remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td >{name}</td>
            <td >{email} </td>
            <td >{message}</td>
            <td className="centerText" >{formatDate(new Date(create))}</td>

            <td className="centerText">   
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default MessageAllLine;