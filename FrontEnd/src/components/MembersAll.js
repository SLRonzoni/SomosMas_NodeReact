import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import './styles/card.css';
import MembersAllCard from './MembersAllCard';
import Swal from "sweetalert2";
import { Link} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import ViewAdministratorOptions from "./helpers/ViewAdministratorOptions";
import { OrderNameAsc } from "./helpers/Order";

const MembersAll = (props) => { 

  const [members, setMembers] = useState([]); 
  
  const getMembers = async () => {     
     await axiosClient.get(`/members`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setMembers(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este colaborador ? ",
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
      .delete(`/members/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Colaborador eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getMembers();
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
    getMembers()
  },[]);


  //FILTER BY ID
  let filterBy;
  const getFilterMemberId = async () => {
      await axiosClient
      .get(`/members/`+filterBy)
      .then((response) => {
        setMembers([response.data])
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todos'){
          getMembers() 
        } else {
          getFilterMemberId()   
    };
  } 

 
  const showMembers = () => {
    return (
      <div className="container">
        {members.map((oneMember) => (
          <MembersAllCard
            key={oneMember.id}
            id={oneMember.id}
            name={oneMember.name}
            image={oneMember.image}
            description={oneMember.description}
            facebookUrl={oneMember.facebookUrl}
            instagramUrl={oneMember.instagramUrl}
            linkedinUrl={oneMember.linkedinUrl}
            created={oneMember.createdAt}
            updated={oneMember.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </div>
    );
  };


  return (
    <>
      <div className="container ">  
      {/* si aun está cargando miembros*/}
      {!members &&  <LoadingBox/> }

       {/* solo renderiza si hay miembros*/}
      {members && 
      <>
      <div className="centerText">
        <h2 className="containerTitle">Colaboradores</h2>       
        <div className="divBtnDesplegableOrganizations " >
            <select
              type="text"
              name="name"
              onChange={changesId}
              className="m-1 selectBtnDesplegable form-select "
            >
              {members.map(oneMember => (
                <option className="colorBlack " key={oneMember.id} value={oneMember.id}>
                  {oneMember.name}
                </option>
              )).sort(OrderNameAsc(members))}
              <option className="colorBlack" key={members.id}value={"todos"}>Mostrar todos los colaboradores</option>
            </select>
              
            <span className={ViewAdministratorOptions()} >  
              <Link to={'/MembersCreate'} className="m-1 btn btn-success "
                role="button" > Agregar </Link>
            </span> 
        </div>  
      </div>
     
      <div className="container centerText">
        {showMembers()}
      </div>    
    </>
    } 
    </div>
  </>
      
  );
};

export default MembersAll;