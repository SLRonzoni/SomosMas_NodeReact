import React from "react";
import "./styles/styles.css";
import image from "./images/manos_fondo-sinFondo.png";

const Home = () => {
 
  return (
    <div className="container">
      <h1 className="h1SizeHome"> Bienvenido@s !!!</h1>
      <img className="imageBgHome" src={image} alt="manos" ></img>
    </div>
  );
  
};

export default Home;