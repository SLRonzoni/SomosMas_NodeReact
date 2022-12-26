import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./styles/payments.css";
import "./styles/styles.css";
import "./styles/tableMediaScreen.css";
import * as FaIcons from "react-icons/fa";

function PaymentMethod() {
   
  const [selectRadio, setSelectRadio] = useState("");
  let link="";
  let user  = JSON.parse(sessionStorage.getItem('userInfo'));

  const changeSelectRadio= (e) =>{
    setSelectRadio(e.target.value)
  };
 
  const paymentOption=()=>{
     switch (selectRadio) {
      case "creditCard":
      case "debitCard":  
        link="/MercadoPagoCard"
        break;
      case "pagofacil":
      case "rapipago":  
        link="/MercadoPagoTicket"
        break;
      default:
        link="/Stripe"
        break;   
    }
    sessionStorage.setItem('payMethod',selectRadio)
}
paymentOption()

return (
  <div className="containerFirst">
    { !user && <h3 className="h3CreateTestimonials">"Para hacer una donación, tenés que estar logueado"</h3>}
    { !user && setTimeout( function() { window.location.href = "/auth/login" }, 1500 )}
    { user && 
    <div className="containerPayment">      
      <h1>Métodos de Donación</h1>
    
      <form className="formPaymentMethod">
        <div className="formPaymentType">
        <h5>Stripe ( U$S )</h5>
          <div className='mb-1 mt-1 MQpaymentInputs'>
            <input 
              type="radio"
              id='stripe'
              value='stripe'
              checked={selectRadio==="stripe"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaCcStripe className="icons MQpaymentIcons"/>Tarjetas de Crédito
            </label>
          </div>
        </div>

        <div className="formPaymentType">
        <h5>Mercado Pago ( AR$ )</h5>
          <div className='mt-3 MQpaymentInputs'>
            <input 
              type="radio"
              id='creditCard'
              value='creditCard'
              checked={selectRadio==="creditCard"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaRegCreditCard className="icons MQpaymentIcons"/>Tarjetas de Crédito
            </label>
          </div>

          <div className='MQpaymentInputs'>
            <input 
              type="radio"
              id='debitCard'
              value='debitCard'
              checked={selectRadio==="debitCard"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaCreditCard className="icons MQpaymentIcons"/>Tarjetas de Débito
            </label>
          </div>

          <div className="MQpaymentInputs">
            <input 
              type="radio"
              id='rapipago'
              value='rapipago'
              checked={selectRadio==="rapipago"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaMoneyCheckAlt className="icons MQpaymentIcons"/>Rapipago
            </label>
          </div>

          <div className='mb-3 MQpaymentInputs'>
            <input 
              type="radio"
              id='pagofacil'
              value='pagofacil'
              checked={selectRadio==="pagofacil"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaMoneyCheckAlt className="icons MQpaymentIcons"/>Pagofácil
            </label>
          </div>
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
