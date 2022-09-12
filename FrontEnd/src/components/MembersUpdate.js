import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import "./styles/styles.css";
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import { Label,SendButton, MsjWrong, ErrorText,Icon} from './elements/ElementsFormStyles';
import  InputUpdate  from './elements/InputUpdate';
import { msgRequired,msgValidationCategoryName,msgValidationCategoryDescription, msgValidationDuplicated, msgValidationActivitiesName} from './helpers/validationMessages';
import { regexCategoryName, regexCategoryDescription} from "./helpers/RegExp";
import { formatDate} from './helpers/FormatDate';

const MembersUpdate = ({match, history}) => {

  const id = match.params.id;

  const [members, setMembers] = useState({
    id: "",
    name: "",
    image:"",
    description:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:"",
    createdAt:"",
    updatedAt:""
  });
 
  //DEFAULT VALUES
  useEffect(() => {
    const getMember = async () => {
      await axiosClient.get(`/members/${id}`)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getMember();
  },[id]);


  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("name",values.name);
    body.append("description",values.description);
    body.append("image",values.image);
    body.append("facebookUrl",values.facebookUrl);
    body.append("instagramUrl",values.instagramUrl);
    body.append("linkedinUrl",values.linkedinUrl);

  
    const updateMember = async () => {
      await axiosClient
        .put(`/members/update/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setMembers(response.data);
            Swal.fire({
              icon: "success",
              title: "Colaborador actualizado !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/MembersAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateMember();
  };



 //FORMIK INITIAL VALUES
  let initialValues={name:members.name, description:members.description,
                     facebookUrl:members.facebookUrl, instagramUrl:members.instagramUrl,
                     linkedinUrl:members.linkedinUrl}

//FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   

  let errors = {name: '', image:'',description:'', facebookUrl:'', instagramUrl:'', linkedinUrl:'',icoNname:'', icoNimage:'',
                icoNdescription:'', icoNfacebookUrl:'', icoNinstagramUrl:'', icoNlinkedinUrl:'',formOk:''};  
 
  if(!values.image) {
      errors.image=msgRequired
      errors.icoNimage= '❌'
      return errors
  } else {
      errors.icoNimage= '✔️'
  };

  if (!values.name) {
    errors.name=msgRequired
    errors.icoNname= '❌'
    return errors
  };

  if (!regexCategoryName.test(values.name)) {
    errors.name=msgValidationCategoryName
    errors.icoNname= '❌'
    return errors
  } else {
    errors.icoNname= '✔️'
  };

  
  if (!values.description) {
    values.description=members.description
    errors.icoNdescription= '✔️'
  };

  if (!regexCategoryDescription.test(values.description)) {
    errors.description=msgValidationCategoryDescription
    errors.icoNdescription= '❌'
    return errors
  } else {
    errors.icoNdescription= '✔️'
  };

  if(!values.facebookUrl) {
    values.facebookUrl=members.facebookUrl
    errors.icoNfacebookUrl= '✔️'
    return errors
  };

  if(!values.instagramUrl) {
    values.instagramUrl=members.instagramUrl
    errors.icoNinstagramUrl= '✔️'
    return errors
  };

  if(!values.linkedinUrl) {
    values.linkedinUrl=members.linkedinUrl
    errors.icoNlinkedinUrl= '✔️'
    return errors
  };


  if(errors.name || errors.image || errors.description || errors.facebookUrl || errors.instagramUrl|| errors.linkedinUrl){
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
      <form  className="container-sm col-4 col-md-5 bg-light" onSubmit={handleSubmit}>
        <h3 className="centerText">Datos a actualizar ...</h3>
        <br></br>
        <div >
          <div className="displayFlex inputUpdateWidth">
            <div className="displayInLineFlex inputUpdateWidth">
              <InputUpdate
              type="file"
              name="image"
              label="Imágen actual:"
              encType="multipart/form-data"
              defaultValue={<img className="imageSmall" src={members.image}  alt="memberImage"/>}
              onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
              onBlur={handleBlur}
              />
              {touched.image && errors.icoNimage && <Icon>{errors.icoNimage}</Icon>}
            </div>
            {touched.image && errors.image   && <ErrorText> {errors.image} </ErrorText>}
          </div>
          <br></br>
          <div className="displayFlex inputUpdateWidth">
            <div className="displayInLineFlex inputUpdateWidth">
              <InputUpdate
              type="text"
              name="name"
              label="Nombre actual: " 
              defaultValue={members.name}
              placeholder="Ingrese nuevo nombre"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {touched.name && errors.icoNname && <Icon>{errors.icoNname}</Icon>}
              </div>
              {touched.name && errors.name && <ErrorText>{errors.name} </ErrorText> }
          </div>
        <br></br>
        <div>
          <div className="displayInLineFlex inputUpdateWidth">
            <div className="marginLeft25px ">
              <label><b>Detalle actual:</b> </label>
              <textarea className="form-control"
              type='text'
              rows='3'
              cols='200'
              name="description"
              defaultValue={members.description}
              placeholder="Ingrese nuevo detalle"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {console.log(errors)}
              {touched.description && errors.icoNdescription && <Icon>{errors.icoNdescription}</Icon>}
            </div>
              {touched.description && errors.description  && <ErrorText> {errors.description} </ErrorText>}
          </div>
        </div>
        <br></br>
        <div className="displayFlex marginLeft25px">
          <div className=" inputUpdateWidth ">
            <div className="widthDate">
              <InputUpdate
              type="text"
              name="facebookUrl"
              label="Facebook actual : "
              defaultValue={members.facebookUrl}
              placeholder="Ingrese nuevo facebook"
              value={values.facebookUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {touched.facebookUrl && errors.icoNfacebookUrl && <Icon>{errors.icoNfacebookUrl}</Icon>}
            </div>
            {touched.facebookUrl && errors.facebookUrl  && <ErrorText> {errors.facebookUrl} </ErrorText>}
          </div>
          <br></br>
          <div className="display inputUpdateWidth">
            <div className="widthDate">
              <InputUpdate 
              type="text"
              name="instagramUrl"
              label="Instagram actual : "
              defaultValue={members.instagramUrl}
              placeholder="Ingrese nuevo instagram"
              value={values.instagramUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {touched.instagramUrl && errors.icoNinstagramUrl && <Icon>{errors.icoNinstagramUrl}</Icon>}
            </div>
            {touched.instagramUrl && errors.instagramUrl  && <ErrorText> {errors.instagramUrl} </ErrorText>}
          </div>
        </div>
        <br></br>
        <div className="display inputUpdateWidth">
          <div className="displayFlex inputUpdateWidth">
            <InputUpdate
            type="text"
            name="linkedinUrl"
            label="Linkedin actual :"
            defaultValue={members.linkedinUrl}
            placeholder="Ingrese nuevo linkedin"
            value={values.linkedinUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            />
            {touched.linkedinUrl && errors.icoNlinkedinUrl && <Icon>{errors.icoNlinkedinUrl}</Icon>}
          </div>
          {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText> {errors.linkedinUrl} </ErrorText>}
        </div>
       
        <br></br>
        <div className="displayFlex marginLeft40px">
          <div>
            <Label htmlFor="name">Creado  :
              <span className="fontNotBold " >{formatDate(new Date(members.createdAt))}</span>
            </Label>
          </div>
          
          <div> 
            <Label htmlFor="name">Última modificación  :
              <span className=" fontNotBold" >{formatDate(new Date(members.updatedAt))}</span>
            </Label>
          </div>
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
        
        <div className=" centerText ">
          <SendButton type="submit" className="m-2 btn btn-primary md-end "> Guardar </SendButton>
          <Link 
          to={"/MembersAll"}
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

}

export default MembersUpdate;