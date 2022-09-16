import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import Swal from "sweetalert2";
import { Link,Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { Container } from "react-bootstrap";
import { formatDate } from "./helpers/FormatDate";

const RolesAll = (props) => { 

  const [roles, setRoles] = useState([]); 
  
  const getRoles = async () => {     
     await axiosClient.get(`/roles`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
          
        props.history.push('/');
        }
        setRoles(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este role ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    })
    .then((result) => {
      if (result.value) {
        removing(id);
      }
    });
  };

  const removing = async (id) => {
    await axiosClient.delete(`/roles/del/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Role Eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getRoles();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error
        });
     });
  };

  useEffect(() => {
    getRoles()
  },[]);

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <Fragment>
      <Container>
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando los roles*/}
      {!roles &&  <LoadingBox/> }

       {/* solo renderiza si hay roles*/}
      {roles && 
      <>
      <div>
        <h1 >Noticias</h1>
        <p>{}</p>
      </div>
      <br></br>      

      <table className="table table-striped table-responsive table-bordered">
        <thead>
          <tr>
            <th className="tituloItem centerText "> Id </th>
            <th className="tituloItem "> Name </th>
            <th className="tituloItem "> Descripción </th>
            <th className="tituloItem centerText"> Creado</th>
            <th className="tituloItem centerText"> Actualizado</th>
          </tr>
        </thead>
        <tbody>
        {roles.map((oneRole) =>  (   
          <tr>
            <td className="renglonNro">{oneRole.id}</td>
            <td className="renglon" >{oneRole.name}</td>
            <td className="renglon" >{oneRole.description}</td>
            <td className="renglon centerText" >{formatDate(new Date(oneRole.createdAt))}</td>
            <td className="renglon centerText" >{formatDate(new Date(oneRole.updatedAt))}</td>
            
            <td className=" displayFlex centerText">   
                <Link to={'/roles/create'} className="m-1 mr-md-2 btn btn-success" role="button" > Agregar </Link> 
                <Link to={`/roles/update/${oneRole.id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{confirmRemove(oneRole.id)}} >Eliminar </button>          
            </td>  
          </tr>
           ))}
        </tbody>
      </table>
      </>
      } 
      </Container>
    </Fragment>
  );
};

export default RolesAll;