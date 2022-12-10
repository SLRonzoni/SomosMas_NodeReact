import React from 'react';
import './styles/styles.css';
import './styles/table.css';
import './styles/tableMediaScreen.css';
import { formatDate } from './helpers/FormatDate';
import * as FaIcons from 'react-icons/fa';

const DonationsAllLine = ({id, payForm , amount,create, userId,name, lastName, email,phone, message, remove}) =>{
  
    return (
        <tr>
            <td className="centerText">{id}</td>
            <td >{payForm} </td>
            <td >{amount} </td>
            <td className='MQcreatedDonations'>{formatDate(new Date(create))}</td>
            <td className="MQuserIdDonations">{userId} </td>
            <td className="MQuserNameDonations">{name},{lastName}</td>
            <td className='MQuserEmailDonations'>{email}</td>
            <td className='MQuserPhoneDonations'>{phone} </td>
            <td className='MQuserMessage'>{message} </td>
            
            <td>
                <div className="button" onClick={()=>{remove(id)}}> 
                    <FaIcons.FaTrashAlt className='iconRed'/>
                </div>  
            </td>   
        </tr>
    );
};
export default DonationsAllLine;