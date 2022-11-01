import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./styles/stripe.css";

const stripePK = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Stripe= ()=> {

  // const { userInfo } = state;

  const [clientSecret, setClientSecret] = useState("");

  // useEffect(  ()  => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
                                                              
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

 sessionStorage.removeItem('paymentMethod');

  return (
     <div className="containerBasic">
       <br></br>
       <h1>Stripe</h1>
       {/* {clientSecret && (  
        //  <Elements options={options} stripe={stripePK}>
        //    <br></br>
        //    <CheckoutForm />
        //    <br></br>
        // </Elements>
      //  )}*/}
    </div>
  );
};

export default Stripe;