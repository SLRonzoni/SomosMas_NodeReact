import React, {useRef} from "react";
import "./styles/styles.css";
import "./styles/tableMediaScreen.css";
import Swal from "sweetalert2";
import {FaBars, FaTimes} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Nav,NavDropdown, NavbarBrand } from "react-bootstrap";
import Searcher from "./Searcher";
import imagen from "./images/manos_logo-sinFondo.png";
import user from "./images/user.png";

export default function Header () {

  const navRef= useRef(null);
  const showNavBar= ()=>{
    navRef.current.className="responsiveNav";
  }

  const showNavBarX= ()=>{
    navRef.current.className="";
  }
  
  let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
  let login  = JSON.parse(sessionStorage.getItem('loginData'));
  let name;
  let photo;
  if (userInfo && userInfo.image!==""? photo=userInfo.image : photo=user);

 
    const logout = ()=>{
      Swal.fire({
        icon: "info",
        title: `Sesión finalizada, gracias por visitarnos !`,
        showConfirmButton:false,
        timer:2000
      })
      sessionStorage.clear();
      setTimeout( function() { window.location.href = "/"; }, 2000 );
      }   

      {userInfo && userInfo.roleId!==1 && userInfo.firstName && (name=userInfo.firstName)}
      {userInfo && userInfo.roleId!==1 && userInfo.givenName && (name=userInfo.givenName)}
     
  return(
      <header>  
            <h5> Somos Más Ong <img className="handsLogo shadowFilterNav" src={imagen} alt="manosNiños"></img> </h5>
            <br/>
            <nav ref={navRef}>
              <Nav>
                <NavbarBrand >
                  {!userInfo &&(
                    <NavDropdown title="Secciones">  
                      <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                      <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                      <NavDropdown.Divider /> 
                      <NavDropdown.Item href="/ActivitiesPublicAll">Actividades</NavDropdown.Item>
                      <NavDropdown.Item href="/NewsAllPublic">Noticias</NavDropdown.Item>
                      <NavDropdown.Item href="/OrganizationsAll">Nos acompañan . . .</NavDropdown.Item>
                      <NavDropdown.Item href="/TestimonialsPublic">Testimonios</NavDropdown.Item>                     
                      <NavDropdown.Divider /> 
                      <NavDropdown.Item href="/ContactForm">Contacto</NavDropdown.Item> 
                    </NavDropdown>
                  )}
                  {userInfo && userInfo.roleId!==1 && (
                    <NavDropdown title={`${name}, tus secciones` } id="basic-nav-dropdown">
                      <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                      <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                      <NavDropdown.Item href="/ActivitiesPublicAll">Actividades</NavDropdown.Item>
                      <NavDropdown.Divider /> 
                      <NavDropdown.Item href="/OrganizationsAll">Nos acompañan</NavDropdown.Item>
                      <NavDropdown.Item href="/NewsAllPublic">Noticias</NavDropdown.Item>
                      <NavDropdown.Item href="/TestimonialsPublic">Testimonios</NavDropdown.Item>
                      <NavDropdown.Divider />               
                      <NavDropdown.Item href="/ContactForm">Contacto</NavDropdown.Item> 
                      <NavDropdown.Divider /> 
                      <NavDropdown.Item href={`/users/${userInfo.id}`}>Mi perfil</NavDropdown.Item>
                  </NavDropdown> 
                  )}               
                  {userInfo && userInfo.roleId===1 && ( 
                    <NavDropdown title="Administrador, tus secciones" id="basic-nav-dropdown">  
                      <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                      <NavDropdown.Item href="/ActivitiesAll">Actividades</NavDropdown.Item>
                      <NavDropdown.Item href="/CategoriesAll">Categorias</NavDropdown.Item>
                      <NavDropdown.Item href="/CommentsAll">Comentarios</NavDropdown.Item>
                      <NavDropdown.Item href="/ContactsAll">Contactos</NavDropdown.Item>
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

                  <NavbarBrand>
                    <Searcher />
                  </NavbarBrand>

                  <NavbarBrand>
                    {!userInfo && ( 
                      <Link to="/auth/register" className="btnLoginLogoutRegister" >Register </Link>
                    )}
                  </NavbarBrand>
               
                  <NavbarBrand>
                    {!userInfo && ( 
                      <Link to="/auth/login" className="btnLoginLogoutRegister" >Login </Link>
                    )}
                  </NavbarBrand>
              
                  <NavbarBrand>
                    {userInfo && ( 
                      <Link  to="/auth/logout" onClick={logout} className="btnLogout">Logout </Link> 
                    )}
                  </NavbarBrand>

                <button className= "nav-btn nav-close-btn" onClick={showNavBarX}>
                  <FaTimes></FaTimes>
                </button>              
           </Nav>
          </nav>
          {login===true && (
            <img className="imageNavBar" src={photo} alt="user image"></img>
          )}
          <button className= "nav-btn" onClick={showNavBar}>
            <FaBars></FaBars>
          </button>

        </header> 
       
  );
 }

