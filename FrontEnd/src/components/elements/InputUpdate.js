import React from "react";
import { InputUpdate,InputGroup,Label} from "./ElementsFormStyles";
import  "../styles/styles.css"

const InputUpdateForm = ({type,label,name,encType,value,onBlur,onChange,defaultValue,placeholder}) => {
  

  return (
    <div>
      <Label htmlFor={name}>{label} <span className="fontNotBold"> {defaultValue}</span> </Label>
      <InputGroup>
        <InputUpdate
          className="form-control "
          type={type}
          encType={encType}
          name={name}
          label={label} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur} 
        />         
      </InputGroup>       
      <br></br>
    </div>
  )
}

export default InputUpdateForm ;
