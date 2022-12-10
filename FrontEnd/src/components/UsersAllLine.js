import React from 'react';
import {formatDate} from './helpers/FormatDate';
import './styles/styles.css';
import * as FaIcons from 'react-icons/fa';

const UsersAllLine = ({id, photo, lastName,firstName, email, role,created, updated, remove}) =>{
  
    return (
        <tr>
            <td className='centerText'>{id}</td>
            <td className="imageChar centerText MQimageCharUser" ><img src={photo}  alt="UserImage"></img> </td>
            <td>( {role } )  {lastName}, {firstName}</td>
            <td className='MQemailRoles'>{email}</td>
            <td className='MQcreatedUser'>{formatDate(new Date(created))}</td>
            <td>{formatDate(new Date(updated))}</td>

            <td className="centerText"> 
                <div> 
                    <div className="button" onClick={()=>{remove(id)}}> 
                        <FaIcons.FaTrashAlt className='iconRed MQiconDelRoles'/>
                    </div>
                </div> 
            </td>      
        </tr>
    );
};
export default UsersAllLine;