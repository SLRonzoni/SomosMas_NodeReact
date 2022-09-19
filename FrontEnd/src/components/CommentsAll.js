import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import CommentsAllLine from './CommentsAllLine';
import Swal from "sweetalert2";
import { Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { Container } from "react-bootstrap";

const CommentsAll = (props) => { 

  const [comments, setComments] = useState([]);  
  const [commentsWithName, setCommentsWithName] = useState([]);  

  const getComments = async () => {     
     await axiosClient.get(`/comments`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setComments(response.data.data); 
      }) 
      .catch(function (error) {
        console.log(error)
      });  
  };

  //FIND USER NAME ( added name to comments state)
  const findUserName=async () => { 
    for(let j=0;j<comments.length;j++) {
        let idUser=comments[j].user_id
          await axiosClient.get(`/users/${idUser}`)
            .then ( response =>{
              if(response.data.id===idUser){
                comments[j].user_firstName=response.data.firstName
                comments[j].user_lastName=response.data.lastName
                setCommentsWithName(comments)
              }
            }) 
            .catch (
              error => console.log(error)
            )
      }  
  };
  findUserName()
  // useEffect(() => {
  //   findUserName()
  // });


  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este comentario ? ",
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
    await axiosClient
      .delete(`/comments/del/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Comentario Eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getComments();
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
    getComments()
  },[]);

  //FILTER BY ID
  let filterBy;
  const getFilterCommentsUser = async () => {
      await axiosClient
      .get(`/comments/byUser/`+filterBy)
      .then((response) => {
        setCommentsWithName(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  };

  const changesId = (e) => {
    filterBy = e.target.value;
    if (filterBy === "todos") {
      getComments();
    } else {
      getFilterCommentsUser();
    }
  };
  
  const showComments = () => {
    return (
      <tbody>
        {commentsWithName.map((oneComment) => (
          <CommentsAllLine 
            key={oneComment.id}
            id={oneComment.id}
            body={oneComment.body}
            user_id={oneComment.user_id}
            user_firstName={oneComment.user_firstName}
            user_lastName={oneComment.user_lastName}
            news_id={oneComment.news_id}
            create={oneComment.createdAt}
            update={oneComment.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta
  
  return (
    <Fragment>
      <Container>
     
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando comentarios*/}
      {!comments &&  <LoadingBox/> }

       {/* solo renderiza si hay comemtarios*/}
      {comments && 
      <>
      <div>
        <h1 >Commentarios</h1>
        <p>{}</p>
      </div>
      <br></br>      
        <div className="" >
          
          <div >
            <p className="pBtnDesplegable " >Buscar comentarios por usuario</p>
              <select
                type="text"
                name="user_id"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {commentsWithName.map(oneComment => (
                  <option key={oneComment.user_id} value={oneComment.user_id}>
                    {oneComment.user_id} - {oneComment.user_firstName} {oneComment.user_lastName}
                  </option>
                ))}
                <option value={"todas"}>Mostrar todos los comentarios</option>
              </select>
          </div> 
        </div> 
 
      <table className="table table-striped table-responsive table-bordered">
        <thead>
          <tr>
            <th className="tituloItem centerText "> Id </th>
            <th className="tituloItem "> Comentario </th>
            <th className="tituloItem centerText"> Usuario </th>
            <th className="tituloItem centerText"> Noticia </th>
            <th className="tituloItem centerText"> Creado</th>
            <th className="tituloItem centerText"> Actualizado </th>
          </tr>
        </thead>
        {showComments()}
      </table>
      </>
      } 
      </Container>
    </Fragment>
  );
};

export default CommentsAll;