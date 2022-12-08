import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/activity.css";
import "./styles/tableMediaScreen.css";
import ActivitiesAllLine from "./ActivitiesAllLine";
import Swal from "sweetalert2";
import { Link,Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";
import * as FaIcon from 'react-icons/fa';

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
      .delete(`/activities/${id}`)
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
        route='/activities/public/byDate/'
      } else{
        route='/activities/public/byName/'
      };

    await axiosClient.get(route+filterBy)
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

  let token=JSON.parse(sessionStorage.getItem('token'))

  return (
    <>
      <div className="containerFirst">  
     
      {!token && <Redirect to="/Login" />} 
     
      {!activities &&  <LoadingBox/> }

      {activities && 
      <>
      <div className="m-2">
        
          <h3 className="containerTitle" >Listado de Actividades</h3>
            <div className="flex-Center  mb-2" >
              <div>
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
                    <option className="colorBlack"value={"todas"}>Todas las actividades (por nombre)</option>
                  </select>
              </div> 
              
              <div>
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
                    <option className="colorBlack"value={"todas"}>Todas las actividades (por actualización)</option>
                  </select>
              </div> 
            </div>

            <div className="tableActivities">
              <table  className="table table-responsive table-bordered"  >
                <thead className="">
                  <tr>
                    <th> Id </th>
                    <th> Imágen </th>
                    <th> Actividad </th>
                    <th> Descripción </th>
                    <th> Creada</th>
                    <th> Actualizada</th>

                    <th className="centerText" >
                      <Link to={'/ActivitiesCreate'} className="m-1">
                        <FaIcon.FaPlusSquare className="iconBlue"/>
                      </Link> 
                    </th>
                  </tr>
                </thead>
                
                {showActivities()}
             </table> 
            </div>

           
                
             
        
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default ActivitiesAll;

