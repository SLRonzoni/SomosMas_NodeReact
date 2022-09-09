import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import MembersAllCard from './MembersAllCard';
import Swal from "sweetalert2";
import { Link, Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { Container } from "react-bootstrap";

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
      .delete(`/members/del/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Colaborador Eliminado !",
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
      <tbody >
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
      </tbody>
    );
  };

  //hacer visibles opciones para administrador
  const getRoleView =()=> { 
    let isAdmin=JSON.parse( sessionStorage.getItem('userInfo'))   
    if(isAdmin.roleId === 1) { 
      return 'visible'
    } else {
      return 'invisible'
    };
  };

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <Fragment >
      <Container  >
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando members*/}
      {!members &&  <LoadingBox/> }

       {/* solo renderiza si hay members*/}
      {members && 
      <>
      <div>
        <h1 >Colaboradores</h1>
      </div>
       
        <div className=" displayFlex marginLeft10px" >
            <p className="pBtnDesplegable textBtnDesplegableCenter"> Buscar por nombre</p>
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {members.map(oneMember => (
                  <option key={oneMember.id} value={oneMember.id}>
                    {oneMember.name}
                  </option>
                ))}
                <option value={"todos"}>Mostrar todos los colaboradores</option>
              </select>
              
              <p className={getRoleView()} >  
                <Link to={'/MembersCreate'} className="m-3 btn btn-success "
                  role="button" > Agregar </Link>
              </p> 
        </div>  
        <div className="centerHorizontally">     
          {showMembers()}
        </div>  
      </>
      } 
      </Container>
    </Fragment>
  );
};

export default MembersAll;