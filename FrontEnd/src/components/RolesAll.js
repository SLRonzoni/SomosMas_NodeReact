import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import Swal from "sweetalert2";
import { Link,Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";

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
    await axiosClient.delete(`/roles${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Role Eliminado !",
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
    <>
      <div className="container ">  
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando los roles*/}
      {!roles &&  <LoadingBox/> }

       {/* solo renderiza si hay roles*/}
      {roles && 
      <>
       <div className="centerText">
          <br></br>
          <h3 className="containerTitle">Listado de Roles</h3>
          <br></br>
          <div>
            <table className="table  table-responsive table-bordered bgGrey colorWhite">
              <thead>
                <tr>
                  <th className="tituloItem centerText "> Id </th>
                  <th className="invisible ">  </th>
                  <th className="tituloItem "> Role </th>
                  <th className="tituloItem "> Descripción </th>
                  <th className="tituloItem centerText"> Creado</th>
                  <th className="tituloItem centerText"> Actualizado</th>
                  <th className="centerText">
                    <Link to={'/roles'} className="m-1 mr-md-2 btn btn-success" role="button" > Agregar </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
              {roles.map((oneRole) => ( 
                <tr key={oneRole.id}>
                  <td >{oneRole.id}</td>
                  <td className="invisible"></td>
                  <td >{oneRole.name}</td>
                  <td >{oneRole.description}</td>
                  <td className="centerText" >{formatDate(new Date(oneRole.createdAt))}</td>
                  <td className="centerText" >{formatDate(new Date(oneRole.updatedAt))}</td>
                  <td className=" displayFlex centerText">   
                      <Link to={`/roles/update/${oneRole.id}`} className="m-1 mr-md-2 btn btn-primary" role="button"> Modificar </Link>            
                      <button type="button" className="m-1 mr-md-2 btn btn-danger"onClick={()=>{confirmRemove(oneRole.id)}} >Eliminar </button>          
                  </td>  
                </tr>
                )).sort(OrderNameAsc(roles))}
              </tbody>
            </table>
          </div>
        </div>
      </>
      } 
      
      </div>
    </>
  );
};

export default RolesAll;