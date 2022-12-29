import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/mercadoPago.css";
import { Link} from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { ErrorText } from "./elements/ElementsFormStyles";
import { msgRequired,msgValidationAmount } from "./helpers/validationMessages";
import { regexAmount } from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "./hooks/useMercadoPago";



const MercadoPagoCard = () => {

 const INITIAL_STATE = {
    cvc: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    focus: "cardNumber",
    cardholderName: "",
    cardNumber: "",
    issuer: "",
};
const [state, setState] = useState(INITIAL_STATE);
    const resultPayment = useMercadoPago();


  let [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let initialValues = { amount: "", typedoc:"", numdoc:"",message: ""};
  let photo, filterBy;
  const [ticket, setTicket] = useState("");

  if (user && user.image!==""? photo=user.image : photo=<FaIcons.FaUser/>);
  if (!user ? user="": user);
  
  //obtener datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])

  const changesId=(e)=>{
    filterBy=e.target.value;
  }

  const handleInputChange=(e)=>{
    setState({
        ...state,
        [e.target.dataset.name || e.target.name]: e.target.value,
    });
  } 


  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };
  
  //enviar formulario
  const sendForm = async (values) => {
    let data = {
                "payer":{"email":user.email},
                "transaction_amount":values.amount,
                "description":"donacion",
                "payment_method_id":sessionStorage.getItem("payMethod"),
                "userId": user.id,
                "userName": user.firstName || "",
                "userTypedoc":user.typedoc,
                "userNumdoc":user.numdoc,
                "userLastName": user.lastName,
                "userPhone": "",
                "userEmail": user.email,
                "payForm":`merc_pag AR$ ${sessionStorage.getItem("payMethod")}`,
                "amount":values.amount,
                "message": values.message,
                "cardholderEmail":state.cardholderEmail,
                "cardholderName":state.cardholderName,
                "cvc":state.cvc,
                "cardNumber":state.cardNumber,
                "cardExpirationMonth":state.cardExpirationMonth,
                "cardExpirationYear":state.cardExpirationYear,
                "identificationType":user.typedoc,
                "identificationNumber":user.Numdoc,
                "issuer":state.issuer,
                "installments":""
              };
    setIsLoading(true);
      
    try {
      const donation=await axiosClient.post("/donations/payWithCardMercadoPago",data ) 
    
      if(donation.status===200){
        Swal.fire({
          icon: 'success', 
          title:"Gracias por tu ayuda !",
          timer:1500,
          showConfirmButton:false
        })
        values.amount=""
        setTicket(donation.data)
      }       
    } catch (error) {
      Swal.fire({
        icon: 'error', 
        title:"Error ! No se realizó el pago",
          text: error.response.data,
        timer:1500,
        showConfirmButton: false
      })
    }
    setIsLoading(false);
   
  };


  //FORMIK VALIDATIONS
  let validateInputs = (values) => {
    let errors = {
      amount:"",
      typedoc:"",
      numdoc:"",
      formOk: "",
    };

    if (!values.amount) {
      errors.amount = msgRequired;
      return errors;
    }

    if (!regexAmount.test(values.amount)) {
      errors.amount = msgValidationAmount;
      errors.formOk = "f";
      return errors;
    } else {
      errors.formOk = "v";
    }
  }
  return ( 
    <>
    <div className="containerStripe">
      { user &&
        <Formik
              initialValues={initialValues}
              validate={validateInputs}
              onSubmit={(values) => { sendForm(values) }}
        > 
        {
          ({ values, handleSubmit, handleChange, handleBlur, touched, errors}) => (
        
        <form onSubmit={handleSubmit}  id="form-checkout">
        <div className="d-flex">
        <div>
          <div className="formUserMP ">  
            <div className="formStripeUser d-block">
              <div> 

                <div className="d-flex">
                  <img className="imgMP" src={photo} alt="user"></img>
                  <input className="form-control name"
                      id="form-checkout__cardholderName" 
                      type="text"
                      name="cardholderName"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                  />
                </div>

                <div className="d-flex mb-2"> 
                  <div className="d-block"> 
                    <label>E-mail</label> 
                    <input className="form-control email"
                      type="email"
                      placeholder={user.email}
                      name="cardholderEmail"
                      id="form-checkout__cardholderEmail"
                      onFocus={handleInputFocus}
                    />
                  </div>
                  <div className="d-block ms-5"> 
                    <label>Teléfono</label>
                    <p className="form-control email">{user.phone}</p>
                  </div>  
                </div> 

              </div> 
              <label>Documento</label> 
              <div className="d-flex"> 
                
                <div>              
                  <select id="form-checkout__identificationType"
                    className="selectBtnDesplegable selectMP form-select"
                    type="text"
                    name="name"
                     onChange={changesId}
                  >  
                  <option value={"DNI"}>D.N.I.</option>
                  <option value={"LE"}>L.E.</option>
                  <option value={"CI"}>C.I.</option>
                  <option value={"PAS"}>Pasaporte</option>
                  </select> 
                </div>
                <div>
                  <div>
                    <input className="form-control inputSelectMP"
                      name="numdoc"
                      type="text"
                      id="form-checkout__identificationNumber" 
                      placeholder="nro de documento"
                      value={values.numdoc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    /> 
                  </div>
                  {touched.numdoc && errors.numdoc && (<ErrorText>{errors.numdoc} </ErrorText>)}
                </div>
              </div>
            </div>               
          </div> 

          <div className="formUserMP">  
            <div>
              <label> Mensaje </label>
              <textarea className="form-control"
                type='text'
                rows='2'
                cols='52'
                name='message'
                placeholder="tu mensaje..."
                value={values.message}        
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>  

          <div className="formUserMP">  
            <div className="form-group">
              <div>  
                <div className="d-flex">  
                  <p>Mercado Pago ( AR$ )</p>
                  <p className="methodText">{sessionStorage.getItem('payMethod')}</p>
                </div> 

                <input className="form-control ms-1"
                  name="amount"
                  type="number"
                  placeholder="ingresá el importe"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                /> 
              </div>
              {touched.amount && errors.amount && (<ErrorText>{errors.amount} </ErrorText>)}
            </div>
          </div> 
        </div> 

        <div className="formCard">
          <Card className="formUserMP"
            cvc={state.cvc}
            expiry={state.cardExpirationMonth + state.cardExpirationYear}
            name={state.cardholderName}   
            number={state.cardNumber}
            focused={state.focus}
            brand={state.issuer}
          />  
       
          <div className="formUserMP mt-4">   
            <input className="form-control"
              type="text"
              name="cardNumber"
              id="form-checkout__cardNumber"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />               
            <input className="form-control"
              type="text"
              name="cardExpirationMonth"
              id="form-checkout__cardExpirationMonth"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input className="form-control"
              type="text"
              name="cardExpirationYear"
              id="form-checkout__cardExpirationYear"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input className="form-control"
              type="text"
              name="cvc"
              id="form-checkout__securityCode"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            
            <select   className="form-control"
              id="form-checkout__issuer" 
              name="issuer"
              on="true" >
            </select>

            <select  className="form-control"
              id="form-checkout__installments"
              name="installments">
            </select>   
             
          </div> 
      
          {/* <span className="flex-Center" >Al continuar, te vamos a re-dirigir al sitio de 
          <img className="logoMP"src="https://www.boutiqueautomovil.com.ar/wp-content/uploads/2019/05/logo-mercadopago.png"></img>
          </span> */}

          <div className="buttonsResponsive mt-1">
            <Link to={"/PaymentMethod"}  className='btn buttonBlue' role='button' > Volver </Link>
            <button   id="form-checkout__submit" type="submit" className="btn buttonBlue buttonGreen">Pagar </button>
           {/* <progress value="0" className="progress-bar">Cargando...</progress> */}
          </div>
        </div>
      </div>
      </form> 
      )}
        
      </Formik>
      }
      
      <div>   
        {resultPayment && <p>{JSON.stringify(resultPayment)}</p>}
      </div>
      
    </div>
   
   </>
  );
}

export default MercadoPagoCard;