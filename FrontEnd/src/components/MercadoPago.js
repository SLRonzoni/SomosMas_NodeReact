import React,{useEffect,useState} from 'react';
import "./styles/mercadoPago.css";
import "./styles/stripe.css";
import * as FaIcons from "react-icons/fa";

const MercadoPago = () => {

  let initialValues = { amount: "", message: "" };
  let photo;
  let [user, setUser] = useState("");

  if (user && user.image!==""? photo=user.image : photo=<FaIcons.FaUser/>);
  if (!user ? user="": user);
  
  //obtener datos del usuario en sesión
  useEffect(() => {
   const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
  }, [])
  
  return(
    <>  
      <div className="containerStripe pt-5">
      <br/>
      {!user && <h3 className="centerText">"Para hacer una donación, tenés que estar registrado"</h3>} 
      {/* {!user && history.push("/PaymentMethod" )} */}
            
      { user &&
        <form id="form-checkout" action="/process_payment" method="post">
          <div>
            <div>
              <label for="payerFirstName">Nombre</label>
              <input id="form-checkout__payerFirstName" name="payerFirstName" type="text"/>
            </div>
            <div>
              <label for="payerLastName">Apellido</label>
              <input id="form-checkout__payerLastName" name="payerLastName" type="text"/>
            </div>
            <div>
              <label for="email">E-mail</label>
              <input id="form-checkout__email" name="email" type="text"/>
            </div>
            <div>
              <label for="identificationType">Tipo de documento</label>
              <select id="form-checkout__identificationType" name="identificationType" type="text"></select>
            </div>
            <div>
              <label for="identificationNumber">Nro del documento</label>
              <input id="form-checkout__identificationNumber" name="identificationNumber" type="text"/>
            </div>
          </div>

          <div>
            <div>
              <label>Medio de pago : Mercado Pago </label>
              <span> Moneda : $</span>
              <input className="input"
                name="amount"
                type="number"
                placeholder="ingrese importe"
                // value={values.amount}
              /> 
            </div>
          </div>
        

          <div>
            <div>
              <input type="hidden" name="transactionAmount" id="transactionAmount" value="100"/>
              <input type="hidden" name="description" id="description" value="Donación"/>
              
              <button id="button" type="submit">Pagar</button>
            </div>
          </div>
        </form>
       }
      </div>
    </>
  );
}

export default MercadoPago;