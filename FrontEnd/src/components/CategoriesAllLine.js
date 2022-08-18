import React from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';

const CategoriesAllLine = ({id, name, image, description, create,update,remove}) =>{
  
    //FORMAT DATE
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }

    return (
        <tr   >
            <td className="renglonNro">{id}</td>
            <td className="renglon" >{name}</td>
            <td className="imagenChar centrar" ><img src={image}  alt="categoryImage"></img> </td>
            <td className="renglon productDescrip" >{description}</td>
            <td className="renglon centrar" >{formatDate(new Date(create))}</td>
            <td className="renglon centrar" >{formatDate(new Date(update))}</td>
            
            <td className='centrar '>   
                <Link to={`/categories/update/${id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{remove(id)}} >.Eliminar.  </button>          
            </td>      
        </tr>
    );
};
export default CategoriesAllLine;