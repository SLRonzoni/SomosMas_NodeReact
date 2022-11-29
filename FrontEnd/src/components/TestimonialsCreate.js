import React from "react";
import "./styles/styles.css";
import "./styles/testimonial.css";
import "./styles/card.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';
import { Formik } from "formik";
import * as msg from './helpers/validationMessages';
import * as regex  from "./helpers/RegExp";
import { SendButton, MsjWrong, ErrorText,IconUser, Label, InputUser, InputGroup} from './elements/ElementsFormStyles';

const TestimonialsCreate=(props)=> {

    let user  = JSON.parse(sessionStorage.getItem('userInfo'));

    //SEND
    const sendForm = (values) => {
        //CREATE    
        let body = new FormData()
        body.append("name",values.name);
        body.append("content",values.content);
        body.append("image",values.image);  
        body.append("userId",user.id); 

        const createTestimonial = async () => {
            await axiosClient
            .post('/testimonials',body)
            .then(response=>{
                if(response.status===201 ){     
                    Swal.fire({
                        icon: "success",
                        title: `Registramos tu testimonio correctamente !`,
                        timer:1000,
                        showConfirmButton:false
                    });
                props.history.push("/TestimonialsPublic");
                } else {             
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton:true
                    })
                };          
            })     
            .catch(error=>{
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Error"
                });
            });
        }
        createTestimonial();
    };

    //FORMIK INITIAL VALUES
    let initialValues={name:'', 
        content:'',
        image:'',
       }

    //FORMIK VALIDATIONS 
    let validateInputs=(values) =>{   

        let errors = {name: '',content:'', image:'',
                     icoNname:'', icoNcontent:'', icoNimage:'',formOk:''};  

        if (!values.name) {
            errors.name=msg.msgRequired
            errors.icoNname= '❌'
            return errors
        };

        // if (!regex.test(values.name)) {
        //     errors.name=msg.msgValidationUserEmail
        //     errors.icoNname= '❌'
        //     errors.formOk='f'
        //     return errors
        // } else {
        //     errors.icoNemail= '✔️'
        //     errors.formOk='v'
        // };

        if (!values.content) {
            errors.content=msg.msgRequired
            errors.icoNcontent= '❌'
            return errors
        };

        // if (!regex.regexUsercontent.test(values.content)) {
        //     errors.content=msg.msgValidationUserFirstName
        //     errors.icoNcontent= '❌'
        //     errors.formOk='f'
        //     return errors
        // } else {
        //     errors.icoNcontent= '✔️'
        //     errors.formOk='v'
        // };

        if (!values.image) {
            errors.image=msg.msgRequired
            errors.icoNimage= '❌'
            return errors
        };
    }   

    //FORM
    return (
        <>
            <div className="containerFirst">
            { !user && <h3 className="h3CreateTestimonials">"Para dar testimonio, tenés que estar logueado"</h3>}
            { !user && setTimeout( function() { window.location.href = "/TestimonialsPublic" }, 1500 )}
            { user && 
                <Formik  
                        initialValues={initialValues}           
                        validate={validateInputs}
                        onSubmit={(values)=>{ sendForm(values)}}
                > 
                { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
            
                    <form className="containerTestimonialCreate" onSubmit={handleSubmit}>
                        <h5 className="centerText marginBottom05rem">Mi testimonio</h5>
                        <div>
                            <div>
                                <div className="ms-3">
                                    <div className="d-flex">   
                                        <img  className="imageUserTestimonials m-1" src={user.image} alt="usuario"></img>
                                        <span className="ms-2 mt-2">{user.firstName}, {user.lastName} </span>                                                 
                                    </div>
                                </div>

                                <div className="ms-3">
                                    <div>   
                                        <Label htmlFor="image">Imágen </Label>
                                        <InputGroup  >
                                            <InputUser className="form-control"
                                                    type="file" 
                                                    name="image" 
                                                    id="image"  
                                                    encType="multipart/form-data"
                                                    onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) } 
                                                    onBlur={handleBlur}
                                            />
                                            {touched.image && errors.icoNimage && <IconUser>{errors.icoNimage}</IconUser>}    
                                        </InputGroup> 
                                    </div> 
                                    {touched.image && errors.image && <ErrorText>{errors.image} </ErrorText> }
                                </div>

                                <div className="ms-3">
                                    <div>   
                                        <Label  htmlFor="name">Título</Label>
                                        <InputGroup>
                                            <InputUser className="form-control"
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            placeholder="Ingresá el título de tu testimonio"
                                            value={values.name}
                                            onChange={handleChange} 
                                            onBlur={handleBlur}
                                            />
                                            {touched.name && errors.icoNname && <IconUser>{errors.icoNname}</IconUser>}
                                        </InputGroup>
                                    </div> 
                                    {touched.name && errors.name && <ErrorText className="errorsRegister">{errors.name} </ErrorText> }
                                </div>
                                
                                <div className="ms-3">
                                    <div>   
                                        <Label htmlFor="content">Detalle</Label>
                                        <InputGroup >
                                            <textarea className="textArea form-control borderRounded"
                                                type='text'
                                                rows='5'
                                                cols='40'
                                                name='content'
                                                placeholder="  Tu testimonio..."
                                                value={values.content}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />              
                                            {touched.content && errors.icoNcontent && <IconUser>{errors.icoNcontent}</IconUser>}
                                        </InputGroup> 
                                    </div>
                                    {touched.content && errors.content && <ErrorText className="errorsRegister">{errors.content} </ErrorText> }
                                </div>

                                <div className="buttonsResponsive">
                                    <Link to={"/TestimonialsPublic"} className=" btn buttonBlue" role="button"> Volver</Link>
                                    <button type="submit" className="btn buttonBlue buttonGreen"> Guardar </button>
                                </div> </div> 
                             
                        </div>
                    </form>
                )}
                </Formik>
            }
        </div>
    </>
  );
};
export default TestimonialsCreate;
