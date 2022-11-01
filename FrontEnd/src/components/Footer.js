import React from "react";
import "./styles/styles.css";
import "./styles/headerFooter.css";
import "./styles/tableMediaScreen.css";
import email from './images/email.jpg';
import mapa from './images/mapa.png';
import facebook from './images/facebook.jpg';
import instagram from './images/instagram.jpg';
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";


function Footer () {
    return (
        <footer> 
            <nav>  
                <div> 
                    <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
                        <img className="iconMapFooter"src={mapa} alt="Mapa"></img>  
                    </a>
                    <span className="colorWhite font12px">Av. R. Balbin 4780  CABA  - ( 011-6011-2988 )</span>   
                </div>               
 
                <div className={ViewRegularUserOptions()}> 
                    <a href="/contactForm" >
                        <img className="iconEmailFooter"src={email} alt="Email"></img>  
                    </a>    

                    <a href="http://instagram.com/somosmasong/" >
                        <img className="iconFacebookInstagramFooter"src={instagram} alt="Instagram"></img>
                    </a>

                    <a href="https://www.facebook.com/profile.php?id=100086643616310"  >
                        <img className="iconFacebookInstagramFooter"src={facebook} alt="Facebook"></img>
                    </a>   
                </div>
            </nav>
        </footer>
    )
}

export default Footer;