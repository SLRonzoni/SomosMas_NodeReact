import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import UsersAllLine from "./UsersAllLine";
import Swal from "sweetalert2";
import { Link, Redirect } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { Container } from "react-bootstrap";


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
      .delete(`/users/del/${id}`)
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
  const getFilterUserId = async () => {
    await axiosClient
      .get(`/users/` + filterBy)
      .then((response) => {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changesId = (e) => {
    filterBy = e.target.value;
    if (filterBy === "todos") {
      getUsers();
    } else {
      getFilterUserId();
    }
  };

  const showUsers = (props) => {
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
    <Fragment>
      <Container>
        {/* para proteger ruta , si no hay token, redirige a login*/}
        {!token && <Redirect to='/Login' />}

        {/* si aun está cargando users*/}
        {!users && <LoadingBox />}

        {/* solo renderiza si hay users*/}
        {users && 
         <>
            <div>
              <h1>Listado de Usuarios</h1>
              <p>{}</p>
            </div>
            <br></br>
            <div className=''>

              <div>
                <p className='pBtnDesplegable '>Buscar por apellido</p>
                <select
                  type='text'
                  name='lastName'
                  onChange={changesId}
                  className='m-3 selectBtnDesplegable form-select '
                >
                  {users.map((oneUser) => (
                    <option key={oneUser.id} value={oneUser.lastName}>
                    ( {oneUser.lastName} {oneUser.firstName})
                    </option>
                  ))}
                  <option value={"todas"}>Mostrar todos los usuarios</option>
                </select>
              </div>
            </div>

            <table className='table table-striped table-responsive table-bordered'>
              <thead>
                <tr>
                  <th className='tituloItem centerText'> Id </th>
                  <th className='tituloItem centerText'> Imágen</th>
                  <th className='tituloItem '> Nombre </th>
                  <th className='tituloItem '> Apellido </th>
                  <th className='tituloItem '> Email </th>
                  <th className='tituloItem centerText'> Role</th>
                  <th className='tituloItem '> Registrado</th>
                  <th className='tituloItem '> Modificado</th>
                </tr>
              </thead>
              {showUsers()}
            </table>
          </>
        }
      </Container>
    </Fragment>
  );
};

export default UsersAll;
