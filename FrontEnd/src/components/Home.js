import React from "react";
import "./styles/styles.css";
import image from "./images/manos_fondo.jpg";

const Home = () => {
 
  return (
    <h1>
      <img className="homeBgImage" src={image} alt="manos" ></img>
    </h1>
  );
  
  };
export default Home;