import React from "react";
import "./styles/styles.css"
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import { Navbar,Container,Nav,NavDropdown, NavbarBrand } from "react-bootstrap";
import Searcher from "./Searcher";


export default function Header () {
  
  let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
 
    const logout = ()=>{
      Swal.fire({
        icon: "success",
        title: `Sesión finalizada`,
        text: "Usuario desconectado con éxito" ,
        showConfirmButton:false
      })
      
        
      setTimeout( function() { window.location.href = "/"; }, 1000 );
      }   
     
  return(
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <NavbarBrand >Somos Más ong 🙌
            <Link to="/"className="nav-link" ></Link>
          </NavbarBrand>    
           
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavbarBrand >
              {userInfo && userInfo.roleId!==1 && (

                   userInfo ?
                  (
                   <NavDropdown title={userInfo.firstName } id="basic-nav-dropdown">
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
                  </NavDropdown> ) 
                   : 
                  ( 
                    <NavDropdown title="Cliente" id="basic-nav-dropdown">  
                    <NavDropdown.Item href="/OrganizationsAll">Organización</NavDropdown.Item>
                    <NavDropdown.Item href="/MembersAll">Miembros</NavDropdown.Item>
                    <NavDropdown.Item href="/SlidesAll">Imágenes</NavDropdown.Item>
                    <NavDropdown.Item href="/TestimonialsAll">Testimonios</NavDropdown.Item>
                    <NavDropdown.Divider /> 
                    <NavDropdown.Item href="/ActivitiesAll">Actividades</NavDropdown.Item>
                    <NavDropdown.Item href="/NewsAll">Noticias</NavDropdown.Item>
                    <NavDropdown.Item href="/CommentsAll">Comemtarios</NavDropdown.Item> 
                    <NavDropdown.Item href="/Contact">Contacto</NavDropdown.Item> 
                  </NavDropdown>)
                )} 
              </NavbarBrand>
              
              {userInfo && userInfo.roleId===1 && ( 
              <NavbarBrand>
                  <NavDropdown title="Administrador" id="basic-nav-dropdown">   
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
            
            <Nav>
            <NavbarBrand > 
                  <Searcher></Searcher>
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

