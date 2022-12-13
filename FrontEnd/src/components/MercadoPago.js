import React from "react";
import "./styles/styles.css";
import { Link } from "react-router-dom";

const MercadoPago=()=> {
  
  // const { userInfo } = state;
       

  return (
    <div className="containerFirst">
      <h1>Mercado Pago</h1>
      
      <h3 className="mt-4">
         sitio en construcción
      </h3>

    <div className='buttonsResponsive '>
      <Link to={"/Home"} className='m-2 btn btn-primary' role='button' aria-pressed='true'> Volver </Link>
      {/* <Link to={link} className='m-2 btn btn-success' role='button'aria-pressed='true'> Continúe</Link> */}
    </div>
  </div>
  );
 
}

export default MercadoPago;