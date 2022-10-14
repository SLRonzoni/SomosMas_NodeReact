import "./styles/styles.css";
import "./styles/tableMediaScreen.css";
import whatsapp from './images/whatsapp.jpg';
import email from './images/email.jpg';
import mapa from './images/mapa.png';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import {Navbar,Nav, NavbarBrand} from "react-bootstrap";
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";


function Footer () {
    return (
      <div className="container"> 
        <Navbar  className="footer" collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="bottom">
            <Navbar.Collapse>
                <Nav className="ms-auto">
                    <NavbarBrand className="footerNavBrand">                    
                        <div> 
                            <a  href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
                                <img className="iconMapFooter"src={mapa} alt="mapa"></img>  
                            </a>
                            <span className="colorTransparent"> . </span>  
                            <span>  Av. Balbin 4780  CABA </span>
                        </div>                      
                        
                        <div> 
                            <img className="iconPhoneFooter"src={whatsapp} alt="whatsapp"></img>  
                            <span className="colorTransparent"> . </span>  
                            <span> 011-6011-2988</span>
                        </div>
 
                        <div className={ViewRegularUserOptions()}> 
                            <span className="colorTransparent"> ........ </span>  
                            <a href="/contactForm" >
                                <img className="iconEmailFooter"src={email} alt="email"></img>  
                            </a>    
                        </div>

                        <span className="colorTransparent"> ...... </span>
                        <a href="http://instagram.com/somosmasong/" >
                            <img className="iconFacebookInstagramFooter"src={instagram} alt="instagram"></img>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100086643616310"  >
                            <img className="iconFacebookInstagramFooter"src={facebook} alt="facebook"></img>
                        </a>   
                    </NavbarBrand> 
                </Nav> 
            </Navbar.Collapse>
        </Navbar>
     </div>
    )
}

export default Footer;