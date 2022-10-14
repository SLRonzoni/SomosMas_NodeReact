import React from "react";
import "./styles/styles.css";
import image from "./images/manos_fondo-sinFondo.png";

const Home = () => {
 
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1 className="h1SizeHome"> Bienvenido@s !!!</h1>
      
      <img className="homeBgImage shadowFilterHeader" src={image} alt="manos" ></img>
    </div>
  );
  
};

export default Home;