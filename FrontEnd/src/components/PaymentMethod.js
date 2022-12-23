import React,{useState} from "react";
import { Link} from "react-router-dom";
import "./styles/payments.css";
import "./styles/styles.css";
import * as FaIcons from "react-icons/fa";

function PaymentMethod() {
   
  const [selectRadio, setSelectRadio] = useState("");
  let link="";
  let user  = JSON.parse(sessionStorage.getItem('userInfo'));

  const changeSelectRadio= (e) =>{
    setSelectRadio(e.target.value)
  };
 
  const paymentOption=()=>{
  if (selectRadio==="stripe") {
    sessionStorage.setItem("paymentMethod",selectRadio); 
    link="/Stripe"
    } else { 
    sessionStorage.setItem("paymentMethod",selectRadio);
    link= "/MercadoPago" 
  }
 }
paymentOption()

  return (
    <div className="containerFirst">
      { !user && <h3 className="h3CreateTestimonials">"Para hacer una donación, tenés que estar logueado"</h3>}
      { !user && setTimeout( function() { window.location.href = "/auth/login" }, 1500 )}
      { user && 
      <div className='containerPayment'>      
        <h1>Métodos de Donación</h1>
      
        <form className="formPaymentMethod mt-2">
          <div className='mb-3 mt-4'>
            <input 
              type="radio"
              id='stripe'
              value='stripe'
              checked={selectRadio==="stripe"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaCcStripe className="icons"/> ( Stripe - Tarjeta de Crédito en U$S )
            </label>
          </div>

          <div className='mb-3 mt-4'>
            <input 
              type="radio"
              id='mpCreditDebitCard'
              value='mpCreditDebitCard'
              checked={selectRadio==="mpCreditDebitCard"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaCcVisa className="icons"/> ( Mercado Pago - Tarjeta de Crédito/Débito en AR$ )
            </label>
          </div>

          <div className='mb-3 mt-3'>
            <input 
              type="radio"
              id='mpRapipago'
              value='mpRapipago'
              checked={selectRadio==="mpRapipago"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
            <FaIcons.FaMoneyCheckAlt className="icons"/> ( Mercado Pago - Rapipago en AR$ )
            </label>
          </div>

          <div className='mb-3 mt-3'>
            <input 
              type="radio"
              id='mpPagofacil'
              value='mpPagofacil'
              checked={selectRadio==="mpPagofacil"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
            <FaIcons.FaMoneyCheckAlt className="icons"/> ( Mercado Pago - Pagofácil en AR$ )
            </label>
          </div>
         
          <div className='buttonsResponsive '>
            <Link to={"/"} className=' btn buttonBlue' role='button' aria-pressed='true'> Volver </Link>
            <Link to={link} className='btn buttonBlue buttonGreen' role='button'aria-pressed='true'> Continuar</Link>
          </div>
        </form>
      </div>
      }
    </div>
  );
}

export default PaymentMethod;
