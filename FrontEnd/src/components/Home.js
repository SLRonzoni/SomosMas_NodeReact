import React from "react";
import "./styles/styles.css";
import image from "./images/manos_fondo.jpg";

const Home = () => {
 
  return (
    <div>
      <img className="homeBgImage" src={image} alt="manosNiños"></img>
    </div>
  );
  
  };
export default Home;