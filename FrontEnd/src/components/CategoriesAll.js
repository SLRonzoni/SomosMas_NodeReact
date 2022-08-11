import React, { Fragment, useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import CategoriesAllLine from './CategoriesAllLine';
import Swal from "sweetalert2";
import { Link, Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";

const CategoriesAll = (props) => { 

  const [categories, setCategories] = useState([]); 
  
  const getCategories = async () => {     
     await axiosClient.get(`/categories`)
      .then( respuesta => {
        if(respuesta.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: respuesta.message || respuesta.error.message
          });
        props.history.push('/');
        } 
        setCategories(respuesta.data.categories);   
      }) 
  };

  //Eliminar producto 👍
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar esta categoría ? ",
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
      .delete(`/categories/del/${id}`)
      .then((respuesta) => {
        Swal.fire({
          icon: "success",
          title: "Categoría Eliminada !",
        });
        getCategories();
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
    getCategories()
  },[]);


  //Obtener datos FILTRADOS x ID
  let filterBy;
  const getFilterCategoryId = async () => {
      await axiosClient
      .get(`/categories/`+filterBy)
      .then((respuesta) => {
        setCategories(respuesta.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  //evento de seleccion de filtro  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todos'){
            getCategories() 
        } else {
          getFilterCategoryId()   
    };
  } 

 
  const showCategories = (props) => {
    return (
      <tbody>
        {categories.map((oneCategory) => (
          <CategoriesAllLine 
            key={oneCategory.id}
            id={oneCategory.id}
            name={oneCategory.name}
            image={oneCategory.image}
            description={oneCategory.description}
            create={oneCategory.createdAt}
            update={oneCategory.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <Fragment>
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando categories*/}
      {!categories &&  <LoadingBox/> }

       {/* solo renderiza si hay categories*/}
      {categories && 
      <>
      <div>
        <h1 className="tituloTabla">Listado de Categorías</h1>
        <p>{}</p>
      </div>
      <br></br>      
        <div className="containerBtnDesplegable displayFlex " >
          
          <div className="btnBuscaxNombre" >
            <p className="pBtnDesplegable " >Buscar por nombre de categoría</p>
              <select
                type="text"
                name="categoryId"
                onChange={changesId}
                className="m-3 mr-md-1  selectBtnDesplegable form-select "
              >  
                {categories.map(oneCategory => (
                  <option key={oneCategory.name} value={oneCategory.name}>
                    {oneCategory.id}  -  {oneCategory.name}
                  </option>
                ))}
                <option value={"todas"}>Mostrar todas las categorías</option>
              </select>
          </div> 
        </div> 

      <table className="table table-striped table-responsive table-bordered ">
        <thead>
          <tr>
            <th className="tituloItem "> Id </th>
            <th className="tituloItem "> Categoría </th>
            <th className="tituloItem "> Imágen </th>
            <th className="tituloItem "> Descripción </th>
            <th className="tituloItem "> Creado</th>
            <th className="tituloItem "> Actualizado </th>

            <th><Link to={'/CategoriesCreate'} className=" m-3 mr-md-2 btn btn-success "
                  role="button" aria-pressed="true"  > Nueva categoría </Link> 
            </th>
          </tr>
        </thead>
        {showCategories()}
      </table>
      </>
      } 
    </Fragment>
  );
};

export default CategoriesAll;
