import React from "react";
import "./styles/styles.css";
import "./styles/contactForm.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { msgRequired, msgValidationUserFirstName, msgValidationUserEmail, msgValidationUserPhone} from "./helpers/validationMessages";
import {regexUserfirstName,regexUserEmail,regexUserPhone} from "./helpers/RegExp";
import {SendButton,MsjWrong,ErrorText,IconUser,Label,InputUser,InputGroup,} from "./elements/ElementsFormStyles";

const ContactForm = (props) => {
  //SEND
  const sendForm =  (values) => {
    //CREATE
    let body = {"name": values.name,
                "phone": values.phone,
                "email": values.email,
                "message": values.message};

    const sendMessage = async () => {
      await axiosClient
        .post("/contacts", body)
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
      errors.name = msgRequired;
      errors.icoNname = "❌";
      return errors;
    }

    if (!regexUserfirstName.test(values.name)) {
      errors.name = msgValidationUserFirstName;
      errors.icoNname = "❌";
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNname = "✔️";
      errors.formOk = "v";
    }

    if (!regexUserPhone.test(values.phone)) {
      errors.phone = msgValidationUserPhone;
      errors.icoNphone = "❌";
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNphone = "✔️";
      errors.formOk = "v";
    }

    if (!values.email) {
      errors.email = msgRequired;
      errors.icoNemail = "❌";
      return errors;
    }

    if (!regexUserEmail.test(values.email)) {
      errors.email = msgValidationUserEmail;
      errors.icoNemail = "❌";
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNemail = "✔️";
      errors.formOk = "v";
    }

    if (!values.message) {
      errors.message = msgRequired;
      errors.icoNmessage = "❌";
      return errors;
    }

    if (errors.name || errors.phone || errors.email || errors.message) {
      errors.formOk = "f";
    } else {
      errors.formOk = "v";
    }
  };

  //FORM
  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validateInputs}
        onSubmit={(values) => { sendForm(values) }}
      >
        {(
          { values, handleBlur, handleSubmit, handleChange, touched, errors }) => ( // props con destrunturing {}
          <form className='containerRegisterContactForm centerText containerBorderWhiteBgGrey' onSubmit={handleSubmit}>
            <h5 className="centerText marginBottom05rem ">Formulario de Contacto</h5>
            
            <div>
              <div>
                <div className="marginLeft10px marginBottom05rem">
                  <div className="displayInLineFlex">
                    <Label className="labelWidthContactForm" htmlFor='name'>Nombre y Apellido</Label>
                    <InputGroup>
                      <InputUser  className="form-control"
                        type='text'
                        name='name'
                        placeholder="Ingresá tu nombre y apellido"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.icoNname && (
                        <IconUser>{errors.icoNname}</IconUser>
                      )}
                    </InputGroup>
                  </div>
                  {touched.name && errors.name && (
                    <ErrorText>{errors.name} </ErrorText>
                  )}
                </div>
                <br></br>

                <div className="marginLeft10px marginBottom05rem">
                  <div className="displayInLineFlex ">
                    <Label className="labelWidthContactForm"htmlFor='phone'>Teléfono </Label>
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
                <br></br>

                <div className="marginLeft10px marginBottom05rem">
                  <div className="displayInLineFlex">
                    <Label className="labelWidthContactForm"htmlFor='email'>E-mail  </Label>
                    <InputGroup >
                      <InputUser className="form-control"
                        type='text'
                        name='email'
                        placeholder="Ingresá tu e-mail"
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
                <br></br>

                <div className="marginLeft10px marginBottom05rem">
                  <div className="displayInLineFlex">
                    <Label className="labelWidthContactForm"htmlFor='message'>Mensaje </Label>
                    <InputGroup >
                      <textarea className="textArea form-control borderRounded"
                        type='text'
                        rows='5'
                        cols='48'
                        name='message'
                        placeholder="    Tu mensaje..."
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
              </div>

              {errors.formOk === "f" && 
                <MsjWrong className="centerText">
                  <span className='centerText'>
                    <br /> Algun dato es incorrecto.
                    <br /> Por favor complete el formulario correctamente
                  </span>
                </MsjWrong>
              }

              <div>
                <SendButton type='submit' className='m-2 btn btn-primary md-end buttonSendButton centerText'> {" "} Enviar{" "}</SendButton>
                <Link to={"/"}  className='m-2 mr-md-2 btn buttonBlue buttonLink' role='button' > Volver </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
