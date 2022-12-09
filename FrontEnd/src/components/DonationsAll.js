import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import "./styles/tableMediaScreen.css";
import DonationsAllLine from "./DonationsAllLine";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";

const DonationsAll = (props) => { 

  const [donations, setDonations] = useState([]); 
  
  const getDonations = async () => {     
     await axiosClient.get(`/donations`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setDonations(response.data.donations);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar esta donación ? ",
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
      .delete(`/donations/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Donación eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getDonations();
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
    getDonations()
  },[]);


  //FILTER BY PAY FORM, CREATED DATE AND EMAIL
  let filterBy;
  let route;
  const getFilterDonations = async () => {

    if(filterBy.includes(':')===true){
        route='/donations/byDate/'
      } else if(filterBy.includes('@')===true){
        route='/donations/byEmail/'
      } else {
        route='/donations/byPayForm/'
      }
    

    await axiosClient.get(route+filterBy)
    .then((response) => {
      setDonations(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todas'){
          getDonations() 
        } else {
          getFilterDonations()   
    };
  } 

 
  const showDonations = () => {
    return (
      <tbody >
        {donations.map((oneDonation) => (
          <DonationsAllLine 
            key={oneDonation.id}
            id={oneDonation.id}
            payForm={oneDonation.payForm}
            create={oneDonation.createdAt}
            amount={oneDonation.amount}
            userId={oneDonation.userId}
            name={oneDonation.userName}
            lastName={oneDonation.userLastName}
            email={oneDonation.userEmail}
            phone={oneDonation.userPhone}
            message={oneDonation.message}
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

      {!donations &&  <LoadingBox/> }

      {donations && 
      <>
      <div className="m-5">
      <div className="headsPage">
        <h3>Listado de Donaciones</h3>
        <div className="flex-Center">
          <div>
              <select 
                className="m-3 selectBtnDesplegable form-select"
                type="text"
                name="payForm"
                onChange={changesId}
              >  
                {donations.map(oneDonations => (
                  <option className="colorBlack"key={oneDonations.id} value={oneDonations.payForm}>
                    {oneDonations.payForm}
                  </option>
                )).sort(OrderNameAsc(donations))}
                <option className="colorBlack"value={"todas"}>Todas las donaciones (por medio de pago)</option>
              </select>
          </div> 
          
          <div>
              <select
                type="text"
                name="createdAt"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select"
              >  
                {donations.map(oneDonations => (
                  <option className="colorBlack" key={oneDonations.id} value={oneDonations.createdAt}>
                    {formatDate(new Date(oneDonations.createdAt))}
                  </option>
                ))}
                <option className="colorBlack"value={"todas"}>Todas las donaciones (por fecha de realización)</option>
              </select>
          </div> 

          <div>
              <select
                type="text"
                name="userEmail"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {donations.map(oneDonations => (
                  <option className="colorBlack" key={oneDonations.id} value={oneDonations.userEmail}>
                    {oneDonations.userEmail}
                  </option>
                ))}
                <option className="colorBlack"value={"todas"}>Todas las donaciones (por email del usuario)</option>
              </select>
          </div>
        </div>

        <div className="tableTotal">
          <table  className="table table-responsive table-bordered">
            <thead className="table-head table-bordered">
              <tr>
                <th> Id </th>
                <th> Medio de Pago </th>
                <th> Importe </th>
                <th> Realizada</th>
                <th> id Usuario </th>
                <th> Apellido y Nombre </th>
                <th> Email </th>
                <th> Teléfono </th>
                <th> Mensaje </th>
                <th> </th>
              </tr>
            </thead>

            {showDonations()}
            
          </table>
        </div>
      </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default DonationsAll;

