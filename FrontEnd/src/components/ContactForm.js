import React from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { msgRequired, msgValidationUserFirstName, msgValidationUserEmail, msgValidationUserPhone} from "./helpers/validationMessages";
import {regexUserfirstName,regexUserEmail,regexUserPhone} from "./helpers/RegExp";
import {SendButton,MsjWrong,ErrorText,IconUser,Label,InputUser,InputGroup,} from "./elements/ElementsFormStyles";

const ContactForm = ({ history }) => {
  //SEND
  const sendForm = async (values) => {
    //CREATE
    let body = new FormData();
    body.append("name", values.name);
    body.append("phone", values.phone);
    body.append("email", values.email);
    body.append("message", values.message);

    const sendMessage = async () => {
      await axiosClient
        .post("/contacts", body)
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              title: `Tu mensaje fue enviado correctamente !`,
              timer: 1000,
              showConfirmButton: false,
            });
            history.push("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
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
      return errors;
    } else {
      errors.icoNname = "✔️";
    }

    if (!regexUserPhone.test(values.phone)) {
      errors.phone = msgValidationUserPhone;
      errors.icoNphone = "❌";
      return errors;
    } else {
      errors.icoNphone = "✔️";
    }

    if (!values.email) {
      errors.email = msgRequired;
      errors.icoNemail = "❌";
      return errors;
    }

    if (!regexUserEmail.test(values.email)) {
      errors.email = msgValidationUserEmail;
      errors.icoNemail = "❌";
      return errors;
    } else {
      errors.icoNemail = "✔️";
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
        onSubmit={(values) => {
          sendForm(values);
        }}
      >
        {(
          { values, handleBlur, handleSubmit, handleChange, touched, errors } // props con destrunturing {}
        ) => (
          <form
            className='container-sm col-6 col-md-4 containerBorderWhiteBgOrange '
            onSubmit={handleSubmit}
          >
            <br></br>
            <h4 className="centerText ">Formulario de Contacto</h4>
            <br></br>
            <div className='centerText'>
              <div  >
                <div >
                  <Label htmlFor='firstName'>Nombre y Apellido</Label>
                  <InputGroup >
                    <InputUser 
                      type='text'
                      name='name'
                      placeholder="Ingresá tu nombre y apellido"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.icoNname && (
                      <IconUser className="contactFormName">{errors.icoNname}</IconUser>
                    )}
                  </InputGroup>
                </div>
                {touched.name && errors.name && (
                  <ErrorText>{errors.name} </ErrorText>
                )}
              </div>
              <br></br>

              <div>
                <div >
                  <Label htmlFor='lastName'>Teléfono </Label>
                  <InputGroup>
                    <InputUser 
                      type='text'
                      name='phone'
                      placeholder="Ingresá tu número de teléfono"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.icoNphone && (
                      <IconUser className="contactFormPhone">{errors.icoNphone}</IconUser>
                    )}
                  </InputGroup>
                </div>
                {touched.phone && errors.phone && (
                  <ErrorText>{errors.phone} </ErrorText>
                )}
              </div>
              <br></br>

              <div>
                <div >
                  <Label htmlFor='lastName'>E-mail  </Label>
                  <InputGroup>
                    <InputUser 
                      type='text'
                      name='email'
                      placeholder="Ingresá tu e-mail"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.icoNemail && (
                      <IconUser className="contactFormEmail">{errors.icoNemail}</IconUser>
                    )}
                  </InputGroup>
                </div>
                {touched.email && errors.email && (
                  <ErrorText>{errors.email} </ErrorText>
                )}
              </div>
              <br></br>

              <div>
                <div>
                  <Label htmlFor='message'>Mensaje </Label>
                  <InputGroup>
                    <textarea className="textArea form-control borderRadius"
                      type='text'
                      rows='8'
                      cols='57'
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
              <br></br>
            </div>

            {errors.formOk === "f" && (
              <MsjWrong>
                <span className='centerText'>
                  <br /> Algun dato es incorrecto.
                  <br /> Por favor complete el formulario correctamente
                </span>
              </MsjWrong>
            )}
            <div className='centerText'>
              <SendButton type='submit' className='m-2 btn btn-primary md-end '>
                {" "}
                Enviar{" "}
              </SendButton>
              <Link
                to={"/"}
                className='m-3 mr-md-2 btn buttonBlue'
                role='button'
              >
                {" "}
                Volver
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
