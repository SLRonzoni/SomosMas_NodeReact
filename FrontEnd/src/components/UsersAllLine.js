import React from 'react';
// import { Link } from 'react-router-dom';
import {formatDate} from './helpers/FormatDate';
import './styles/styles.css';

const UsersAllLine = ({id, photo, lastName,firstName, email, role,created, updated, remove}) =>{
  
    return (
        <tr>
            <td >{id}</td>
            <td className="imageChar centerText" ><img src={photo}  alt="UserImage"></img> </td>
            <td  >{lastName}</td>
            <td  >{firstName}</td>
            <td  >{email}</td>
            <td className="centerText" >{role}</td>
            <td className="centerText">{formatDate(new Date(created))}</td>
            <td className="centerText">{formatDate(new Date(updated))}</td>

            <td className="centerText">   
                {/* <Link to={`/users/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>             */}
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >Eliminar </button>          
            </td>      
        </tr>
    );
};
export default UsersAllLine;