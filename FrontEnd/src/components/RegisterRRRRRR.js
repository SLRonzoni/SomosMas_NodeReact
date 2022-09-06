import React,{useState} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';
import { Formik } from "formik";

const Register=()=> {
  const [form, setForm] = useState({
    firstName:"",
    lastName:"",   
    roleId:"",  
    email:"",
    password:"",
    confirmpassword:""
    });

   
   //capturar datos que el usuario ingresa
    const handleChange =  e => {
      e.preventDefault()
      setForm({ ...form, [e.target.name]: e.target.value});
    };

    //peticion a API y salvado de los datos
     const send = async () => {
      if(form.password !== form.confirmpassword){
        Swal.fire({
          icon: "warning",
          title: "Las contraseñas no coinciden !",
          timer:2000,
          showConfirmButton:false
        })
      } else {
          await axiosClient.post('/auth/register',{"firstName":form.firstName,"lastName":form.lastName,
                                                "email":form.email,"password":form.password},{withCredentials:true})
      
          .then(response=>{
              if(response.status===200  ){            
                Swal.fire({
                    icon: "success",
                    title: `Te registraste correctamente !`,
                    showConfirmButton:false
                })
                window.location.href="/auth/login"
              } else {             
                  Swal.fire({
                    icon: "error",
                    title: "Error !",
                    text: response.message,
                    showConfirmButton:true
                  })
              };          
          })     
          .catch(error=>{
            console.log(error)
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error
            });
          });
        }
    }
    
   
       return (
          <div className="container-sm col-6 col-md-4 bg-light" > 
            
            <h3>Formulario de Registro</h3>
              <div className="form-control">
                <div className="form-group">    
                    <label className="formLabel">Nombre</label>
                    <input type="text" className="form-control" name="firstName" id="name"  onChange={handleChange} required  autoFocus/>
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Apellido</label>
                    <input type="text" className="form-control" name="lastName" id="lastName"  onChange={handleChange}  required />
                </div> 
                </div>
              <br></br>              

              <div className="form-control">
                <div className="form-group" >    
                    <label className="formLabel">Email</label>
                    <input type="email" className="form-control" name="email" id="email"  onChange={handleChange}  required  />
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Contraseña</label>
                    <input type="password" className="form-control" name="password" id="password"  onChange={handleChange}  required />
                </div> 

                <div className="form-group" >    
                    <label className="formLabel">Confirmar contraseña</label>
                    <input type="password" className="form-control" name="confirmpassword" id="confirmpassword"    required />
                </div> 
              </div>
              <div >
              <div className="d-grid gap-4 d-md-flex justify-content-md-center">
                <button
                  className="m-2 btn btn-primary"
                  onClick={()=>send()} 
                >
                  Enviar
                </button>
                <Link
                  to={"/"}
                  className="m-2 btn btn-primary"
                  role="button"
                  aria-pressed="true"
                >
                  {" "}
                  Volver{" "}
                </Link>
              </div>
            </div>      
            </div>
   
        );
  }

export default Register;
