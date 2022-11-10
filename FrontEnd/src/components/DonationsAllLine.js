import React from 'react';
import './styles/styles.css';
import { formatDate } from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const DonationsAllLine = ({id, payForm , amount,create, userId,name, lastName, email,phone, message, remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td >{payForm} </td>
            <td >{amount} </td>
            <td className="centerText" >{formatDate(new Date(create))}</td>
            <td >{userId} </td>
            <td >{name},{lastName}</td>
            <td >{email}</td>
            <td >{phone} </td>
            <td >{message} </td>
            
            <td>
                <div className="button" onClick={()=>{remove(id)}}> 
                    <FaIcons.FaTrashAlt className='iconRed'/>
                </div>  
            </td>   
        </tr>
    );
};
export default DonationsAllLine;