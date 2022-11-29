import React from "react";
import "./styles/styles.css";
import "./styles/contactForm.css";
import "./styles/beggin-login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as msg from "./helpers/validationMessages";
import * as regex from "./helpers/RegExp";
import {SendButton,MsjWrong,ErrorText,IconUser,Label,InputUser,InputGroup,} from "./elements/ElementsFormStyles";
import imagen from "./images/manos_fondo-sinFondo.png";

const ContactForm = (props) => {
  //SEND
  const sendForm =  (values) => {
    //CREATE
    let body = {"name": values.name,
                "phone": values.phone,
                "email": values.email,
                "message": values.message};

    const sendMessage = async () => {
      await axiosClient.post("/contacts", body)
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              title: `Tu mensaje fue enviado correctamente !`,
              timer: 1000,
              showConfirmButton: false,
            });
            props.history.push("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:response.data.error.errors,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text:error
          });
        });
    };
    sendMessage();
  };

  //FORMIK INITIAL VALUES
  let initialValues = { name: "", phone: "", message: "", email: "" };

  //FORMIK VALIDATIONS
  let validateInputs = (values) => {
    let errors = {
      name: "",
      phone: "",
      email: "",
      message: "",
      icoNname: "",
      icoNphone: "",
      icoNemail: "",
      iconNmessage: "",
      formOk: "",
    };

    if (!values.name) {
      errors.name = msg.msgRequired;
      errors.icoNname = "❌";
      return errors;
    }

    if (!regex.regexUserfirstName.test(values.name)) {
      errors.name = msg.msgValidationUserFirstName;
      errors.icoNname = "❌";
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNname = "✔️";
      errors.formOk = "v";
    }

    if (!regex.regexUserPhone.test(values.phone)) {
      errors.phone = msg.msgValidationUserPhone;
      errors.icoNphone = "❌";
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNphone = "✔️";
      errors.formOk = "v";
    }

    if (!values.email) {
      errors.email = msg.msgRequired;
      errors.icoNemail = "❌";
      return errors;
    }

    if (!regex.regexUserEmail.test(values.email)) {
      errors.email = msg.msgValidationUserEmail;
      errors.icoNemail = "❌";
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNemail = "✔️";
      errors.formOk = "v";
    }

    if (!values.message) {
      errors.message = msg.msgRequired;
      errors.icoNmessage = "❌";
      return errors;
    }

    if (errors.name || errors.phone || errors.email || errors.message) {
      errors.formOk = "f";
    } else {
      errors.formOk = "v";
    }
  };

  
  return (
    <>
      <div className="containerFirst">
        <div className="containerImgHalfScreen"> 
          <img className="imgHalfScreen" src={imagen} alt="ManitosPintatdas"></img>
        </div>

        <div className="containerRegisterContactForm">
        
        <Formik
          initialValues={initialValues}
          validate={validateInputs}
          onSubmit={(values) => { sendForm(values) }}
        >
          {(
            { values, handleBlur, handleSubmit, handleChange, touched, errors }) => ( 
            
            <form className='containerLoginForm containerContactForm' onSubmit={handleSubmit}>
              <h5 className="centerText">Formulario de Contacto</h5>              
              <div>                  
                <div>
                  <label className="labelWidthContactForm" htmlFor='name'>Nombre y Apellido</label>
                  <InputGroup>
                    <InputUser  className="form-control"
                      type='text'
                      name='name'
                      placeholder="Ingresá tu nombre y apellido"
                      required
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.icoNname && (<IconUser>{errors.icoNname}</IconUser>)}
                  </InputGroup>
                </div>
                {touched.name && errors.name && (<ErrorText>{errors.name} </ErrorText>)}
              </div>
              <br/>

              <div>
                <div>
                  <label className="labelWidthContactForm"htmlFor='phone'>Teléfono </label>
                  <InputGroup >
                    <InputUser className="form-control"
                      type='text'
                      name='phone'
                      placeholder="Ingresá tu número de teléfono"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.icoNphone && (
                      <IconUser>{errors.icoNphone}</IconUser>
                    )}
                  </InputGroup>
                </div>
                {touched.phone && errors.phone && (
                  <ErrorText>{errors.phone} </ErrorText>
                )}
              </div>
              <br/>

              <div>
                <div>
                  <label className="labelWidthContactForm"htmlFor='email'>E-mail  </label>
                  <InputGroup >
                    <InputUser className="form-control"
                      type='text'
                      name='email'
                      placeholder="Ingresá tu e-mail"
                      required
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.icoNemail && (
                      <IconUser>{errors.icoNemail}</IconUser>
                    )}
                  </InputGroup>
                </div>
                {touched.email && errors.email && (
                  <ErrorText>{errors.email} </ErrorText>
                )}
              </div>
              <br/>

              <div>
                <div>
                  <label className="labelWidthContactForm"htmlFor='message'>Mensaje </label>
                  <InputGroup >
                    <textarea className="textArea form-control borderRounded mb-3"
                      type='text'
                      rows='8'
                      cols='27'
                      name='message'
                      placeholder="    Tu mensaje..."
                      required
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.message && errors.icoNmessage && (
                      <IconUser>{errors.icoNmessage}</IconUser>
                    )}
                  </InputGroup>
                </div>
                {touched.message && errors.message && (
                  <ErrorText>{errors.message} </ErrorText>
                )}
              </div>

              <div className="responsiveButton">
                <Link to={"/"}  className='btn buttonBlue' role='button' > Volver </Link>
                <button type='submit' className="btn buttonBlue buttonGreen"> Enviar</button>
              </div>
              
            </form>
          )}
        </Formik>
      </div>
      </div>
    </>
  );
};

export default ContactForm;
