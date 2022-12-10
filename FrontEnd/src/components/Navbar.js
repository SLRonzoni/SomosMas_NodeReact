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
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showNavbar}/>
        </Link>


       <h1 className={sidebar ? "navbarH1 active" : "navbarH1"}>Somos Más o.n.g.
          <img className={sidebar ? "shadowFilterNav imgHome active" : "shadowFilterNav imgHome"} src={imagen} alt="manosNiños"></img>
        </h1>

        <div className="footer mt-2">
          <Footer/>
        </div>  
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu "}>
     
        <ul className="nav-menu-items ">

          <li className="navbar-toogle">
            <Link to="#" className="menu-x">
              <FaIcons.FaTimes onClick={showNavbar}/>
            </Link>
          </li>

          <li className="navbarUser">
            <h1 className="h1NavbarUser">Somos Más o.n.g.  </h1>
            <img className="imageUserNavBar" src={photo} alt="user"></img>
            <p className="centerText m-1">{name}</p>
          </li>
          
          <li className="navbar-searcher">
            {((userInfo && userInfo.roleId!==1) || !userInfo) && (
              <Searcher/>
            )}
          </li>

          <li className="navbar-toogle" >
            <FaIcons.FaList className="item"/> 
            <Navbar.Brand >
              {!userInfo &&(
                <NavDropdown title="Secciones" className="item ms-2"> 
                  <NavDropdown.Item href="/About" onClick={showNavbar}>Acerca de nosotros</NavDropdown.Item>
                  <NavDropdown.Item href="/MembersAll" onClick={showNavbar}>Miembros</NavDropdown.Item>
                  <NavDropdown.Divider /> 
                  <NavDropdown.Item href="/ActivitiesPublicAll" onClick={showNavbar}>Actividades</NavDropdown.Item>
                  <NavDropdown.Item href="/NewsAllPublic" onClick={showNavbar}>Noticias</NavDropdown.Item>
                  <NavDropdown.Item href="/OrganizationsAll" onClick={showNavbar}>Quienes nos acompañan</NavDropdown.Item>
                  <NavDropdown.Item href="/TestimonialsPublic" onClick={showNavbar}>Testimonios</NavDropdown.Item>                     
                  <NavDropdown.Divider /> 
                  <NavDropdown.Item href="/ContactForm" onClick={showNavbar}>Contacto</NavDropdown.Item> 
                  <NavDropdown.Item href="/PaymentMethod" onClick={showNavbar}>Donar</NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo && userInfo.roleId!==1 && (
                <NavDropdown title="Secciones" className="NavDrop ms-2">
                  <NavDropdown.Item href="/About" onClick={showNavbar}>Acerca de nosotros</NavDropdown.Item>
                  <NavDropdown.Item href="/MembersAll" onClick={showNavbar}>Miembros</NavDropdown.Item>
                  <NavDropdown.Item href="/ActivitiesPublicAll" onClick={showNavbar}>Actividades</NavDropdown.Item>
                  <NavDropdown.Divider /> 
                  <NavDropdown.Item href="/OrganizationsAll" onClick={showNavbar}>Quienes nos acompañan</NavDropdown.Item>
                  <NavDropdown.Item href="/NewsAllPublic" onClick={showNavbar}>Noticias</NavDropdown.Item>
                  <NavDropdown.Item href="/TestimonialsPublic" onClick={showNavbar}>Testimonios</NavDropdown.Item>
                  <NavDropdown.Divider />               
                  <NavDropdown.Item href="/ContactForm" onClick={showNavbar}>Contacto</NavDropdown.Item>
                  <NavDropdown.Item href="/PaymentMethod" onClick={showNavbar}>Donar</NavDropdown.Item>
                  <NavDropdown.Divider /> 
                  <NavDropdown.Item href={`/users/${userInfo.id}`}>Mi perfil</NavDropdown.Item>
              </NavDropdown> 
              )}               
              {userInfo && userInfo.roleId===1 && ( 
                <NavDropdown title="Secciones" id="basic-nav-dropdown" className="ms-2" >  
                  <NavDropdown.Item href="/About" onClick={showNavbar}>Acerca de nosotros</NavDropdown.Item>
                  <NavDropdown.Item href="/ActivitiesAll" onClick={showNavbar}>Actividades</NavDropdown.Item>
                  <NavDropdown.Item href="/CategoriesAll" onClick={showNavbar}>Categorias</NavDropdown.Item>
                  <NavDropdown.Item href="/CommentsAll" onClick={showNavbar}>Comentarios</NavDropdown.Item>
                  <NavDropdown.Item href="/ContactsAll" onClick={showNavbar}>Contactos</NavDropdown.Item>
                  <NavDropdown.Item href="/DonationsAll" onClick={showNavbar}>Donaciones</NavDropdown.Item>
                  <NavDropdown.Item href="/MessagesAll" onClick={showNavbar}>Mensajes</NavDropdown.Item>
                  <NavDropdown.Item href="/MembersAll" onClick={showNavbar}>Miembros</NavDropdown.Item>
                  <NavDropdown.Item href="/newsAll" onClick={showNavbar}>Noticias</NavDropdown.Item>
                  <NavDropdown.Item href="/OrganizationsAll" onClick={showNavbar}>Organizaciones</NavDropdown.Item>
                  <NavDropdown.Item href="/RolesAll" onClick={showNavbar}>Roles</NavDropdown.Item>
                  <NavDropdown.Item href="/TestimonialsAll" onClick={showNavbar}>Testimonios</NavDropdown.Item>
                  <NavDropdown.Item href="/UsersAll" onClick={showNavbar}>Usuarios</NavDropdown.Item>             
                </NavDropdown>
              )} 
            </Navbar.Brand>    
          </li>

          <li className="navbar-toogle" >
                <FaIcons.FaHome className="item"/> 
                <Link to="/" className="item m-2" onClick={showNavbar}>Inicio </Link>
          </li> 

          <li className="navbar-toogle">
            {!userInfo && (
              <div>
                <FaIcons.FaAddressCard className="item"/> 
                <Link to="/auth/register" className="item m-2" onClick={showNavbar}>Registro </Link>
              </div> 
            )} 
          </li>

          <li className="navbar-toogle">
            {!userInfo && (
              <div>
                <FaIcons.FaUserCheck className="item"/>
                <Link to="/auth/login" className="item m-2" onClick={showNavbar}>Login </Link>
              </div> 
            )} 
            {userInfo && (
              <div >
                <FaIcons.FaArrowLeft className="item"/> 
                <Link  to="/auth/logout" onClick={logout} className="item m-2">Logout </Link> 
              </div> 
            )}         
          </li> 
       
        </ul>        
      </nav>
      
    </> 
  );
 }

