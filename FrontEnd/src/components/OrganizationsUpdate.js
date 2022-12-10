import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import './styles/members-organizations.css';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import InputUpdateForm from "./elements/InputUpdate";
import { msgRequired,msgValidationActivitiesName, msgValidationDuplicated} from './helpers/validationMessages';
import {regexActivitiesName } from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';

const OrganizationsUpdate = ({match,history}) => {

  const id  = match.params.id;

  const [organizations, setOrganizations] = useState({ 
          id:"", 
          name: "", 
          image:"",
          address:"",
          phone:"",
          email:"",
          welcomeText:"",
          aboutUsText:"" ,
          facebookUrl:"",
          linkedinUrl:"",
          instagramUrl:""         
        });
    
  const [duplicated,setDuplicated]=useState('')

  //DEFAULT VALUES
  useEffect(() => {
    const getOrganizations = async () => {
      await axiosClient.get(`/organization/public/${id}`)
      .then((response) => {
        setOrganizations(response.data.organization);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getOrganizations();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("image",values.image);
    body.append("address",values.address);
    body.append("phone",values.phone);
    body.append("email",values.email);
    body.append("facebookUrl",values.facebookUrl);
    body.append("instagramUrl",values.instagramUrl);
    body.append("linkedinUrl",values.linkedinUrl);
    body.append("welcomeText",values.welcomeText);
    body.append("aboutUsText",values.aboutUsText);
  
    const updateOrganizations = async () => {
      await axiosClient
        .put(`/organization/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setOrganizations(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de organización exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/OrganizationsAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateOrganizations();
  };
  
  //DUPLICATED NAME
  const repeat= (searchName,errors)=>{
    if (errors.formOk !=='v'){
      getOrganizationsByName(searchName)
    }
  };

  const getOrganizationsByName = async (searchName) => {
    await axiosClient.get(`/organization/byName/${searchName}`)
    .then((response) => {
      if(response.status===404){
        setDuplicated(' ')
      } else {
        setDuplicated(response.data.name)
      }
    })
    .catch((error=>{
      console.log(error);
    }));
  }; 

  
  //FORMIK INITIAL VALUES
  let initialValues={name:organizations.name,
                     address:organizations.address,
                     phone:organizations.phone,
                     email:organizations.email,
                     facebookUrl:organizations.facebookUrl,
                     instagramUrl:organizations.instagramUrl,
                     linkedinUrl:organizations.linkedinUrl,
                     welcomeText:organizations.welcomeText,
                     aboutUsText:organizations.aboutUsText}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   

  let errors = {name: '', image:'',address:'', phone :'', email:'', facebookUrl:'', instagramUrl:'',
                linkedinUrl:'', welcomeText:'', aboutUsText:"",icoNname:'', icoNimage:'', icoNaddress:'',
                icoNphone:'', icoNemail:'', icoNfacebookUrl:'', icoNinstagramUrl:'', icoNlinkedinUrl:'',
                icoNwelcomeText:'', icoNaboutUsText:'',formOk:''};  

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= '❌'
    return errors
  };

  if (!regexActivitiesName.test(values.name)) {
    errors.name=msgValidationActivitiesName
    errors.icoNname= '❌'
    return errors
  } else {
    errors.icoNname= '✔️'
  };

  let searchName=values.name
    repeat(searchName, errors)
    if(duplicated===searchName){
      errors.name=msgValidationDuplicated
      errors.icoNname= '❌'         
      return errors
    } else {
      errors.icoNname= '✔️'
    };

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= '❌'
    return errors
  } else {
    errors.icoNimage= '✔️'
  };

  if (!values.address) {
    errors.content=msgRequired
    errors.icoNaddress= '❌'
    return errors
  } else {
    errors.icoNaddress= '✔️'
  };

  if(errors.name || errors.image || errors.address){
    errors.formOk='f'
  } else {
    errors.formOk='v'
  };
} 
    
  //FORM
  return (
    <>

    <Formik
        initialValues={initialValues}           
        validate={validateInputs}
        onSubmit={(values)=>{ sendForm(values)}}
    >
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {}
    <form  className="containerUpdateOrganizations containerBorderWhiteBgGrey" onSubmit={handleSubmit}>
        <h3 className="centerText ">Nuevos datos</h3>

        <div>
           <br></br> 
            <div className="displayInLineFlex">
                <div>
                    <div>
                        <span className="colorTransparent ">...</span>
                        <InputUpdateForm 
                            type="text"
                            name="name"
                            label="Nombre actual : "
                            defaultValue={organizations.name}
                            placeholder="Ingrese nuevo nombre"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                       
                        {touched.name && errors.icoNname && <Icon>{errors.icoNname}</Icon>}
                    </div>
                    {touched.name && errors.name && <ErrorText>{errors.name} </ErrorText> }
                </div>
                <div className="inputUpdateWidth">
                    <div className="displayFlex inputUpdateWidth marginLeft40px">
                        <InputUpdateForm
                            type="file"
                            name="image"
                            label="Imágen actual : "
                            defaultValue= {<img className="imageSmall" src={organizations.image}  alt="OrganizationImage"/>}
                            encType="multipart/form-data"
                            onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                            onBlur={handleBlur}
                        />
                        {touched.image && errors.icoNimage && <Icon>{errors.icoNimage}</Icon>}
                    </div>
                    {touched.image && errors.image   && <ErrorText> {errors.image} </ErrorText>}
                </div>  
            </div>
            <br></br>  <br></br> 

            <div className="displayInLineFlex ">        
                <div>
                    <div >
                        <InputUpdateForm
                            type="text"
                            name="address"
                            label="Dirección actual : "
                            defaultValue={organizations.address}
                            placeholder="Ingrese nueva dirección"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.address && errors.icoNaddress && <Icon>{errors.icoNaddress}</Icon>}
                    </div>
                    {touched.address && errors.address  && <ErrorText> {errors.address} </ErrorText>}
                </div>
                 <div className="inputUpdateWidth">
                    <div className="displayFlex inputUpdateWidth marginLeft40px">
                        <InputUpdateForm
                            type="text"
                            name="phone"
                            label="Teléfono actual : "
                            defaultValue={organizations.phone}
                            placeholder="Ingrese nuevo teléfono"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.phone && errors.icoNphone && <Icon>{errors.icoNphone}</Icon>}
                    </div>
                    {touched.phone && errors.phone  && <ErrorText> {errors.phone} </ErrorText>}
                </div>
                <div className="inputUpdateWidth">
                    <div className="displayInLineFlex inputUpdateWidth marginLeft40px">
                        <InputUpdateForm
                            type="text"
                            name="email"
                            label="Email actual : "
                            defaultValue={organizations.email}
                            placeholder="Ingrese nuevo email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.icoNemail && <Icon>{errors.icoNemail}</Icon>}
                    </div>
                    {touched.email && errors.email  && <ErrorText> {errors.email} </ErrorText>}
                </div>
            </div>
            <br></br><br></br> 

            <div className="displayInLineFlex "> 
                <div>
                    <div className="displayInLineFlex">
                        <InputUpdateForm
                            type="text"
                            name="facebookUrl"
                            label="Facebook actual : "
                            defaultValue={organizations.facebookUrl}
                            placeholder="Ingrese nuevo facebook"
                            value={values.facebookUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.facebookUrl && errors.icoNfacebookUrl && <Icon>{errors.icoNfacebookUrl}</Icon>}
                    </div>
                    {touched.facebookUrl && errors.facebookUrl  && <ErrorText> {errors.facebookUrl} </ErrorText>}
                </div>
                <div className="inputUpdateWidth">
                    <div className="displayInLineFlex inputUpdateWidth marginLeft40px">
                        <InputUpdateForm
                            type="text"
                            name="instagramUrl"
                            label="Instagram actual : "
                            defaultValue={organizations.instagramUrl}
                            placeholder="Ingrese nuevo instagram"
                            value={values.instagramUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.instagramUrl && errors.icoNinstagramUrl && <Icon>{errors.icoNinstagramUrl}</Icon>}
                    </div>
                    {touched.instagramUrl && errors.instagramUrl  && <ErrorText> {errors.instagramUrl} </ErrorText>}
                </div>            
                <div className="inputUpdateWidth"> 
                    <div className="displayInLineFlex inputUpdateWidth marginLeft40px">
                        <InputUpdateForm
                            type="text"
                            name="linkedinUrl"
                            label="Linkedin actual : "
                            defaultValue={organizations.linkedinUrl}
                            placeholder="Ingrese nuevo linkedin"
                            value={values.linkedinUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.linkedinUrl && errors.icoNlinkedinUrl && <Icon>{errors.icoNlinkedinUrl}</Icon>}
                    </div>
                    {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText> {errors.linkedinUrl} </ErrorText>}
                </div>
            </div>
            <br></br><br></br>
            
            <div className="displayInLineFlex">
                <div>
                    <div >
                        <InputUpdateForm
                            type="text"
                            name="aboutUsText"
                            label="Sobre nosotros actual : "
                            defaultValue={organizations.aboutUsText}
                            placeholder="Ingrese nuevo texto sobre nosotros"
                            value={values.aboutUsText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.aboutUsText && errors.icoNaboutUsText && <Icon>{errors.icoNaboutUsText}</Icon>}
                    </div>
                    {touched.aboutUsText && errors.aboutUsText  && <ErrorText> {errors.aboutUstext} </ErrorText>}
                </div>
            </div> 
            <br></br><br></br>

            <div className="displayInLineFlex">
                <div>
                    <div>
                        <InputUpdateForm
                            type="text"
                            name="welcomeText"
                            label="Bienvenida actual : "
                            defaultValue={organizations.welcomeText}
                            placeholder="Ingrese nuevo mensaje de bienvenida"
                            value={values.welcomeText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.welcomeText && errors.icoNwelcomeText && <Icon>{errors.icoNwelcomeText}</Icon>}
                    </div>
                    {touched.welcomeText && errors.welcomeText  && <ErrorText> {errors.welcomeText} </ErrorText>}
                </div>
            </div>
            <br></br> <br></br>

            <div className="displayFlex centerText ">
                <span>Creada  : {formatDate(new Date(organizations.createdAt))}</span>
                <span className="colorTransparent">.....................</span>
                <span>Última modificación  : {formatDate(new Date(organizations.updatedAt))}</span>
            </div>


        </div>

        { errors.formOk === "f" && 
            <MsjWrong> 
            <span className="centerText">
            <br /> Algun dato es incorrecto. 
            <br/> Por favor complete el formulario correctamente
            </span>        
            </MsjWrong>
        }
           
        <div>
            <div className="centerText">
                <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
                <Link 
                to={"/OrganizationsAll"}
                className="m-3 mr-md-2 btn buttonBlue"
                role="button"
                > Volver
                </Link>
            </div> 
        </div>
       
    </form>
      )}
    </Formik>
  </>
  );
};

export default OrganizationsUpdate;
