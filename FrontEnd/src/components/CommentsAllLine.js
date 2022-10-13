import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate'
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';

const CommentsAllLine = ({id, body, user_id,user_firstName, user_lastName, news_id, create,update,remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td >{body}</td>
            <td >{news_id}</td>
            <td >{user_id} - {user_firstName} {user_lastName}</td>
            <td className="centerText" >{formatDate(new Date(create))}</td>
            <td className="centerText" >{formatDate(new Date(update))}</td>
            
            <td className={ViewAdministratorOptions()}>   
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default CommentsAllLine;