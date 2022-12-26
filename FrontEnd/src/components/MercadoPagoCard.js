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

const MercadoPagoCard = () => {

  let [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let initialValues = { amount: "", message: ""};
  let photo;
  const [ticket, setTicket] = useState("");

  if (user && user.image!==""? photo=user.image : photo=<FaIcons.FaUser/>);
  if (!user ? user="": user);
  
  //obtener datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])
  
  //enviar formulario
  const sendForm = async (values) => {
    let data = {
                "payer":{"email":user.email},
                "transaction_amount":values.amount,
                "description":"donacion",
                "payment_method_id":"rapipago"
              };

    let dataBD = {
      "userId": user.id,
      "userName": user.firstName || "",
      "userLastName": user.lastName,
      "userPhone": "",
      "userEmail": user.email,
      // "payForm":`MP AR$ ${sessionStorage.getItem("payMethod")}`,
      "amount":values.amount,
      "message": values.message
    };
    setIsLoading(true);
      
    try {
      const donation=await axiosClient.post("/donations/singleMercadoPago",data ) 
    
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


  const redirectToMP= () => {
    <Link to={ticket}> </Link> 
  }


  //FORMIK VALIDATIONS
  let validateInputs = (values) => {
    let errors = {
      amount:"",
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
        
        <form onSubmit={handleSubmit} className="dataUser">
          <div className="formUserData" >          
            <img className="imgStripe" src={photo} alt="user"></img>
            <div className="formStripeUser">
              <p> Nombre   : {user.firstName}</p>
              <p> Apellido : {user.lastName} </p>
            </div>
            <div className="formStripeUser">
              <p>Tipo de documento: {user.phone}</p>
              <p>número de documento : {user.phone}</p>
            </div>
            <div className="formStripeUser">
              <p> Email: {user.email}</p>
              <p> Teléfono : {user.phone}</p>
            </div>
          </div> 

          <div className="formUserData d-flex">  
            <p>Mercado Pago ( AR$ )</p>
            <p className="methodText">{sessionStorage.getItem('payMethod')}</p>
          </div> 
          
          <div className="formUserData">  
              <div className="form-group">
                <div>     
                  <input className="form-control ms-1"
                    name="amount"
                    type="number"
                    placeholder="ingrese importe"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> 
                </div>
                {touched.amount && errors.amount && (<ErrorText>{errors.amount} </ErrorText>)}
              </div>
          </div> 

    <span >Al continuar, te vamos a re-dirigir al sitio de 
      <img className="logoMP"src="https://www.boutiqueautomovil.com.ar/wp-content/uploads/2019/05/logo-mercadopago.png"></img>
    </span>

    <div className="buttonsResponsive mt-5">
      <Link to={"/PaymentMethod"}  className='btn buttonBlue' role='button' > Volver </Link>
      <button   id="submit" type="submit" className="btn buttonBlue buttonGreen">Continuar      
      </button>

    </div>
    </form> 
        )}
        
        </Formik>
      }

    </div>
   
   </>
  );
}

export default MercadoPagoCard;