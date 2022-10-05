import React from "react";
import "./styles/styles.css";
import image from "./images/manos_fondo.jpg";

const Home = () => {
 
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1> Bienvenido@s !!!</h1>
      
      <img className="homeBgImage" src={image} alt="manos" ></img>
    </div>
  );
  
};

export default Home;