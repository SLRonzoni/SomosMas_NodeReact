import React from "react";
import "./styles/styles.css";
import "./styles/headerFooter.css";
import "./styles/tableMediaScreen.css";
import {FaFacebook, FaInstagram,FaMailBulk,FaMapMarker,FaPhone } from "react-icons/fa";
import ViewRegularUserOptions from "./helpers/ViewRegularUserOptions";


function Footer () {
    return (
        <footer> 
            <div> 
                <a href="https://www.google.com/maps/place/Av.+Dr.+Ricardo+Balb%C3%ADn+4780,+Buenos+Aires/@-34.5529207,-58.5005272,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb6e7c5d0b5a3:0xee2c4abafd3b0441!8m2!3d-34.5529251!4d-58.4983385" >
                    <FaMapMarker className="iconFooter"/> 
                </a>
                <span className="">Av. R.Balbin 4780</span>
                
                <span className="marginLeft40px"> C.A.B.A.</span>  
                <br/>
                <FaPhone className="iconFooter"/> 
                <span className="">011-6011-2988</span>

                <div className={ViewRegularUserOptions()}> 
                    <a href="/contactForm" >
                        <FaMailBulk className="iconFooter me-1"/>
                    </a> 
                    <span>E-mail</span>       
                </div>

                <a href="http://instagram.com/somosmasong/" >
                   <FaInstagram className="iconFooter me-1"/> 
                </a>
                <span >Instagram</span>
                <br/>

                <a href="https://www.facebook.com/profile.php?id=100086643616310" >
                    <FaFacebook className="iconFooter me-1"/>
                </a> 
                <span>Facebook</span>
            </div>                          
            
        </footer>
    )
}

export default Footer;