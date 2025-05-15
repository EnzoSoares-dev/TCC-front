import { StyledLoginDiv } from "../styles/components/loginDiv";
import { StyledForm } from "../styles/components/form";
import { Input } from "../components/input";
import { Primary } from "../components/primary";
import { LinkButton } from "../components/linkButton";
import { useState } from "react";
import { registerEmpresa } from "../services/empresa";
import { useNavigate } from "react-router-dom";
import { registerCandidato } from "../services/candidato";

export const RegisterPage = ()=>{
    const navigate = useNavigate();
    const [isEmpresa,setIsEmpresa] = useState(false);
    const [nome, setNome] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [identification, setIdentification] = useState("");

    const handleEmail = ()=>{
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(email)){
            alert("Email fornecido não atende ao esperado")
        }
    }
    const handlePassword = ()=>{
        const regexPasssword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>/?`~\-]{8,12}$/;
        if(!regexPasssword.test(password)){
            alert("Senha fornecida não atende ao esperado")
        }
    }
    const handleConfirmPassword = ()=>{
        if(confirmPassword !==password){
            alert("As senhas não coincidem")
        }
    }
    const handleIdenfication = ()=>{
        setIdentification(identification.replace(/[^\d]+/g, ''));
        switch(identification.length){
            case 11:
                validateCPF(identification);
                break;
            case 14:
                validateCNPJ(identification)
            default: break;
        }
    }
    const validateCPF = (cpf)=>{
        let sum = 0;
        let rest;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11) rest = 0;

        if (rest !== parseInt(cpf.substring(9, 10))) alert("CPF inválido");

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
    
        rest = (sum * 10) % 11;
        if (rest === 10 || rest === 11) rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11))) alert("CPF inválido");
        
        return true;
    }
    const validateCNPJ = (cnpj)=>{
        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        let digit = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;

        for (let i = size; i >= 1; i--) {
            sum += parseInt(numbers.charAt(size - i)) * pos--;
            if (pos < 2) pos = 9;
        }
    
        let resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (resultado !== parseInt(digit.charAt(0))) alert("CNPJ inválido");

        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;

        for (let i = size; i >= 1; i--) {
            sum += parseInt(numbers.charAt(size - i)) * pos--;
            if (pos < 2) pos = 9;
        }
    
        resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (resultado !== parseInt(digit.charAt(1))) alert("CNPJ inválido");
    
        return true;
    }
    const handleRegister = async()=> {
        let response;
        switch(isEmpresa){
            case true:
                response = await registerEmpresa({nome:nome,email:email,senha:password,cnpj:identification})
                if(response.status === 200){
                    sessionStorage.setItem("token",response.data.token);
                    navigate("/empresa")
                }
                else{alert(response.data.message);}
                break;
            default:
                response = await registerCandidato({nome:nome,email:email,senha:password,cpf:identification});
                response.status === 200? navigate("/candidato") :alert(response.data.message);
                break;
        }
    }

    return(
        <div style={{display:"flex",backgroundColor:"#282c34", height:"100vh",margin:"0px 0px 0px 0px"}}>
            <StyledLoginDiv margin={"13% 40% 15% 40%"}>
            <StyledForm method="post">
                    <Input onChange={(e)=>{setNome(e.target.value)}} placeholder={"Nome"}/>
                    <Input onBlur={handleEmail} onChange={(e)=>{setEmail(e.target.value)}} placeholder={"Email"}/>
                    <Input onBlur={handlePassword} onChange={(e)=>{setPassword(e.target.value)}} type={"password"} placeholder={"Senha"}/>
                    <Input onBlur={handleConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder={"Confirme a senha"}/>
                    <Input onBlur={handleIdenfication} onChange={(e)=>{setIdentification(e.target.value)}} placeholder={`${isEmpresa?"CNPJ":"CPF"}`}/>
                    <Primary onClick={handleRegister} content={"Cadastrar"}/>
            </StyledForm>
            <LinkButton onClick={()=>{setIsEmpresa(!isEmpresa)}} content={isEmpresa?"Sou candidato":"Sou empresa"}/>
            </StyledLoginDiv>
        </div>
    )
}