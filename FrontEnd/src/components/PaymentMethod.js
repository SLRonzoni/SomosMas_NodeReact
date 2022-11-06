import React,{useState} from "react";
import { Link} from "react-router-dom";
import "./styles/payments.css";
import "./styles/styles.css";

function PaymentMethod() {
   
  const [selectRadio, setSelectRadio] = useState("");
  let link="";

  const changeSelectRadio= (e) =>{
    setSelectRadio(e.target.value)
  };
 
  const paymentOption=()=>{
  if (selectRadio=="stripe") {
    sessionStorage.setItem("paymentMethod",selectRadio); 
    link="/Stripe"
    } else { 
    sessionStorage.setItem("paymentMethod",selectRadio);
    link= "/MercadoPago" 
  }
 }
paymentOption()

  return (
    <div className="containerBasic">
      <div className='containerPayment'>      
        <h1 className='centerText colorBlack'>Métodos de donación</h1>
        <br></br>
        <form className="formPaymentMethod">
          <div className='mb-3'>
            <input 
              type="radio"
              id='stripe'
              value='stripe'
              checked={selectRadio=="stripe"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label className="marginLeft10px">Stripe ( donar en U$S )</label>
          </div>

          <div className='mb-3'>
            <input 
              type="radio"
              id='mercadoPago'
              value='mercadoPago'
              checked={selectRadio=="mercadoPago"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label className="marginLeft10px">Mercado Pago ( donar en AR$ )</label>
          </div>
        
          <div className='centerText '>
            <Link to={"/Beggin"} className='m-2 btn buttonBlue' role='button' aria-pressed='true'> Volver </Link>
            <Link to={link} className='m-2 btn btn-success' role='button'aria-pressed='true'> Continúe</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentMethod;
