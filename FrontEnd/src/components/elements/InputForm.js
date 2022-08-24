import React from "react";
import { Input,InputGroup,Label} from "./ElementsFormStyles";

const InputForm = ({type,label,name,encType,value,onBlur,onChange}) => {
  

  return (
    <div>
      <Label htmlFor={name}>{label} </Label>
      <InputGroup>
        <Input
          className="form-control"
          type={type}
          encType={encType}
          name={name}
          label={label} 
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
