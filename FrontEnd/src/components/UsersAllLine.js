import React from 'react';
// import { Link } from 'react-router-dom';
import {formatDate} from './helpers/FormatDate';
import './styles/styles.css';

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
                    {/* <Link to={`/users/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>             */}
                    <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
                </div> 
            </td>      
        </tr>
    );
};
export default UsersAllLine;