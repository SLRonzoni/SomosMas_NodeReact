import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import ContactsAllLine from "./ContactsAllLine";
import Swal from "sweetalert2";
import { Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { OrderNameAsc } from "./helpers/Order";

const ContactsAll = (props) => { 

  const [contacts, setContacts] = useState([]); 
  
  const getContacts = async () => {     
     await axiosClient.get(`/contacts`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setContacts(response.data.contacts);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este contacto ? ",
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
      .delete(`/contacts/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Contacto Eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getContacts();
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
    getContacts()
  },[]);


  //FILTER BY ID
  let filterBy;
  const getFilterContactId = async () => {
      await axiosClient
      .get(`/contacts/`+filterBy)
      .then((response) => {
        setContacts([response.data])
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todos'){
          getContacts() 
        } else {
          getFilterContactId()   
    };
  } 

 
  const showContacts = () => {
    return (
      <tbody >
        {contacts.map((oneContact) => (
          <ContactsAllLine 
            key={oneContact.id}
            id={oneContact.id}
            name={oneContact.name}
            phone={oneContact.phone}
            email={oneContact.email}
            create={oneContact.createdAt}
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

      {!contacts &&  <LoadingBox/> }

      {contacts && 
      <>
      <div>
        <br></br>
      <div>
        <h1 >Listado de Contactos</h1>
        <p>{}</p>
      </div>
      <br></br>      
        <div className="" >
          
          <div >
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {contacts.map(oneContact => (
                  <option className="colorBlack" key={oneContact.id} value={oneContact.id}>
                    {oneContact.name}
                  </option>
                )).sort(OrderNameAsc(contacts))}
                <option className="colorBlack" value={"todos"}>Mostrar contactos (por nombre)</option>
              </select>
          </div> 
        </div> 

        <div>
          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <th className="tituloItem centerText"> Id </th>
                <th className="tituloItem"> Contacto </th>
                <th className="tituloItem"> Email </th>
                <th className="tituloItem"> Teléfono </th>
                <th className="tituloItem centerText"> Creado</th>
                <th></th>
              </tr>
            </thead>

            {showContacts()}

          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default ContactsAll;

