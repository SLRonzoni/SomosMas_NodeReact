import React, { useState,useEffect} from "react";
import "./styles/styles.css";
import './styles/members-organizations.css';
import './styles/tableMediaScreen.css';
import * as FaIcons from "react-icons/fa";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Formik } from 'formik';
import { ErrorText,IconUser, InputUser, InputGroup, Defaultvalue,TextArea} from './elements/ElementsFormStyles';
import { msgRequired,msgValidationActivitiesName, msgValidationDuplicated} from './helpers/validationMessages';
import {regexActivitiesName } from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';
import buttonsResponsive from "./buttonsResponsive";

const OrganizationsUpdate = ({match,history}) => {

  const id  = match.params.id;

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

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
    errors.icoNname= X
    return errors
  };

  if (!regexActivitiesName.test(values.name)) {
    errors.name=msgValidationActivitiesName
    errors.icoNname= X
    return errors
  } else {
    errors.icoNname= V
  };

  let searchName=values.name
    repeat(searchName, errors)
    if(duplicated===searchName){
      errors.name=msgValidationDuplicated
      errors.icoNname= X         
      return errors
    } else {
      errors.icoNname= V
    };

  if(!values.image) {
    errors.image=msgRequired
    errors.icoNimage= X
    return errors
  } else {
    errors.icoNimage= V
  };

  if (!values.address) {
    errors.content=msgRequired
    errors.icoNaddress= X
    return errors
  } else {
    errors.icoNaddress= V
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
  <div className="containerFirst">
    <Formik
        initialValues={initialValues}           
        validate={validateInputs}
        onSubmit={(values)=>{ sendForm(values)}}
    >
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
    <form  className="containerUpdateBig" onSubmit={handleSubmit}>
      <h4 className="m-2 flex-Center">Nuevos datos</h4>

    <div className="divsUpdate">
      <div className="divColumnUpdate">
        <div>
          <div>          
            <InputGroup className="d-block mb-5">
              <label  htmlFor='image'>Imágen actual</label>
              <div className="MQinputWithImage">
                <img className="imageSmallUpdateForm" src={organizations.image}  alt="ImágenOrganización"/>
                <input className="ps-3"
                  type="file"
                  name="image"
                  encType="multipart/form-data"
                  onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                  onBlur={handleBlur}
                />
                {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
             </div>
            </InputGroup>
          </div>
          {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
        </div>  

        <div>
          <div>            
              <InputGroup className="d-block mb-1">
                <label  htmlFor='name'>Nombre</label>
                <InputUser className="form-control"
                  type="text"
                  name="name"
                  placeholder="Ingrese nuevo nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                <Defaultvalue>  actual : {organizations.name} </Defaultvalue>
              </InputGroup>
            </div>
            {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText>}
        </div>
      
        <div>
          <div>             
              <InputGroup className="d-block mb-1">
                <label  htmlFor='address'>Calle, número, localidad</label>
                <InputUser className="form-control"
                  type="text"
                  name="address"
                  placeholder="Ingrese nueva dirección"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.address && errors.icoNaddress && <IconUser className="mt-4">{errors.icoNaddress}</IconUser>}
                <Defaultvalue>  actual : {organizations.address} </Defaultvalue>
              </InputGroup>
            </div>
            {touched.address && errors.address  && <ErrorText className="errorTextUpdate"> {errors.address} </ErrorText>}
        </div>

        <div>
          <div>           
              <InputGroup className="d-block mb-1">
                <label  htmlFor='phone'>Teléfono</label>
                <InputUser className="form-control"
                      type="text"
                      name="phone"
                      placeholder="Ingrese nuevo teléfono"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                  {touched.phone && errors.icoNphone && <IconUser className="mt-4">{errors.icoNphone}</IconUser>}
                  <Defaultvalue>  actual : {organizations.phone} </Defaultvalue>
                </InputGroup>
              </div>
              {touched.phone && errors.phone  && <ErrorText className="errorTextUpdate"> {errors.phone} </ErrorText>}
        </div>

        <div>
          <div>              
            <InputGroup className="d-block">
              <label  htmlFor='email'>Email</label>
              <InputUser className="form-control"
                    type="text"
                    name="email"
                    placeholder="Ingrese nuevo email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.email && errors.icoNemail && <IconUser className="mt-4">{errors.icoNemail}</IconUser>}
                <Defaultvalue>  actual : {organizations.email} </Defaultvalue>
              </InputGroup>
          </div>
          {touched.email && errors.email  && <ErrorText className="errorTextUpdate"> {errors.email} </ErrorText>}
        </div>

        <div>
          <div>              
            <InputGroup className="d-block mb-1">
              <label  htmlFor='facebookUrl'>Facebook</label>
              <InputUser className="form-control"
                type="text"
                name="facebookUrl"
                placeholder="Ingrese nuevo facebook"
                value={values.facebookUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.facebookUrl && errors.icoNfacebookUrl && <IconUser className="mt-4">{errors.icoNfacebookUrl}</IconUser>}
              <Defaultvalue>  actual : {organizations.facebookUrl} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.facebookUrl && errors.facebookUrl  && <ErrorText className="errorTextUpdate"> {errors.facebookUrl} </ErrorText>}
        </div>
      </div> 

      <div className="divColumnUpdate"> 
        <div>
          <div>        
            <InputGroup className="d-block">
              <label  htmlFor='instagramUrl'>Instagram</label>
              <InputUser className="form-control"
                type="text"
                name="instagramUrl"
                placeholder="Ingrese nuevo instagram"
                value={values.instagramUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.instagramUrl && errors.icoNinstagramUrl && <IconUser className="mt-4">{errors.icoNinstagramUrl}</IconUser>}
              <Defaultvalue>  actual : {organizations.instagramUrl} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.instagramUrl && errors.instagramUrl  && <ErrorText className="errorTextUpdate"> {errors.instagramUrl} </ErrorText>}
        </div>   

        <div>
          <div>             
            <InputGroup className="d-block">
              <label  htmlFor='linkedinUrl'>LinkedIn</label>
              <InputUser className="form-control"
                type="text"
                name="linkedinUrl"
                placeholder="Ingrese nuevo linkedin"
                value={values.linkedinUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.linkedinUrl && errors.icoNlinkedinUrl && <IconUser className="mt-4">{errors.icoNlinkedinUrl}</IconUser>}
              <Defaultvalue>  actual : {organizations.linkedinUrl} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText className="errorTextUpdate"> {errors.linkedinUrl} </ErrorText>}
        </div>
      
        <div>
          <div>            
            <InputGroup className="d-block">
              <label  htmlFor='aboutUsText'>Sobre nosotros</label>
              <TextArea className="updateTextArea pt-1 form-control"
                type="text"
                name="aboutUsText"
                placeholder="Ingrese nuevo texto sobre nosotros"
                value={values.aboutUsText}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.aboutUsText && errors.icoNaboutUsText && <IconUser className="mt-4">{errors.icoNaboutUsText}</IconUser>}
              <Defaultvalue>  actual : {organizations.aboutUsText} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.aboutUsText && errors.aboutUsText  && <ErrorText className="errorTextUpdate"> {errors.aboutUstext} </ErrorText>}
        </div>

        <div>
          <div>            
            <InputGroup className="d-block">
              <label  htmlFor='welcomeText'>Mensaje de bienvenida</label>
              <TextArea className="updateTextArea pt-1 form-control"
                type="text"
                name="welcomeText"
                placeholder="Ingrese nuevo mensaje de bienvenida"
                value={values.welcomeText}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.welcomeText && errors.icoNwelcomeText && <IconUser className="mt-4">{errors.icoNwelcomeText}</IconUser>}
              <Defaultvalue>  actual : {organizations.welcomeText} </Defaultvalue>
            </InputGroup>
          </div>
          {touched.welcomeText && errors.welcomeText  && <ErrorText className="errorTextUpdate"> {errors.welcometext} </ErrorText>}
        </div>
      </div> 
    </div> 
     
      <div className="flex-Center MQdate">        
        <div className="ms-5"> Creado :{formatDate(new Date(organizations.createdAt))}</div>
        <div className="ms-5">Modificado:{formatDate(new Date(organizations.updatedAt))}</div>
      </div>  

       {buttonsResponsive("/OrganizationsAll","Guardar")}
    </form>
      )}
    </Formik>
    </div>
  </>
  );
};

export default OrganizationsUpdate;
