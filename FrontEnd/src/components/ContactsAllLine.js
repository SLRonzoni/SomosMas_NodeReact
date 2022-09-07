import React from 'react';
import './styles/styles.css';
import { formatDate } from './helpers/FormatDate';

const ContactsAllLine = ({id, name, phone, email, create, remove}) =>{
  
    return (
        <tr>
            <td className="renglonNro">{id}</td>
            <td className="renglon" >{name}</td>
            <td className="renglon" >{phone} </td>
            <td className="renglon" >{email}</td>
            <td className="renglon centerText" >{formatDate(new Date(create))}</td>
            
            <td className="renglon centerText">   
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default ContactsAllLine;