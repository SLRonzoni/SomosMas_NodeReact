import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/card.css";
import Swal from "sweetalert2";
import { Link} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import OrganizationsAllCard from "./OrganizationsAllCard";
import {OrderNameAsc} from "./helpers/Order";
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";


const OrganizationsAll = (props) => { 

  const [organizations, setOrganizations] = useState([]); 
  
  const getOrganizations = async () => {     
     await axiosClient.get(`/organization/public`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        }
        setOrganizations(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar esta organización ? ",
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
    await axiosClient.delete(`/organization/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Organización eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getOrganizations();
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
    getOrganizations()
  },[]);

   //FILTER BY ID
   let filterBy;
   const getFilterOrganizationsId = async () => {
    await axiosClient
    .get(`/organization/public/`+filterBy)
    .then((response) => {
      setOrganizations([response.data.organization])
    })
    .catch(function (error) {
      console.log(error)
    });
   };

  const changesId=(e)=>{
    filterBy=e.target.value;
    if(filterBy === "todas"){
      getOrganizations() 
    } else {
      getFilterOrganizationsId()   
    };
  };

   const showOrganizations = () => {
    return (
      <div className="container">
        {organizations.map((oneOrganization) => (
          <OrganizationsAllCard
            key={oneOrganization.id}
            id={oneOrganization.id}
            name={oneOrganization.name}
            image={oneOrganization.image}
            address={oneOrganization.address}
            phone={oneOrganization.phone}
            email={oneOrganization.email}
            facebook={oneOrganization.facebookUrl}
            instagram={oneOrganization.instagramUrl}
            linkedin={oneOrganization.linkedinUrl}
            welcomeText={oneOrganization.welcomeText}
            aboutUsText={oneOrganization.aboutUsText}
            created={oneOrganization.createdAt}
            updated={oneOrganization.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </div>
    );
  };


  return (
    <>
      <div>
      {/* si aun está cargando las organizaciones*/}
      {!organizations &&  <LoadingBox/> }

       {/* solo renderiza si hay organizaciones*/}
      {organizations && 
      <>
      <div className="container-title centerText">
        <h4  >Organizaciones que nos acompañan</h4>
      </div>
         
      <div className="divBtnDesplegableOrganizations">
            <span > Buscar por nombre</span>
              <select
                  type="text"
                  name="name"
                  onChange={changesId}
                  className="m-3 selectBtnDesplegable form-select "
              >  
                  {organizations.map(oneOrganization => (
                    <option className="colorBlack" key={oneOrganization.name} value={oneOrganization.id}>
                      {oneOrganization.name}
                    </option>
                  )).sort(OrderNameAsc(organizations))}
                    <option className="colorBlack"  key={organizations.name} value={"todas"}>
                    Mostrar todas las organizaciones
                    </option>
              </select>
              
              <span className={ViewAdministratorOptions()} >  
                <Link to={'/OrganizationsCreate'} className="m-3 btn btn-success "
                  role="button" > Agregar </Link>
              </span> 
        </div> 
       
        {showOrganizations()}
       
      </>
      } 
    </div>
  </>
  );
};

export default OrganizationsAll;