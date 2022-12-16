import React from 'react';
import { Link} from "react-router-dom"; 

const buttonsResponsive = (link, textButton, onclick) => {
  return (
    <div className="buttonsResponsive mt-3">
        <Link to={link} className=" btn buttonBlue"> Volver </Link>
        <button  type="submit" className=" btn buttonBlue buttonGreen" onClick={onclick} >{textButton}</button> 
    </div>
  )
}

export default buttonsResponsive;