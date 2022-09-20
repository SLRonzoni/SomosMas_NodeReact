import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import ActivitiesAllLine from "./ActivitiesAllLine";
import Swal from "sweetalert2";
import { Link,Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { Container } from "react-bootstrap";
import { formatDate } from "./helpers/FormatDate";
import {OrderNameAsc} from "./helpers/Order";

const ActivitiesAll = (props) => { 

  const [activities, setActivities] = useState([]); 
  
  const getActivities = async () => {     
     await axiosClient.get(`/activities`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setActivities(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar esta actividad ? ",
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
      .delete(`/activities/del/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Actividad eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getActivities();
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
    getActivities()
  },[]);


  //FILTER BY NAME AND UPDATED DATE
  let filterBy;
  let route;
  const getFilterActivities = async () => {

    if(filterBy.includes(':')===true){
        route='/activities/byDate/'
      } else{
        route='/activities/byName/'
      };

    await axiosClient
    .get(route+filterBy)
    .then((response) => {
      setActivities(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todas'){
          getActivities() 
        } else {
          getFilterActivities()   
    };
  } 

 
  const showActivities = () => {
    return (
      <tbody >
        {activities.map((oneActivity) => (
          <ActivitiesAllLine 
            key={oneActivity.id}
            id={oneActivity.id}
            name={oneActivity.name}
            image={oneActivity.image}
            content={oneActivity.content}
            create={oneActivity.createdAt}
            update={oneActivity.updatedAt}
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

      {/* si aun está cargando actividades*/}
      {!activities &&  <LoadingBox/> }

       {/* solo renderiza si hay actividades*/}
      {activities && 
      <>
      <div>
        <h1 >Listado de Actividades</h1>
        <p>{}</p>
      </div>
      <br></br>      
        <div className="displayFlex " >
          
          <div>
            <p className="pBtnDesplegable" >Buscar actividades por nombre</p>
              <select 
                className="m-3 selectBtnDesplegable form-select "
                type="text"
                name="name"
                onChange={changesId}
              >  
                {activities.map(oneActivity => (
                  <option className="colorBlack"key={oneActivity.id} value={oneActivity.name}>
                    {oneActivity.name}
                  </option>
                )).sort(OrderNameAsc(activities))}
                <option value={"todas"}>Mostrar todas las actividades</option>
              </select>
          </div> 
          
          <div >
            <p className="pBtnDesplegable" >Buscar actividades por fecha de actualización</p>
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {activities.map(oneActivity => (
                  <option className="colorBlack" key={oneActivity.id} value={oneActivity.updatedAt}>
                    {formatDate(new Date(oneActivity.updatedAt))}
                  </option>
                ))}
                <option value={"todas"}>Mostrar todas las actividades</option>
              </select>
          </div> 
        </div> 

      <table className="table table-striped table-responsive table-bordered ">
        <thead>
          <tr className="">
            <th className="tituloItem centerText  "> Id </th>
            <th className="tituloItem "> Actividad </th>
            <th className="tituloItem "> Imágen </th>
            <th className="tituloItem "> Descripción </th>
            <th className="tituloItem centerText"> Creada</th>
            <th className="tituloItem centerText"> Actualizada</th>

            <th className="centerText" ><Link to={'/ActivitiesCreate'} className="m-1 mr-md-2 btn btn-success"
                  role="button" > Agregar </Link> 
            </th>
          </tr>
        </thead>
        {showActivities()}
      </table>
      </>
      } 
      </Container>
    </Fragment>
  );
};

export default ActivitiesAll;

