import React from "react";
import { Input,InputGroup,Label} from "./ElementsFormStyles";
import  "../styles/styles.css"

const InputUpdate = ({type,label,name,encType,value,onBlur,onChange,defaultValue,placeholder}) => {
  

  return (
    <div>
      <Label htmlFor={name}>{label} <span className="fontNotBold"> {defaultValue}</span> </Label>
      <InputGroup>
        <Input
          className="form-control inputUpdateWidth"
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

export default InputUpdate ;
