import styled from 'styled-components';

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
    display:flexinline
    background:green;
`;


const Input = styled.input`
    width:160%;
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

const InputUser = styled.input`
    width:105%;
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

const Icon=styled.p`  
    width:10%;
    height:45px;
    line-height:45px;  
    font-size:20px;
    margin:45px 0px 0 150px;
    top:20px
`;

const IconUser=styled.p`  
    width:1%;
    height:0px;
    line-height:0px;  
    font-size:20px;
    margin:25px 0px 0px 150px;
    top:20px
`;


const ErrorText = styled.p`
    font-size:16px;
    margin:0px;
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

export {Form, Label, Colors , Input,InputUser, Icon,IconUser,InputGroup, ErrorText, SendButton, MsjWrong};


  
