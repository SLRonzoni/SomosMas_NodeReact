import React, { useState,useEffect } from "react";
import axiosClient from "../configuration/axiosClient";

import "./styles/styles.css";

import { Link} from "react-router-dom";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { ErrorText } from "./elements/ElementsFormStyles";
import { msgRequired,msgValidationAmount } from "./helpers/validationMessages";
import { regexAmount } from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";

const MercadoPagoTicket = (money, payMethod) => {
  
    let [user, setUser] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
   let initialValues = { amount: "", message: ""};
//   let photo;

//   if (user && user.image!==""? photo=user.image : photo=<FaIcons.FaUser/>);
//   if (!user ? user="": user);
  
//   //obtener datos del usuario en sesión
//   useEffect(() => {
//    const userData=sessionStorage.getItem("userInfo")
//     setUser(JSON.parse(userData));
//   }, [])
  
//enviar formulario
  const sendForm = async (values, payMethod) => {
    let data = {
                "userId": user.id,
                "userName": user.firstName || "",
                "userLastName": user.lastName,
                "userPhone": "",
                "userEmail": user.email,
                "amount":(values.amount),
                "payForm":payMethod,
                "message": values.message
              };
//     setIsLoading(true);
    
            }

//     if(!error){
//       const {id}=paymentMethod;
//       try {
//         const donation=await axiosClient.post("/donations/paymentsStripe",{id, data }) 

//         if(donation.status===200){
//           Swal.fire({
//             icon: 'success', 
//             title:"Gracias por tu ayuda !",
//               text: donation.data.message ,
//               timer:1500,
//               showConfirmButton:false
//           })
//           values.amount=""
//           setTimeout(() => {
//             history.push('/');
//           }, 1500);
//        }       
//       } catch (error) {
//         console.log(error)
//         Swal.fire({
//           icon: 'error', 
//           title:"Error !",
//            text: error.response.data,
//           timer:1500,
//           showConfirmButton: false
//         })
//       }
//       setIsLoading(false);
//     }
  //};

//FORMIK VALIDATIONS
   let validateInputs = (values) => {
     let errors = {
       amount:"",
       formOk: "",
     };

//     if (!values.amount) {
//       errors.amount = msgRequired;
//       return errors;
//     }

//     if (!regexAmount.test(values.amount)) {
//       errors.amount = msgValidationAmount;
//       errors.formOk = "f";
//       return errors;
//     } else {
//       errors.formOk = "v";
//     }
   }

  return (
    <>
  
   <div className="containerStripe mb-3">  
     <div className="formUserData"> 
          <p>MERCADO PAGO TICKET</p>
    </div>
    
        {/*  { user &&
        <Formik
            initialValues={initialValues}
            validate={validateInputs}
            onSubmit={(values) => { sendForm(values) }}
        >
        {
        ({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
      
       <form onSubmit={handleSubmit} className="formStripe">
         <div className="formUserData" >          
           <img className="imgStripe" src={photo} alt="user"></img>
           <div className="formStripeUser">
             <p> Nombre   : {user.firstName}</p>
             <p> Apellido : {user.lastName} </p>
           </div>
           <div className="formStripeUser">
           <p> Email: {user.email}</p>
           <p> Teléfono : {user.phone}</p>
           </div>
         </div> 

         
         className="formUserData">  
           <div className="form-group">
             <div className="formStripeUser" >
                 <span>Medio de pago : {payMethod} en {money}</span>
                 <input className="input form-control"
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

        

       

       </form>
        
       )}
      </Formik>
    } */}
        <div className="buttonsResponsive">
          <Link to={"/PaymentMethod"}  className='btn buttonBlue' role='button' > Volver </Link>
          <button  id="submit" type="submit" className="btn buttonBlue buttonGreen"> Donar 
          </button>
        </div>

   </div>
   </>
  );
}

export default MercadoPagoTicket;
