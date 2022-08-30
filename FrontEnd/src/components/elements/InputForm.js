import React from "react";
import { Input,InputGroup,Label} from "./ElementsFormStyles";

const InputForm = ({type,label,name,encType,value,onBlur,onChange,defaultValue,placeholder}) => {
  

  return (
    <div>
      <Label htmlFor={name}>{label}  </Label>
      <p className="pUpdateCateg"><em>{defaultValue} </em> </p>
      <InputGroup>
        <Input
          className="form-control"
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

export default InputForm ;
