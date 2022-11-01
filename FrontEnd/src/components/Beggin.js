import React from "react";
import "./styles/styles.css";
import "./styles/beggin-login-register-home.css";
import Header from "./Header";
import Footer from "./Footer";
import image from "./images/manos_fondo-sinFondo.png";
import Login from "./Login";


function Beggin() {
  return (     
      <div className="containerBeggin">
        <header>
            <Header />
        </header>

        <div className="contentHome">          
          <h1>Bienvenid@s !!!</h1>
          <main className="mainBeggin">
            <img className="imgBeggin" src={image} alt="manos" ></img>
          </main>
        </div>     

        <div className="begginLogin-right-col">
          <div className="begginLogin">
            <Login/>
          </div>
        </div>
        
        <footer className="footer">
            <Footer/>
        </footer>
      </div>    
  );
};

export default Beggin;