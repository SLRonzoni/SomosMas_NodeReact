import React, {useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import UsersAllLine from "./UsersAllLine";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { OrderLastNameAsc } from "./helpers/Order";


const UsersAll = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axiosClient.get(`/users`)
    .then((response) => {
      if (response.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error !"
        });
        props.history.push("/");
      }
      setUsers(response.data.data);
    })
    .catch(function (error) {
      console.log(error)
    });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este ususuario ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    }).then((result) => {
      if (result.value) {
        removing(id);
      }
    });
  };

  const removing = async (id) => {
    await axiosClient
      .delete(`/users/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Usuario Eliminado !",
          timer: 1000,
          showConfirmButton: false
        })
        getUsers();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar"
        })
      });
    };

  useEffect(() => {
    getUsers();
  }, []);


  //FILTER BY ID
  let filterBy;
  let onlyUser=[];

  function searchUser (users){
    if(users.lastName===filterBy){
      return users
    } 
  }
 
  const getFilterUserId = () => {
    let filterUser= users.map(element=>searchUser(element) )
    for (let i=0;i< filterUser.length;i++){
      if(filterUser[i]!==undefined){
        onlyUser.push(filterUser[i])
      }
    }
    setUsers(onlyUser)    
  };
 

  const changesId = (e) => {
    filterBy = e.target.value;
    if (filterBy === "todos") {
      getUsers();
    } else {
      getFilterUserId();
    }
  };

  const showUsers = () => {
    return (
      <tbody>
        {users.map((oneUser) => (
          <UsersAllLine
            key={oneUser.id}
            id={oneUser.id}
            photo={oneUser.photo}
            firstName={oneUser.firstName}
            lastName={oneUser.lastName}
            email={oneUser.email}
            role={oneUser.roleId}
            created={oneUser.createdAt}
            updated={oneUser.updatedAt}
            remove={confirmRemove}
          />
        ))}
      </tbody>
    );
  };

  
  let token = JSON.parse(sessionStorage.getItem("token")); //para proteger ruta

  return (
    <>
      <div className="containerFirst">  
        {!token && <Redirect to='/Login' />}
        {!users && <LoadingBox />}
        {users && 
         <>
         <div className="m-5">
            <div className="headsPage">
            <h3>Listado de Usuarios</h3>
            <div className="flex-Center" >
              <div>
                <select
                  className='m-3 selectBtnDesplegable form-select '
                  type='text'
                  name='lastName'
                  onChange={changesId}
                >
                  {users.map((oneUser) => (
                    <option className='colorBlack'key={oneUser.id} value={oneUser.lastName}>
                    {oneUser.lastName}
                    </option>
                  )).sort(OrderLastNameAsc(users))}
                  <option className='colorBlack'value={"todos"}>Mostrar usuarios (por apellido)</option>
                </select>
              </div>
            </div>
            </div>
            <div className="tableTotal tableUser">
              <table className='table table-responsive table-bordered'>
              <thead className="table-head table-bordered">
                  <tr>
                    <th> Id </th>
                    <th className="MQimageCharUser"> Imágen</th>
                    <th className="MQemailRoles"> Role y Usuario </th>
                    <th> Email </th>
                    <th className="MQcreatedUser"> Registrado</th>
                    <th> Actualizado</th>
                    <th> </th>
                  </tr>
                </thead>

                {showUsers()}

              </table>
            </div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default UsersAll;
