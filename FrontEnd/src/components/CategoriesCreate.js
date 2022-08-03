import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./styles/styles.css";


function CategoriesCreate(props) {
  
  const [categories, setCategories] = useState({
    id: "",
    name: "",
    image:"",
    description:""
  });

  const changes = (e) => {
    setCategories({
      ...categories,
      [e.target.name]: e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault();
    saveCategories();
  };

  const saveCategories = async () => {
    await axiosClient
      .post("/categories/create", categories)
      .then((response) => {
        if (response) {
          
          Swal.fire({
            icon: "success",
            title: "Categoria Agregada!",
            text: response.data.msg,
          });
          props.history.push("/CategoriesAll");
        }
      })
      .catch(function (error) {
        Swal.fire({
        icon:"error",
        title: "Error",
        text: error.response.data.msg,
        });
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
        <br></br>
        
        <h3>Ingrese nueva Categoría...</h3>
        <div className="form-group ">
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Ingresar nombre"
            defaultValue={categories.name}
            required
            onChange={changes}
          />
          <br></br>
          <label htmlFor="name">Imágen: </label>
          <input
            type="text"
            className="form-control"
            name="image"
            placeholder="Ingresar url de imágen"
            defaultValue={categories.image}
            onChange={changes}
          />
          <br></br>
          <label htmlFor="name">Descripción: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Ingresar la descripción"
            defaultValue={categories.description}
            onChange={changes}
          />
        </div>

        <div className="centrar">
          <button type="submit" className="m-3 btn btn-primary">
            Guardar
          </button>
          <Link
              to={"/CategoriesAll"}
              className="m-3 mr-md-2 btn btn-primary"
              role="button"
              aria-pressed="true"
            >
              {" "}
              Volver{" "}
            </Link>
        </div>
    </form>
    </div>
  );
}
export default CategoriesCreate;