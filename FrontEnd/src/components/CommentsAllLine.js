import React from 'react';
import './styles/styles.css';
import {formatDate} from './helpers/FormatDate'

const CommentsAllLine = ({id, body, user_id,user_firstName, user_lastName, news_id, create,update,remove}) =>{
  
    return (
        <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglon" >{body}</td>
            <td className="renglonNro" >{user_id} - {user_firstName} {user_lastName}</td>
            <td className="renglonNro" >{news_id}</td>
            <td className="renglon centerText" >{formatDate(new Date(create))}</td>
            <td className="renglon centerText" >{formatDate(new Date(update))}</td>
            
            <td className="renglon centerText">   
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default CommentsAllLine;