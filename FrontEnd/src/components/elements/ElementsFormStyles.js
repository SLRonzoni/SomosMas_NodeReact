import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Colors ={
    border:'#0075FF',
    error:'#bb2929',
    success:'#1ed12d',
    fondoMsj:"ligthYellow"
}

const Form =styled.form`
    display=grid;
    grid-template-columns: 1fr 1frM;
    gap:20px;

    @media (max-with:800px){
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    display: block;
    font-weight:700;
    padding:10px;
    min-height:40px;
    cursor:pointer;
`;

const InputGroup = styled.div`
    position:relative;
    z-index:90;
`;


const Input = styled.input`
    width:100%;
    height:45px;
    background:#fff;
    border-radius:3px;
    line-height:45px;
    padding:0 40px 0 10px;
    border:3px solid transparent;

    &:focus {
        border:3px solid ${Colors.border};
        outline:none;
        box-shadow:3px 0px 30px rgba(163,163,163,0.4);
    }
`;

const ValidationIconGreen = styled(FontAwesomeIcon)`
    position:absolute;
    z-index:100;
    right:10px;
    bottom:14px;
    font-size:22px;
    color:green;
`;

const ValidationIconRed = styled(FontAwesomeIcon)`
    position:absolute;
    z-index:100;
    right:10px;
    bottom:14px;
    font-size:22px;
    color:red;
`;

const ErrorText = styled.p`
    font-size:16px;
    margin-botton:0px;
    color:${Colors.error};
    
;`

const SendButton = styled.button`
    width:20%;
    height:30px;
    background:#1E90FF;
    color:#fff;
    font-weight:bold;
    border-radius:3px;
    line-height:30px;
    cursor:pointer;
    border:none;
    border-radius:3px;
    padding:1px;

    &:focus {
        box-shadow:3px 0px 30px rgba(163,163,163,1);
    }
`;

const MsjWrong =styled.p`
    font-size:15px;
    padding:5px;
    color:${Colors.error};
    background-color:${Colors.fondoMsj}; 
`;

export {Form, Label, Colors , Input, ValidationIconGreen, ValidationIconRed, InputGroup, ErrorText, SendButton, MsjWrong};


  
