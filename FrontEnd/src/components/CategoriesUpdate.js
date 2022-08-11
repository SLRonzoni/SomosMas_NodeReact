import React, { useState,useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Link } from "react-router-dom";

const FormCategory = (props) => {

  const  {id}  = props.match.params;
    
  const [categories, setCategories] = useState({
    id:"",
    name: "",
    image: "",
    description:""
  });

  const getOneCategory = async () => {    
    await axiosClient.get(`/categories/${id}`)
     .then( respuesta => {
       if(respuesta.status!==200){
         Swal.fire({
           icon: 'error', 
           title:"Error !",
             text: respuesta.message || respuesta.error.message
         });
       props.history.push('/');
       } 
       setCategories(respuesta.data);   
     }) 
    }
     useEffect(() => {
      getOneCategory()
    });
   



  const changes = (e) => {   
    setCategories({
      ...categories,
      [e.target.name]: e.target.value,
    });
  };

  
  const send = (e) => {
    e.preventDefault();
    saveCategory();
  };
  
  const saveCategory = async () => {
    await axiosClient
      .post(`/categories/update/${categories.id}`)
      .then(respuesta => {
        if (respuesta) {
        Swal.fire({
          icon: "success",
          title: "Actualización de categoría exitosa !",
        });
        props.history.push("/CategoriesAll");
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error
        });
      });
  };

 

  return (
    <div>
    <br></br>
    <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
      <br></br>
      <h3>Ingrese nuevos valores a actualizar...</h3>
      <div className="form-group ">
        <label htmlFor="name">Nombre </label>
        <input
          type="text"
          className="form-control"
          name="name"
          defaultValue={categories.name}
          required
          onChange={changes}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Imágen </label>
        
        <input
          type="file"
          className="form-control"
          encType="multipart/formdata"
          name="image"
          defaultValue={categories.image}
          onChange={changes}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="name">Descripción </label>
        <input
          type="text"
          className="form-control"
          name="description"
          defaultValue={categories.description}
          onChange={changes}
        />
      </div>

      <br></br>
      <div className="centrar">
        <button type="submit" className="m-2 btn btn-primary md-end "> Guardar </button>
        <Link
          to={"/CategoriesAll"}
          className="m-3 mr-md-2 btn btn-primary"
          role="button"
        >
          {" "}
          Volver{" "}
        </Link>
        
      </div>
    </form>
    </div>
  );
};

export default FormCategory;
