import styled from 'styled-components';

const Colors ={
    border:'#0075FF',
    error:'hsl(0, 97%, 49%)',
    success:'#1ed12d',
    fondoMsj:"ligthYellow",
    fondoMsjError:"#EDBB99"
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
    padding:10px;
    min-height:40px;
    cursor:pointer;
`;

const Defaultvalue = styled.label`
    display: block;
    font-weight:600;
    padding:10px;
    min-height:40px;
    cursor:pointer;
`;

const InputGroup = styled.div`
    display:flexinline
    background:green;
    position:relative;
    z-index:90;
`;


const Input = styled.input`
    width:160%;
    height:45px;
    line-height:30px;
    background:#fff;
    border-radius:7px;
    padding:0 40px 0 10px;
    transition:.3s ease all;
    border:3px solid transparent;

    &:focus {
        border:3px solid ${Colors.border};
        outline:none;
        box-shadow:3px 0px 30px rgba(163,163,163,0.4);
    }
`;

const InputUser = styled.input`
    display:flex;
    flex-direction:column;
    position:relative;
    width:30rem;
    height:45px;
    line-height:30px;
    background:#fff;
    color:rgb(26, 26, 26);
    border-radius:7px;
    padding:0 40px 0 10px;
    transition:.3s ease all;
    border:3px solid transparent;

    &:focus {
        border:3px solid ${Colors.border};
        outline:none;
        box-shadow:3px 0px 30px rgba(163,163,163,0.4);
    }
`;

const InputUpdate = styled.input`
    width:20rem;
    height:45px;
    line-height:45px;
    background:#fff;
    border-radius:7px;
    color:black;
    padding:0 40px 0 10px;
    transition:.3s ease all;
    position:relative;
    border:3px solid transparent;

    &:focus {
        border:3px solid ${Colors.border};
        outline:none;
        box-shadow:3px 0px 30px rgba(163,163,163,0.4);
    }
`;

const Icon=styled.p`  
    width:9%;
    height:45px;
    line-height:45px;  
    font-size:16px;
    margin:45px 0px 0 150px;
    top:20px;
    right:10px;
    bottom:14px;
    z-index:100;
    position:absolute;

`;

const IconUpdate=styled.p`  
    line-height:45px;  
    font-size:16px;
    margin:45px 0px 0px 0px;
    right:10px;
    bottom:14px;
    z-index:100;
    position:absolute;
`;

const IconUser=styled.p`  
    width:1%;
    height:45px;
    line-height:12px;  
    font-size:16px;
    top:20px;
    right:25px;
    bottom:14px;
    z-index:100;
    position:absolute;
`;

const ErrorText = styled.p`
    font-size:12px;
    margin:auto;
    margin-bottom:0;
    margin-left:100px;
    border-radius:10px;
    width:35rem;
    color:${Colors.error};
;`

const SendButton = styled.button`
    width:20%;
    height:32px;
    line-height:30px;
    background:#1E90FF;
    color:#fff;
    font-weight:bold;
    border-radius:3px;
    cursor:pointer;
    
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

export {Form, Label, Defaultvalue, Colors , Input, InputUser,InputUpdate, Icon, IconUser, IconUpdate, InputGroup, ErrorText, SendButton, MsjWrong};


  
