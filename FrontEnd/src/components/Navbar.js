import React,{useState} from "react";
import "./styles/styles.css";
import "./styles/navbarFooter.css";
import "./styles/tableMediaScreen.css";
import Swal from "sweetalert2";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navbar,NavDropdown} from "react-bootstrap";
import imagen from "./images/manos_logo-sinFondo.png";
import Searcher from "./Searcher";
import user from "./images/user.png";
import Footer from "./Footer";


export default function Sidebar () {

  const[sidebar,setSidebar]=useState(false)

  const showNavbar=()=>{
    setSidebar(!sidebar)
  };

  const logout = ()=>{
    Swal.fire({
      icon: "info",
      title: `Gracias por visitarnos !`,
      showConfirmButton:false,
      timer:2000
    })
    sessionStorage.clear();
    setTimeout( function() { window.location.href = "/"; }, 2000 );
  }; 
    
  let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
  
  let name, photo;
 
  userInfo && userInfo.image!=="" ? photo=userInfo.image : photo=user;
  userInfo && userInfo.name!=="" ? name=userInfo.firstName : name="Bienvenid@ !"; 

  userInfo && userInfo.roleId!==1 && userInfo.firstName && (name=userInfo.firstName)
  userInfo && userInfo.roleId!==1 && userInfo.givenName && (name=userInfo.givenName)
  
  return(  
    <>         
      <div className="navbar">
        <Link to="#" className="menu-bars ms-4">
          <FaIcons.FaBars onClick={showNavbar}/>
        </Link>
     
        <h1 className=""> Somos Más o.n.g.
          <img className="shadowFilterNav imgHome" src={imagen} alt="manosNiños"></img>
        </h1>                   
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      
        <ul className="nav-menu-items">
          <li className="navbar-toogle">
            <Link to="#" className="menu-bars">
              <FaIcons.FaTimes onClick={showNavbar}/>
            </Link>
          </li>

          <li className="navbarUser ">
            <img className="imageUserNavBar" src={photo} alt="user image"></img>
            <p className="centerText ">{name}</p>
          </li>
          
          <li className="navbar-searcher">
            <Searcher/>
          </li>

          <li className="navbar-toogle" >
            <FaIcons.FaList className="item"/> 
            <Navbar.Brand >
              {!userInfo &&(
                <NavDropdown title="Secciones" className="item" > 
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
            </Navbar.Brand>    
          </li>

          <li className="navbar-toogle" >
                <FaIcons.FaHome className="item"/> 
                <Link to="/" className="item m-3">Inicio </Link>
          </li> 

          <li className="navbar-toogle">
            {!userInfo && (
              <div>
                <FaIcons.FaAddressCard className="item"/> 
                <Link to="/auth/register" className="item m-3">Registro </Link>
              </div> 
            )} 
          </li>

          <li className="navbar-toogle">
            {!userInfo && (
              <div>
                <FaIcons.FaUserCheck className="item"/>
                <Link to="/auth/login" className="item m-3">Login </Link>
              </div> 
            )} 
          </li>

          <li className="navbar-toogle">
            {userInfo && (
              <div >
                <FaIcons.FaArrowLeft className="item"/> 
                <Link  to="/auth/logout" onClick={logout} className="item m-3">Logout </Link> 
              </div> 
            )} 
          </li>

          <div className="footer">
             <Footer/>
          </div>

        </ul>
      </nav>
    </> 
  );
 }

