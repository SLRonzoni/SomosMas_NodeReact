import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


const CategoriesOne = (props) => {

  const { id } = props.match.params;

  const [categories, setCategories] = useState({
    id: "",
    name: "",
    image:"",
    description:""
  });
 
  useEffect(() => {
    const getCategories = async () => {
      await axiosClient.get(`/categories/${id}`)
      .then((respuesta) => {
          setCategories(respuesta.data);
          
      })
      .catch((error=>{
           console.log(error);
      }));
    };
    getCategories();
  }, [id]);


  return (

    <Fragment  >
      <br></br> 
        <div >
        <div className="containerEditGender">         
           <Card.Text className="card-text-edit-gender centrar"> 
           <br></br>
           <h5 className="text colorBlack" >Categoría </h5>   
           </Card.Text>
           
           <Card.Img className='foto 'src={'http://localhost:3000/public/assets/'+categories.image}   alt="categoria"></Card.Img>
            <div className="list-group-char">
                <div className="list-group-char" >
                  Categoría :
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={categories.name}
                    />
                    <br></br>
                  Imágen : ( nombre archivo)
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    defaultValue={categories.image}
                    />
                  <br></br>
                  Descripción :
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    defaultValue={categories.description}
                  />
                </div>

                <div >
                  <Link
                      to={"/CategoriesAll"}
                      className="m-2 btn btn-primary"
                      role="button"
                      aria-pressed="true"
                    >
                      {" "}
                      Volver{" "}
                    </Link>
                  </div>
                </div>
                <br></br>
            </div>  
          </div>              
</Fragment>

  );
};

export default CategoriesOne;