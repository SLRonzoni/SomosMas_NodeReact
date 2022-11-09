import React from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./styles/stripe.css";
import "./styles/styles.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Stripe= ()=> {

  //obtener datos del usuario en sesión
  const userData=sessionStorage.getItem("userInfo")
   
  sessionStorage.removeItem('paymentMethod');      

  return (  
    <>
      <Elements stripe={stripePromise} >
        <CheckoutForm/>
      </Elements> 
    </>
  );
};

export default Stripe;