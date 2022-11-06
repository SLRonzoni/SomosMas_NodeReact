import React, {useState} from "react";
import "./styles/styles.css";
import "./styles/tableMediaScreen.css";
import Swal from "sweetalert2";
import {FaTimes, FaBars,FaAddressCard,FaArrowLeft, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavDropdown, NavbarBrand } from "react-bootstrap";
import Searcher from "./Searcher";
import user from "./images/user.png";
import Footer from "./Footer";
import { NavbarWrapper,MenuButtonBars, MenuButtonX } from "./elements/ElementsFormStyles";

export default function Header () {

  const[open,setOpen]=useState(true)

  const handleOpen=()=>{
    setOpen(!open)
  };
    
  let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
  let login  = JSON.parse(sessionStorage.getItem('loginData'));
  let show;
  let name;
  let photo;
  if (userInfo && userInfo.image!=="" ? photo=userInfo.image : photo=user);
  if (userInfo && userInfo.name!=="" ? name=userInfo.firstName : name="");
 
  const logout = ()=>{
    Swal.fire({
      icon: "info",
      title: `Sesión finalizada, gracias por visitarnos !`,
      showConfirmButton:false,
      timer:2000
    })
    sessionStorage.clear();
    setTimeout( function() { window.location.href = "/"; }, 2000 );
  };   

  userInfo && userInfo.roleId!==1 && userInfo.firstName && (name=userInfo.firstName)
  userInfo && userInfo.roleId!==1 && userInfo.givenName && (name=userInfo.givenName)
     
  return(  
    <>     
      {(open==true) ? show="collapse" : show="visible"}
      <NavbarWrapper open={open} >

        <MenuButtonBars  open={open} onClick={handleOpen} >
          <FaBars></FaBars>
        </MenuButtonBars>

        <MenuButtonX open={!open} onClick={handleOpen}>
          <FaTimes></FaTimes>
        </MenuButtonX> 

        <div className={show}>          
        
          <div className="navbarUser">
            {login===true && (
              <div>
                <img className="imageNavBar" src={photo} alt="user image"></img>
                <p className="centerText menuItem">{name}</p>
              </div>
            )}
          </div>

          <Searcher />
          

          <NavbarBrand>
            {!userInfo &&(
              <NavDropdown title="Secciones" className="iconNavbar"> 
                <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                <NavDropdown.Divider /> 
                <NavDropdown.Item href="/ActivitiesPublicAll">Actividades</NavDropdown.Item>
                <NavDropdown.Item href="/NewsAllPublic">Noticias</NavDropdown.Item>
                <NavDropdown.Item href="/OrganizationsAll">Quienes nos acompañan</NavDropdown.Item>
                <NavDropdown.Item href="/TestimonialsPublic">Testimonios</NavDropdown.Item>                     
                <NavDropdown.Divider /> 
                <NavDropdown.Item href="/ContactForm">Contacto</NavDropdown.Item> 
                <NavDropdown.Item href="/PaymentMethod">Donar</NavDropdown.Item>
              </NavDropdown>
            )}
            {userInfo && userInfo.roleId!==1 && (
              <NavDropdown title="Secciones" className="NavDrop">
                <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                <NavDropdown.Item href="/ActivitiesPublicAll">Actividades</NavDropdown.Item>
                <NavDropdown.Divider /> 
                <NavDropdown.Item href="/OrganizationsAll">Quienes nos acompañan</NavDropdown.Item>
                <NavDropdown.Item href="/NewsAllPublic">Noticias</NavDropdown.Item>
                <NavDropdown.Item href="/TestimonialsPublic">Testimonios</NavDropdown.Item>
                <NavDropdown.Divider />               
                <NavDropdown.Item href="/ContactForm">Contacto</NavDropdown.Item>
                <NavDropdown.Item href="/PaymentMethod">Donar</NavDropdown.Item>
                <NavDropdown.Divider /> 
                <NavDropdown.Item href={`/users/${userInfo.id}`}>Mi perfil</NavDropdown.Item>
            </NavDropdown> 
            )}               
            {userInfo && userInfo.roleId===1 && ( 
              <NavDropdown title="Secciones" id="basic-nav-dropdown" >  
                <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                <NavDropdown.Item href="/ActivitiesAll">Actividades</NavDropdown.Item>
                <NavDropdown.Item href="/CategoriesAll">Categorias</NavDropdown.Item>
                <NavDropdown.Item href="/CommentsAll">Comentarios</NavDropdown.Item>
                <NavDropdown.Item href="/ContactsAll">Contactos</NavDropdown.Item>
                <NavDropdown.Item href="/DonationsAll">Donaciones</NavDropdown.Item>
                <NavDropdown.Item href="/MessagesAll">Mensajes</NavDropdown.Item>
                <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                <NavDropdown.Item href="/newsAll">Noticias</NavDropdown.Item>
                <NavDropdown.Item href="/OrganizationsAll">Organizaciones</NavDropdown.Item>
                <NavDropdown.Item href="/RolesAll">Roles</NavDropdown.Item>
                <NavDropdown.Item href="/TestimonialsAll">Testimonios</NavDropdown.Item>
                <NavDropdown.Item href="/UsersAll">Usuarios</NavDropdown.Item>             
              </NavDropdown>
            )} 
          </NavbarBrand>     
                      
          {!userInfo && (
            <div className={show}>
              <FaAddressCard  className="iconNavbar"/> 
              <Link to="/auth/register" className="menuItem m-3 mr-md-2" >Register </Link>
              <br/>
              <FaUserCheck className="iconNavbar"/>
              <Link to="/auth/login" className="menuItem m-3 mr-md-2" >Login </Link>
            </div> 
          )} 
          {userInfo && (
            <div>
              <br/>
              <FaArrowLeft className="iconNavbarLogout" /> 
              <Link  to="/auth/logout" onClick={logout} className="menuItem m-3 mr-md-2">Logout </Link> 
            </div> 
          )} 

          <Footer/>
          </div> 
        </NavbarWrapper>  
      </> 
  );
 }

