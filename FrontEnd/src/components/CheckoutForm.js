import React, { useState,useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/stripe.css";
import "./styles/styles.css";
import { useStripe, useElements,CardElement} from "@stripe/react-stripe-js";
import { Link, useHistory} from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { ErrorText } from "./elements/ElementsFormStyles";
import { msgRequired,msgValidationAmount } from "./helpers/validationMessages";
import { regexAmount } from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";

const CheckoutForm= (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const history=useHistory();

  const [isLoading, setIsLoading] = useState(false);
  let [user, setUser] = useState("");
  
  let initialValues = { amount: "", message: "" };
  let photo;

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
                "userId": user.id,
                "userName": user.firstName || "",
                "userLastName": user.lastName,
                "userPhone": "",
                "userEmail": user.email,
                "amount":(values.amount*100),
                "payForm":"Stripe",
                "message": values.message
              };
    setIsLoading(true);
    

    const {error,paymentMethod}=await stripe.createPaymentMethod({
      type:'card',
      card:elements.getElement(CardElement)
    });

    if(!error){
      const {id}=paymentMethod;
      try {
        const donation=await axiosClient.post("/donations/paymentsStripe",{id, data }) 

        if(donation.status===200){
          Swal.fire({
            icon: 'success', 
            title:"Gracias por tu ayuda !",
              text: donation.data.message ,
              timer:1500,
              showConfirmButton:false
          });
          elements.getElement(CardElement).clear();
          values.amount=""
          setTimeout(() => {
            history.push('/');
          }, 1500);
       }       
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error', 
          title:"Error !",
           text: error.response.data,
          timer:1500,
          showConfirmButton: false
        })
      }
      setIsLoading(false);
    }
  };

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
      <br/>
      {!user && <h3 className="centerText">"Para hacer una donación, tenés que estar registrado"</h3>} 
      {/* {!user && history.push("/PaymentMethod" )} */}
            
      { user &&
      <Formik
        initialValues={initialValues}
        validate={validateInputs}
        onSubmit={(values) => { sendForm(values) }}
      >
      {(
        { values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
      
      <form onSubmit={handleSubmit} className="formCard formStripe">
        <div className="formUserData" >          
          <img className="imgStripe" src={photo} alt="user"></img>
          <div className="d-flex">
            <p> Nombre   : {user.firstName}</p>
            <p> Apellido : {user.lastName} </p>
          </div>
          <div className="d-flex">
          <p> Email: {user.email}</p>
          <p> Teléfono : {user.phone}</p>
          </div>
        </div>

        <br/>
        <div className="form-group">
          <div className="d-flex centerText" >
              <span>Medio de pago : Stripe , Moneda : U$S</span>
              <input className="input"
                name="amount"
                type="number"
                label="Importe : U$S"
                placeholder="ingrese importe"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              /> 
          </div>
          {touched.amount && errors.amount && (<ErrorText>{errors.amount} </ErrorText>)}
        </div>

        <div className="form-group">
          <br/>
          <CardElement className="form-control" />
          <br/>
        </div>
        
        <div>
          <label className="ms-3"> Mensaje </label>
          <textarea className="textArea form-control borderRounded"
            type='text'
            rows='3'
            cols='45'
            name='message'
            placeholder=" Tu mensaje..."
            value={values.message}        
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="buttonsResponsive">
          <Link to={"/"}  className='btn buttonBlue' role='button' > Volver </Link>
          <button disabled={isLoading || !stripe || !elements} id="submit" type="submit" className="btn buttonBlue buttonGreen">        
            <span id="button-text ">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Donar"}
            </span>
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

export default CheckoutForm;