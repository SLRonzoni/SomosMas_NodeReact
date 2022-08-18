import React from "react";
import "./styles/styles.css"
import Swal from "sweetalert2";
import { Link, NavLink} from "react-router-dom";
import { Navbar,Container,Nav,NavDropdown, NavbarBrand } from "react-bootstrap";
import Searcher from "./Searcher";
import imagen from "./images/manos_logo.jpg";

export default function Header () {
  
  let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
 
    const logout = ()=>{
      Swal.fire({
        icon: "info",
        title: `Cerrá tu navegador para finalizar la sesión`,
        showConfirmButton:false,
        timer:2000
      })
      
      setTimeout( function() { window.location.href = "/"; }, 2000 );
      }   
     
  return(
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <NavbarBrand >Somos Más Ong <img className="manosLogo borderRounded" src={imagen} alt="manosNiños"></img>
            <Link to="/"className="nav-link" ></Link>
          </NavbarBrand>  
           
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavbarBrand >
              {!userInfo && (
                  <NavDropdown title="Secciones" id="basic-nav-dropdown" >  
                    <NavDropdown.Item href="/OrganizationsAll">Organización</NavDropdown.Item>
                    <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                    <NavDropdown.Item href="/SlidesAll">Imágenes</NavDropdown.Item>
                    <NavDropdown.Item href="/TestimonialsAll">Testimonios</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavDropdown.Item href="/ActivitiesAll">Actividades</NavDropdown.Item>
                    <NavDropdown.Item href="/NewsAll">Noticias</NavDropdown.Item>
                    <NavDropdown.Item href="/CommentsAll">Comemtarios</NavDropdown.Item> 
                    <NavDropdown.Item href="/Contact">Contacto</NavDropdown.Item> 
                  </NavDropdown>
              )}

              {userInfo && userInfo.roleId!==1 && (
                   <NavDropdown title={`Secciones para ${userInfo.firstName}` } id="basic-nav-dropdown">
                    <NavDropdown.Item href="/OrganizationsAll">Organización</NavDropdown.Item>
                    <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                    <NavDropdown.Item href="/SlidesAll">Imágenes</NavDropdown.Item>
                    <NavDropdown.Item href="/TestimonialsAll">Testimonios</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavDropdown.Item href="/ActivitiesAll">Actividades</NavDropdown.Item>
                    <NavDropdown.Item href="/NewsAll">Noticias</NavDropdown.Item>
                    <NavDropdown.Item href="/CommentsAll">Comemtarios</NavDropdown.Item>
                    <NavDropdown.Item href="/Contact">Contacto</NavDropdown.Item> 
                    <NavDropdown.Divider /> 
                    <NavLink to={`/users/update/${userInfo.id}`} className="renglonBtn nav p-3 col-1">Mi Perfil</NavLink>
                  </NavDropdown> 
                )} 
              </NavbarBrand>
              
              {userInfo && userInfo.roleId===1 && ( 
              <NavbarBrand>
                  <NavDropdown title="Secciones para Administrador" id="basic-nav-dropdown">   
                    <NavDropdown.Item href="/ActivitiesAll">Actividades</NavDropdown.Item>
                    <NavDropdown.Item href="/CategoriesAll">Categorias</NavDropdown.Item>
                    <NavDropdown.Item href="/CommentsAll">Comemtarios</NavDropdown.Item>
                    <NavDropdown.Item href="/ContactsAll">Contactos</NavDropdown.Item>
                    <NavDropdown.Item href="/SlidesAll">Imágenes</NavDropdown.Item>
                    <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                    <NavDropdown.Item href="/newsAll">Noticias</NavDropdown.Item>
                    <NavDropdown.Item href="/OrganizationsAll">Organización</NavDropdown.Item>
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
              <NavbarBrand > 
                  <Link to="/auth/register" className="login  nav-link  p-1 col-1 " >Registro</Link>
              </NavbarBrand>
              <NavbarBrand>
                  <Link to="/auth/login" className="login  nav-link  p-1 col-1 " >Login</Link>
              </NavbarBrand>
              <NavbarBrand>
                 <Link  to="/auth/logout" onClick={logout} className="login  nav-link  p-1 col-1 " >Logout</Link>
              </NavbarBrand>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
 }
