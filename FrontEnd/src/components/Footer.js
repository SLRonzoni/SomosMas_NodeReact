import React from "react";
import "./styles/styles.css";
import "./styles/navbarFooter.css";
import "./styles/tableMediaScreen.css";
import * as FaIcons from "react-icons/fa";
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";


function Footer () {
    return (
        <footer> 
            <div> 
                <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
                    <FaIcons.FaMapMarkedAlt className="iconFooter"/> 
                </a>
                <span className="m-2">Av. R.Balbin 4780</span>
                
                <span className="m-5"> C.A.B.A.</span>  
                <br/>
                <FaIcons.FaPhone className="iconFooter"/> 
                <span className="m-1">011-6011-2988</span>
                <br/>
                <div className={ViewRegularUserOptions()}> 
                    <a href="/contactForm" >
                        <FaIcons.FaMailBulk className="iconFooter me-1"/>
                    </a> 
                    <span>E-mail</span>       
                </div>

                <a href="http://instagram.com/somosmasong/" >
                   <FaIcons.FaInstagram className="iconFooter me-1"/> 
                </a>
                <span >Instagram</span>
                <br/>

                <a href="https://www.facebook.com/profile.php?id=100086643616310" >
                    <FaIcons.FaFacebook className="iconFooter me-1"/>
                </a> 
                <span>Facebook</span>
            </div>                          
            
        </footer>
    )
}

export default Footer;