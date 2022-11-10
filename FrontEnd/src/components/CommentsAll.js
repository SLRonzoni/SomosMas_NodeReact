import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/news-comments.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import CommentsAllLine from './CommentsAllLine';
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { OrderNameAsc } from "./helpers/Order";

const CommentsAll = (props) => { 

  const [commentsWithNames, setCommentsWitNames] = useState([]);  
  const [commentsOnly, setCommentsOnly] = useState([]);  

  const getCommentsOnly = async () => {     
    await axiosClient.get('/comments')
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setCommentsOnly(response.data.data) 
      })
      .catch(function (error) {
        console.log(error)
      });  
  };

  // //FIND USER NAME ( added name to comments state)
  const getCommentsWithNames=async () => {   
  //   for(let j=0;j<commentsOnly.length;j++) {
  //     let idUser=commentsOnly[j].user_id
  //     let resp=await axiosClient.get(`/users/${idUser}`)
  //       if(resp.data.id===idUser){
  //         commentsOnly[j].user_firstName=resp.data.firstName
  //         commentsOnly[j].user_lastName=resp.data.lastName            
  //       } 
         setCommentsWitNames(commentsOnly) 
  //   }
  };

  useEffect(() => {
    getCommentsOnly()
    getCommentsWithNames()
  },[]);
console.log('commentsCOMPLETO',commentsWithNames)


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
      .delete(`/comments/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Comentario eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getCommentsWithNames();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error
        });
     });
  };
 
  //FILTER BY ID
  let filterBy;
  const getFilterCommentsUser = async () => {
      await axiosClient
      .get(`/comments/`+filterBy)
      .then((response) => {
        console.log(response.data)
        setCommentsWitNames(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  };

  const changesId = (e) => {
    filterBy = e.target.value;
    if (filterBy === "todos") {
      getCommentsWithNames();
    } else {
      getFilterCommentsUser();
    }
  };
  

  const showComments = () => {
    return (
      <tbody>
        {commentsWithNames.map((oneComment) => (
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

  return (
    <>
    <div className="containerFirst">  
      
      {/* si aun está cargando comentarios*/}
      {!commentsWithNames &&  <LoadingBox/> }

       {/* solo renderiza si hay comemtarios*/}
      {commentsWithNames &&
      <>
      <div className="centerText">
        <h3 className="containerTitle">Listado de Comentarios</h3>  
        <div className="displayFlex centerText" >
          <div >
              <select
                type="text"
                name="user_id"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {commentsWithNames.map(oneComment => (
                  <option className="colorBlack" key={oneComment.user_id} value={oneComment.user_id}>
                   {oneComment.user_id} {oneComment.user_firstName} {oneComment.user_lastName}
                  </option>
                )).sort(OrderNameAsc(commentsWithNames))}
                <option className="colorBlack" value={"todos"}>Mostrar comentarios (por usuario)</option>
              </select>
          </div> 
        </div> 
 
 
        <div>
          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <th className="tituloItem centerText "> Id </th>
                <th className="tituloItem "> Comentario </th>
                <th className="tituloItem centerText"> Noticia </th>
                <th className="tituloItem centerText"> Usuario </th>
                <th className="tituloItem centerText"> Creado</th>
                <th className="tituloItem centerText"> Actualizado </th>
              </tr>
            </thead>

            {showComments()}

          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default CommentsAll;