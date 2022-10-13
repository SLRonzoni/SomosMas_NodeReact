import React from "react";
import "./styles/styles.css";
import "./styles/tableMediaScreen.css";
import Swal from "sweetalert2";
import { Link, NavLink} from "react-router-dom";
import { Navbar,Nav,NavDropdown, NavbarBrand } from "react-bootstrap";
import Searcher from "./Searcher";
import imagen from "./images/manos_logo.jpg";

export default function Header () {
  
  let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
 
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
     
  return(
      <div className="container">  
        <Navbar  className="navBar" collapseOnSelect expand="sm" variant="dark" fixed="top">
          
          <Navbar.Collapse  >
            <Navbar.Text className="colorWhite" >
              Somos Más Ong <img className="handsLogo" src={imagen} alt="manosNiños"></img>
            </Navbar.Text >
            <Nav className="me-auto">
              <NavbarBrand className="colorWhite">
              {!userInfo &&(
                  <NavDropdown  title="Secciones">  
                    <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                    <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavDropdown.Item href="/ActivitiesPublicAll">Actividades</NavDropdown.Item>
                    <NavDropdown.Item href="/NewsAllPublic">Noticias</NavDropdown.Item>
                    <NavDropdown.Item href="/OrganizationsAll">Nos acompañan . . .</NavDropdown.Item>
                    <NavDropdown.Item href="/TestimonialsPublic">Testimonios</NavDropdown.Item>                    
                    <NavDropdown.Item href="/CommentsPublic">Comentarios</NavDropdown.Item> 
                    <NavDropdown.Divider /> 
                    <NavDropdown.Item href="/ContactForm">Contacto</NavDropdown.Item> 
                  </NavDropdown>
              )}

              {userInfo && userInfo.roleId!==1 && (
                   <NavDropdown title={`Secciones para ${userInfo.firstName}` } id="basic-nav-dropdown">
                    <NavDropdown.Item href="/About">Acerca de nosotros</NavDropdown.Item>
                    <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavDropdown.Item href="/ActivitiesPublicAll">Actividades</NavDropdown.Item>
                    <NavDropdown.Item href="/NewsAllPublic">Noticias</NavDropdown.Item>
                    <NavDropdown.Item href="/OrganizationsAll">Nos acompañan</NavDropdown.Item>
                    <NavDropdown.Item href="/TestimonialsPublic">Testimonios</NavDropdown.Item>
                    <NavDropdown.Item href="/CommentsPublic">Comentarios</NavDropdown.Item>
                    <NavDropdown.Divider />               
                    <NavDropdown.Item href="/ContactForm">Contacto</NavDropdown.Item> 
                    <NavDropdown.Divider /> 
                    <NavLink to={`/users/update/${userInfo.id}`} className="renglonBtn nav p-3 col-1 colorBlack">Mi Perfil</NavLink>
                  </NavDropdown> 
                )} 
              </NavbarBrand>
              
              {userInfo && userInfo.roleId===1 && ( 
              <NavbarBrand>
                  <NavDropdown title="Secciones para Administrador" id="basic-nav-dropdown">  
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
              </NavbarBrand>
               )} 
            </Nav>
            
            <Nav className="">
              <NavbarBrand > 
                 <Searcher className=""/>
              </NavbarBrand>
              {!userInfo && ( 
                <NavbarBrand > 
                    <Link to="/auth/register" className="login  nav-link  p-1 col-1 colorWhite" >Registro</Link>
                </NavbarBrand>
               )}
              {!userInfo && ( 
                <NavbarBrand>
                    <Link to="/auth/login" className="login  nav-link  p-1 col-1 colorWhite" >Login</Link>
                </NavbarBrand>
              )}
              {userInfo && ( 
                <NavbarBrand>
                  <Link  to="/auth/logout" onClick={logout} className="login  nav-link  p-1 col-1 colorWhite " >Logout</Link>
                </NavbarBrand>
              )}
            </Nav>
          </Navbar.Collapse>
            </Navbar>
        </div> 
       
    
  );
 }

