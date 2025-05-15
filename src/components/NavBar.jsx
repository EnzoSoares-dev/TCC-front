import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

export const NavBar = ()=>{

    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    const navigate = useNavigate()

    const returnWindowLocation = () => {
        const currentPath = window.location.pathname;
        return currentPath !== `/${token.role}`?navigate(`/${token.role}`):""
    }
    return(
        <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"#F5F5F5F5", paddingLeft:"5%", paddingRight:"5%"}}>
            <h1 onClick={()=>{navigate("/")}}>JobIt</h1>
            <div style={{display:"flex", gap:"20px"}}>
                {token.role==="candidato"?<h2 style={{cursor:"pointer"}} onClick={()=>{navigate("/vagas")}}>Vagas</h2>:<></>}
                <h2 style={{cursor:"pointer"}} onClick={()=>{returnWindowLocation()}} >{token.role === "empresa" ? "Empresa" : "Candidato"}</h2>
                <h2 style={{cursor:"pointer"}} onClick={()=>{sessionStorage.removeItem("token"); navigate("/")}}>Sair</h2>
            </div>
        </div>
    )
}