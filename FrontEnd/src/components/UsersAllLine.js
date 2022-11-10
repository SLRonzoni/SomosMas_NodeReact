import React from 'react';
// import { Link } from 'react-router-dom';
import {formatDate} from './helpers/FormatDate';
import './styles/styles.css';
import * as FaIcons from 'react-icons/fa';

const UsersAllLine = ({id, photo, lastName,firstName, email, role,created, updated, remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td className="imageChar centerText" ><img src={photo}  alt="UserImage"></img> </td>
            <td className='leftText'>({role }) {lastName}, {firstName}</td>
            <td className='leftText'>{email}</td>
            <td className="centerText">{formatDate(new Date(created))}</td>
            <td className="centerText">{formatDate(new Date(updated))}</td>

            <td className="centerText"> 
                <div> 
                    <div className="button" onClick={()=>{remove(id)}}> 
                        <FaIcons.FaTrashAlt className='iconRed'/>
                    </div>
                </div> 
            </td>      
        </tr>
    );
};
export default UsersAllLine;