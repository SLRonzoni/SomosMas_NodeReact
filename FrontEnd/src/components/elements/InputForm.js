import React from "react";
import { Input,InputGroup,Label} from "./ElementsFormStyles";

const InputForm = ({type,label,name,placeholder,defaultValue,onChange,required,id,encType,minlength,maxlength,onKeyPress,icon}) => {
    
  

  return (
    <div>
      <Label htmlFor={name}>{label} </Label>
      <InputGroup>
        <Input
          className="form-control"
          id={id}
          type={type}
          encType={encType}
          name={name}
          label={label}
          required={required}
          minlength={minlength}
          maxlength={maxlength}
          placeholder={placeholder}          
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
          icon={icon}
        />
        
      </InputGroup>

      <br></br>
    </div>
  )
}

export default InputForm ;
