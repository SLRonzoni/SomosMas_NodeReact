import React, { useState,useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import { Label, InputGroup, SendButton, MsjWrong, ErrorText, ValidationIconGreen, ValidationIconRed} from './elements/ElementsFormStyles';
import  InputForm  from './elements/InputForm';
import validationCategories from "../validations/validation";
import {charactersOk} from '../components/elements/RegExp';


const FormCategory = (props) => {

  const  {id}  = props.match.params;
    
  const [categories, setCategories] = useState({ id:"", name: "", description:"" });
  const [files, setFiles] = useState({image:""});
  
  const [errors,setErrors] =useState({});
  const [formOk,setFormOk]=useState (null);
  const [icon,setIcon]=useState (null);

  
  useEffect(() => {
    const getCategory = async () => {
      await axiosClient.get(`/categories/${id}`)
      .then((respuesta) => {
          setCategories(respuesta.data);
          setFiles(respuesta.data.image)
      })
      .catch((error=>{
            console.log(error);
      }));
    };
    getCategory();
  }, []);

  const changes = (e) => {
    setCategories({...categories, [e.target.name]: e.target.value});
    console.log(e.target.value)
    
    
    if(e.target.name==='name'){
      setIcon('✔️')
      setFormOk('v')
    } else {
      setIcon('❌')
      setFormOk('f')
    }
  };  
    
  const changesFiles = (e) => {
    setFiles({[e.target.name]: e.target.files[0]});
  };

  const send = (e) => {
    e.preventDefault();
   
    

    //VERIFIED VALIDATIONS
    setErrors(validationCategories(categories,files));
    // if (!errors){
    //       setFormOk('v');
    //   } else {
    //       setFormOk('f');
    // }
  
    //UPDATE
    const body = new FormData(e.currentTarget)
    body.append('image',e.target.value); 

    const updateCategory = async () => {
      await axiosClient
        .put(`/categories/update/${id}`,body)
        .then(respuesta => {
          if (respuesta.status===201) {
            setCategories(respuesta.data);
            setFiles(respuesta.data.image);
            Swal.fire({
              icon: "success",
              title: "Actualización de categoría exitosa !",
              timer:1000,
              showConfirmButton: false
          });
          props.history.push("/CategoriesAll");
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    };

    updateCategory();
  };  

  //FORMAT DATE
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }


  return (
    <div>
    <br></br>
    <form onSubmit={send} className="container-sm col-6 col-md-4 bg-light">
      <br></br>
      <h3 className="centrar">Ingrese nuevos valores ...</h3>
      <br></br>
      <div className="">
        
        <InputForm
          id=""
          type="text"
          name="name"
          label="Nombre :"
          placeholder=""
          maxlength="50"
          minlength="4"
          //onKeyPress={charactersOk.onlyletters}
          required="required"
          defaultValue={categories.name}
          onChange={changes}
          icon={icon}
        />
        {errors.name && <ErrorText> {errors.name} </ErrorText> }

        <InputForm
          id=""
          type="file"
          name="image"
          label="Imágen :"
          encType="multipart/form-data"
          placeholder=""
          defaultValue={files.image}
          required="required"
          onChange={changesFiles}
          icon={icon}
        />
        {errors.image  && <ErrorText> {errors.image} </ErrorText>}

        <InputForm
          id=""
          type="text"
          name="description"
          label="Descripción :"
          encType=""
          placeholder=""
          defaultValue={categories.description}
          maxlength="200"
          //onKeyPress={charactersOk.numbersANDletters}
          required=""
          onChange={changes}
          icon={icon}
        />
        {errors.description  && <ErrorText> {errors.description} </ErrorText>}

        <div className="centrar displayFlex">
          <InputGroup>
            <Label htmlFor="name">Creada  :</Label>
            <span className="" >{formatDate(new Date(categories.createdAt))}</span>
          </InputGroup>
          <InputGroup>   
            <Label htmlFor="name">Última modificación  :</Label>
            <span className="" >{formatDate(new Date(categories.updatedAt))}</span>
          </InputGroup>
        </div>
      </div>

      { formOk === "f" &&
        <MsjWrong> 
        <p className="centrar">
          <br /> Algun dato es incorrecto. 
          <br/> Por favor complete el formulario correctamente
        </p>        
        </MsjWrong>
         }
      
      <div>
         <br></br>
         <div className="centrar">
            <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
            <Link 
              to={"/CategoriesAll"}
              className="m-3 mr-md-2 btn buttonBlue"
              role="button"
            > Volver
            </Link>
        </div> 
      </div>
      
    </form>
    </div>
  );
};

export default FormCategory;
