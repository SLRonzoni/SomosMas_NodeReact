import React from 'react';
import "./styles/styles.css"
import { Link } from 'react-router-dom';

const MercadoPagoCard = () => {
  return (
    <>
    <div className='containerFirst pt-5'>

    <p className='mt-5'>Mercado Pago Credito y Debito</p>

    <div className="buttonsResponsive mt-5">
        <Link to={"/PaymentMethod"}  className='btn buttonBlue' role='button' > Volver </Link>
        <button   id="submit" type="submit" className="btn buttonBlue buttonGreen">Donar        
        </button>
  </div>
 </div>
  </> 
  )
}

export default MercadoPagoCard