import { useState } from "react"
import { Input } from "../components/input"
import { LinkButton } from "../components/linkButton"
import { Primary } from "../components/primary"
import { StyledForm } from "../styles/components/form"
import { StyledLoginDiv } from "../styles/components/loginDiv"
import { useNavigate } from "react-router-dom"
import { loginEmpresa } from "../services/empresa"
import { loginCandidato } from "../services/candidato"

export const LoginPage = ()=>{
    const [isEmpresa,setIsEmpresa] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

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
    const handleLogin = async ()=>{
        if(isEmpresa===true){  
            try{
                const response = await loginEmpresa(email, password);
                if(response.status === 200){
                    sessionStorage.setItem("token",response.data.token);
                    navigate("/candidato")
                }
            }catch(e){
                alert("Ocorreu um erro ao tentar logar, tente novamente mais tarde")
                window.location.reload();
            }
        }else{
            try{
                const response = await loginCandidato(email, password);
                if(response.status === 200){
                    sessionStorage.setItem("token",response.data.token);
                    navigate("/candidato")
                }
            }catch(e){
                alert("Ocorreu um erro ao tentar logar, tente novamente mais tarde")
                window.location.reload();
            }
        }
    }
    return(
        <div style={{display:"flex",backgroundColor:"#282c34", height:"100vh",margin:"0px 0px 0px 0px"}}>
            <StyledLoginDiv margin={"15% 40% 18% 40%"}>
                <StyledForm method="GET">
                    <Input  onChange={(e)=>{setEmail(e.target.value)}} placeholder={"Email"}/>
                    <Input  onChange={(e)=>{setPassword(e.target.value)}} type={"password"} placeholder={"Senha"}/>
                    <Primary onClick={handleLogin} content={"Login"} type={"password"}/>
                </StyledForm>
                <LinkButton onClick={()=>{setIsEmpresa(!isEmpresa)}} content={isEmpresa?"Sou candidato":"Sou empresa"}/>
            </StyledLoginDiv>
        </div>
    )
}