import React from 'react';
import './styles/styles.css';
import { formatDate } from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const ContactsAllLine = ({id, name, phone, email, create, remove}) =>{
  
    return (
        <tr>
            <td className='centerText'>{id}</td>
            <td >{name}</td>
            <td >{email}</td>
            <td >{phone} </td>
            <td >{formatDate(new Date(create))}</td>
                       
            <td>   
                <div className="button" onClick={()=>{remove(id)}}> 
                    <FaIcons.FaTrashAlt className='iconRed'/>
                </div> 
            </td>      
        </tr>
    );
};
export default ContactsAllLine;