import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import Swal from "sweetalert2";
import { Link,Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import RolesAllLine from './RolesAllLine';
import * as FaIcons from 'react-icons/fa';

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
        remove(id);
      }
    });
  };

  const remove = async (id) => {
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


  let filterBy;
  const getFilterRoles = async () => {
    await axiosClient.get(`/roles/byName/${filterBy}`)
    .then((response) => {
      setRoles(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  const changesId=(e)=>{
    filterBy=e.target.value;
    if(filterBy === 'todos'){
      getRoles() 
    } else {
      getFilterRoles()   
};
} 

  const showRoles = () => {
    return (
      <tbody >
        {roles.map((oneRole) => (
          <RolesAllLine 
            key={oneRole.id}
            id={oneRole.id}
            name={oneRole.name}
            description={oneRole.description}
            create={oneRole.createdAt}
            update={oneRole.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))

  return (
    <>
      <div className="containerFirst">  
   
      {!token && <Redirect to="/Login" />} 

      {!roles &&  <LoadingBox/> }

      {roles && 
      <>
       <div className="m-5">
          <div className="headsPage">
            <h3>Listado de Roles</h3>
            <div>
              <div>
                <select
                  type="text"
                  name="name"
                  onChange={changesId}
                  className="m-4 selectBtnDesplegable form-select "
                >  
                  {roles.map(oneRole => (
                    <option className="colorBlack" key={oneRole.id} value={oneRole.name}>
                      {oneRole.name}
                    </option>
                  ))}
                  <option className="colorBlack"value={"todos"}>Todos los roles</option>
                </select>
              </div>
            </div>
          </div>
          <div className="tableTotal tableRoles">
            <table className="table table-responsive table-bordered">
              <thead className="table-head  table-bordered">
                <tr>
                  <th> Id </th>
                  <th> Role </th>
                  <th className="MQdescripRoles"> Descripción </th>
                  <th className="MQcreatedRoles"> Creado</th>
                  <th> Actualizado</th>

                  <th className="centerText">
                    <Link to={'/Roles'} className="m-1">
                      <FaIcons.FaPlusSquare className="iconBlue"/> 
                    </Link> 
                  </th>
                </tr>
              </thead>
              {showRoles()}
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