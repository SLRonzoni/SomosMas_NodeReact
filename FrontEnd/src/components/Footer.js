import "./styles/styles.css";
import whatsapp from './images/whatsapp.jpg';
import email from './images/email.jpg';
import mapa from './images/mapa.png';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';


function Footer () {
    return (
     <footer>
        <nav>
            <p className="footerP"> 
               <img className="iconoSocialNetworksFooter"src={mapa}></img> 
               <span className="colorFooter"> .. </span>
                Av. Balbin 4780  CABA
                <span className="colorFooter"> ... </span>
                <a  className="imageAddressMap" href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >(ver mapa)</a>
                <span className="colorFooter"> ......... </span>

                <img className="iconoSocialNetworksFooter"src={whatsapp}></img>  
                <span className="colorFooter"> .. </span>
                011-6011-2988
                <span className="colorFooter"> ......... </span>

                <img className="iconoSocialNetworksFooter"src={email}></img>  
                <span className="colorFooter"> .. </span>
                 <a href="/contactForm" rel="noopener noreferrer" >somos.mas.97@gmail.com</a>
                <span className="colorFooter"> ......... </span>

                <a href="http://instagram.com" rel="noopener noreferrer" >
                    <img className="iconoSocialNetworksFooter"src={instagram}></img>
                </a>

                <span className="colorFooter"> ......... </span>         
                <a href="http://facebook.com" rel="noopener noreferrer" >
                    <img className="iconoSocialNetworksFooter"src={facebook}></img>
                </a>
            </p>  
        </nav>
     </footer>
    )
}

export default Footer;