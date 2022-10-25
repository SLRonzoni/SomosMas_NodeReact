import React from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom';
import { Formik } from "formik";
import { msgRequired,msgValidationUserFirstName,msgValidationUserLastName, msgValidationUserEmail, msgValidationUserPassword, msgValidationUserConfirmPassword} from './helpers/validationMessages';
import { regexUserfirstName, regexUserLastName, regexUserPassword, regexUserEmail } from "./helpers/RegExp";
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
            errors.name=msgRequired
            errors.icoNname= '❌'
            return errors
        };

        // if (!r.test(values.name)) {
        //     errors.name=msgValidationUserEmail
        //     errors.icoNname= '❌'
        //     errors.formOk='f'
        //     return errors
        // } else {
        //     errors.icoNemail= '✔️'
        //     errors.formOk='v'
        // };

        if (!values.content) {
            errors.content=msgRequired
            errors.icoNcontent= '❌'
            return errors
        };

        // if (!regexUsercontent.test(values.content)) {
        //     errors.content=msgValidationUserFirstName
        //     errors.icoNcontent= '❌'
        //     errors.formOk='f'
        //     return errors
        // } else {
        //     errors.icoNcontent= '✔️'
        //     errors.formOk='v'
        // };

        if (!values.image) {
            errors.image=msgRequired
            errors.icoNimage= '❌'
            return errors
        };
    }   

    //FORM
    return (
    <>
    <br></br>
    { !user && <h3 className="centerText">"Para dar testimonio, tenés que estar registrado"</h3>}
    { user && 
    <Formik  
            initialValues={initialValues}           
            validate={validateInputs}
            onSubmit={(values)=>{ sendForm(values)}}
    > 
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
   
        <form className="containerRegister containerBorderWhiteBgGrey" onSubmit={handleSubmit}>
            <br></br>
            <h5 className="centerText marginBottom05rem">Doy mi testimonio</h5>
            <br></br>
            <div>
                <div>
                    <div className="marginLeft10px marginBottom05rem">
                        <div className="displayInLineFlex">   
                            <Label htmlFor="userId">Usuario </Label>
                            <span className="colorTransparent">.................</span>
                            <Label>{user.firstName}  , {user.lastName} </Label>                                                 
                        </div>
                    </div>

                    <div className="marginLeft10px marginBottom05rem">
                        <div className="displayInLineFlex">   
                            <Label htmlFor="image">Foto </Label>
                            <span className="colorTransparent">.......................</span>
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

                    <div className="marginLeft10px marginBottom05rem">
                        <div className="displayInLineFlex">   
                            <Label  htmlFor="name">Título</Label>
                            <span className="colorTransparent">....................</span>
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
                    
                    <div className="marginLeft10px marginBottom05rem">
                        <div className="displayInLineFlex">   
                            <Label htmlFor="content">Detalle</Label>
                            <span className="colorTransparent">.................</span>
                            <InputGroup >
                                <textarea className="textArea form-control borderRounded"
                                    type='text'
                                    rows='5'
                                    cols='48'
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

                    { errors.formOk === "f" && 
                    <MsjWrong className="centerText"> 
                    <span className="centerText">
                        <br /> Algun dato es incorrecto. 
                        <br/> Por favor complete el formulario correctamente
                    </span>        
                    </MsjWrong>
                    }

                    <div className="centerText">
                        <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                        <Link 
                        to={"/TestimonialsPublic"}
                        className="m-1 mr-md-2 btn buttonBlue"
                        role="button"
                        > Volver
                        </Link>
                    </div>  
                </div>  
            </div>
        </form>
      )}
   </Formik>
   }
  </>
  );
};
export default TestimonialsCreate;
