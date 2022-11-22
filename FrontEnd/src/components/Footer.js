import React from "react";
import "./styles/styles.css";
import "./styles/navbarFooter.css";
import * as FaIcons from "react-icons/fa";
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";


function Footer () {
    return (
        <footer> 
            <div className={ViewRegularUserOptions()}> 
                <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
                    <FaIcons.FaMapMarkedAlt className="iconFooter"/> 
                </a>
                <span className="me-3">Av. R.Balbin 4780 - CABA</span>
               
                <FaIcons.FaPhone className="iconFooter me-1"/> 
                <span className="me-3">011-6011-2988</span>
               
                <a href="/contactForm">
                    <FaIcons.FaMailBulk className="iconFooter me-2"/>
                </a>      
               
                <a href="http://instagram.com/somosmasong/" >
                   <FaIcons.FaInstagram className="iconFooter me-2"/> 
                </a>

                <a href="https://www.facebook.com/profile.php?id=100086643616310" >
                    <FaIcons.FaFacebook className="iconFooter me-2"/>
                </a> 
            </div>                          
            
        </footer>
    )
}

export default Footer;