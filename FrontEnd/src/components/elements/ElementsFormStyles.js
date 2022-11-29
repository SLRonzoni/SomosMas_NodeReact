import styled from 'styled-components';

const Colors ={
    border:'#0075FF',
    error:'hsl(0, 97%, 49%)',
    success:'#1ed12d',
    fondoMsj:"ligthYellow",
    fondoMsjError:"#EDBB99",
    buttonSuccess:"#198754",
    buttonMenu:"#390788",
}

const Form =styled.form`
    display=grid;
    grid-template-columns: 1fr 1frM;
    gap:1.25rem;

    @media (max-with:50rem){
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    display: block;
    padding:0.5rem;
    max-width:6rem;
    min-height:3rem;
    cursor:pointer;
`;

const Defaultvalue = styled.label`
    display: block;
    font-weight:600;
    padding:0.5rem;
    min-height:3rem;
    cursor:pointer;
`;

const InputGroup = styled.div`
    display:flexinline
    background:green;
    position:relative;
    z-index:90;
`;


const Input = styled.input`
    max-width:160%;
    height:2rem;
    line-height:1rem;
    background:#fff;
    border-radius:7px;
    padding:0 2.5rem 0 0.62rem;
    transition:.3s ease all;
    border:0.19rem solid transparent;

    &:focus {
        border:0.19rem solid ${Colors.border};
        outline:none;
        box-shadow:0.19rem 0rem 1.87rem rgba(163,163,163,0.4);
    }
`;

const InputUser = styled.input`
    display:flex;
    flex-direction:column;
    position:relative;
    max-width:28rem;
    height:2rem;
    line-height:1rem;
    background:#fff;
    color:rgb(26, 26, 26);
    border-radius:0.44rem;
    padding:0 2rem 0 0.62rem;
    transition:.3s ease all;
    border:3px solid transparent;

    &:focus {
        border:0.12rem solid ${Colors.border};
        outline:none;
        box-shadow:0.12rem 0rem 1.2rem rgba(163,163,163,0.4);
    }
`;

const InputUpdate = styled.input`
    max-width:20rem;
    height:2rem;
    line-height:1rem;
    background:#fff;
    border-radius:0.43rem;
    color:black;
    padding:0 2.5rem 0 0.62rem;
    transition:.3s ease all;
    position:relative;
    border:0.18rem solid transparent;

    &:focus {
        border:0.18rem solid ${Colors.border};
        outline:none;
        box-shadow:0.18rem 0rem 1.87rem rgba(163,163,163,0.4);
    }
`;

const Icon=styled.p`  
    max-width:9%;
    height:2.81rem;
    line-height:2.81rem;  
    font-size:1rem;
    margin:2.81rem 0rem 0 9.37rem;
    top:1.25rem;
    right:0.62rem;
    bottom:0.87rem;
    z-index:100;
    position:absolute;
`;

const IconUpdate=styled.p`  
    line-height:2.81rem;  
    font-size:1rem;
    margin:2.81rem 0rem 0rem 0rem;
    right:0.62rem;
    bottom:0.87rem;
    z-index:100;
    position:absolute;
`;

const IconUser=styled.p`  
    max-width:1%;
    height:2.81rem;
    line-height:0.75rem;  
    font-size:1rem;
    top:0.7rem;
    right:1.56rem;
    bottom:0.87rem;
    z-index:100;
    position:absolute;
`;

const ErrorText = styled.p`
    font-size:0.75rem;
    margin:auto;
    margin-bottom:0;
    margin-left:0rem;
    //margin-left:6.25rem;
    border-radius:0.62rem;
    width:20rem;
    padding:0 0 0 0.5rem;
    //width:35rem;
  
    color:${Colors.error};
;`

const SendButton = styled.button`
    width:20%;
    height:1.87rem;
    line-height:1.87rem;
    background:#198754;
    color:#fff;
    font-weight:bold;
    border-radius:0.19rem;
    cursor:pointer;
    border-radius:0.44rem;
    padding:0.07rem;

    &:focus {
       background-color: #249924;
    }
`;

const MsjWrong =styled.p`
    font-size:0.94rem;
    padding:0.31rem;
    color:${Colors.error};
    background-color:${Colors.fondoMsj}; 
`;

export {Form, Label, Defaultvalue, Colors , Input, InputUser,InputUpdate, Icon, IconUser, 
        IconUpdate, InputGroup, ErrorText, SendButton, MsjWrong};


  
