import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import MessagesAllLine from "./MessagesLineAll";
import Swal from "sweetalert2";
import { Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";

const MessagesAll = (props) => { 

  const [messages, setMessages] = useState([]); 
  
  const getMessages = async () => {     
     await axiosClient.get(`/messages`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setMessages(response.data.messages);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este mensaje ? ",
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
      .delete(`/messages/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Mensaje Eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getMessages();
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
    getMessages()
  },[]);


  //FILTER BY EMAIL AND CREATED DATE
  let filterBy;
  let route;
  const getFilterMessage = async () => {

    if(filterBy.includes('@')===true){
        route='/messages/byEmail/'
      } else{
        route='/messages/byDate/'
      };

    await axiosClient
    .get(route+filterBy)
    .then((response) => {
      setMessages(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todos'){
            getMessages() 
        } else {
          getFilterMessage()   
    };
  } 

 
  const showMessages = () => {
    return (
      <tbody >
        {messages.map((oneMessage) => (
          <MessagesAllLine 
            key={oneMessage.id}
            id={oneMessage.id}
            name={oneMessage.name}
            email={oneMessage.email}
            message={oneMessage.message}
            create={oneMessage.createdAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <>
      <div className="container ">  
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando mensajes*/}
      {!messages &&  <LoadingBox/> }

       {/* solo renderiza si hay mensajes*/}
      {messages && 
      <>
      <div className="centerText">
        <br></br>
        <h3 className="containerTitle">Listado de Mensajes</h3>     
        <div className="displayFlex centerText" >
          <div>
              <select 
                className="m-3 selectBtnDesplegable form-select "
                type="text"
                name="name"
                onChange={changesId}
              >  
                {messages.map(oneMessage => (
                  <option className='colorBlack' key={oneMessage.id} value={oneMessage.email}>
                    {oneMessage.email}
                  </option>
                )).sort(OrderNameAsc(messages))}
                <option className='colorBlack'value={"todos"}>Mostrar todos los emails</option>
              </select>
          </div> 
          
          <div >
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {messages.map(oneMessage => (
                  <option className='colorBlack'key={oneMessage.id} value={oneMessage.createdAt}>
                    {formatDate(new Date(oneMessage.createdAt))}
                  </option>
                ))}
                <option className='colorBlack'value={"todos"}>Mostrar todas las fechas</option>
              </select>
          </div> 
        </div> 

        <div>
          <table className="table  table-responsive table-bordered bgGrey colorWhite">
            <thead>
              <tr>
                <th className="tituloItem centerText "> Id </th>
                <th className="tituloItem "> Contacto </th>
                <th className="tituloItem "> Email </th>
                <th className="tituloItem "> Mensaje </th>
                <th className="tituloItem centerText"> Recibido</th>
                <th className="invisible"></th>
              </tr>
            </thead>

            {showMessages()}

          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default MessagesAll;

