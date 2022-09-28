import "./styles/styles.css";
import whatsapp from './images/whatsapp.jpg';
import email from './images/email.jpg';
import mapa from './images/mapa.png';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import {Navbar, Container,Nav, NavbarBrand} from "react-bootstrap";
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";


function Footer () {
    return (
     <Container>
        <Navbar  className="footer" collapseOnSelect expand="md" bg="dark" variant="dark" fixed="bottom">
            <Navbar.Collapse>
                <Nav className="ms-auto">
                    <NavbarBrand className="footerNavBrand"> 
                        <img className="iconMapPhoneMailFooter"src={mapa} alt="mapa"></img> 
                        <span className="colorBlack"> .. </span>
                        Av. Balbin 4780  CABA

                        <span className="colorBlack"> ... </span>
                        <a  className="imageAddressMap" href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >(ver mapa)</a>
                        
                        <span className="colorBlack"> ..................... </span>
                        <img className="iconMapPhoneMailFooter"src={whatsapp} alt="whatsapp"></img>  
                        
                        <span className="colorBlack"> .. </span>
                        011-6011-2988

                        <span className="colorBlack"> ........ </span>   
                        <img className="iconMapPhoneMailFooter"src={email} alt="email"></img>  
                        <span className="colorBlack"> ...... </span> 
   
                        <span className="colorBlack"> .. </span>
                        <div className={ViewRegularUserOptions()}> 
                            <a href="/contactForm" >  somos.mas.97@gmail.com</a>    
                        </div>

                        <span className="colorBlack"> ...... </span>
                        <a href="http://instagram.com" >
                            <img className="iconFacebookInstagramFooter"src={instagram} alt="instagram"></img>
                        </a>
                        <a href="http://facebook.com"  >
                            <img className="iconFacebookInstagramFooter"src={facebook} alt="facebook"></img>
                        </a>   
                    </NavbarBrand> 
                </Nav> 
            </Navbar.Collapse>
        </Navbar>
     </Container>
    )
}

export default Footer;