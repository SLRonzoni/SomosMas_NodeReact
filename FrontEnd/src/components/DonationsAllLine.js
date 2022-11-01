import React from 'react';
import './styles/styles.css';
import { formatDate } from './helpers/FormatDate';

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
            
            <td className=" centerText">   
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default DonationsAllLine;