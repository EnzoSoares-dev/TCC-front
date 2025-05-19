import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getEmpresa } from "../services/empresa"
import { getVagaByEmpresa } from "../services/vaga";
import { Primary } from "../components/primary";
export const EmpresaHomePage = ()=>{
    const navigate = useNavigate();
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    const [empresa, setEmpresa]= useState({})
    const [vagas,setVagas] = useState([[],[]])
    useEffect(()=>{
        const fetchEmpresa = async ()=>{
            try{
                const response = await getEmpresa(token.id,sessionStorage.getItem("token"))
                setEmpresa(response)
            }catch(error){
                console.error("Erro ao buscar empresa:", error);
                navigate("/login")
        }
    }
        fetchEmpresa()
    },[token.id,navigate])

    useEffect(()=>{
        const fetchVagaByEmpresa = async () =>{
            const response = await getVagaByEmpresa(token.id,sessionStorage.getItem("token"));
            setVagas(response)
        }
        fetchVagaByEmpresa()
    },[token.id])
    return(
        <div>
            <div style={{marginLeft:"12%", marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5", borderRadius:"2%"}}>
                <h1>Informações da empresa</h1>
                <h2>Nome: {empresa.nome}</h2>
                <h3>Email: {empresa.email}</h3>
            </div>
            <div style={{display:"flex", marginLeft:"12%", marginRight:"12%", justifyContent:"space-between"}}>
                <div style={{backgroundColor:"#F5F5F5F5", padding:"1%"}}>
                    <div style={{display:"grid", justifySelf:"center", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                        <h1>Vagas ativas</h1>
                        <Primary styles={{marginTop:"20px",width:"150px", height:"50px"}} content={"Criar vaga"} onClick={()=>{navigate("/vaga/criar")}}/>
                    </div>
                    {vagas[0].length>0? vagas[0].map((vaga,index)=>{return <h2 style={{cursor:"pointer"}} onClick={()=>{navigate(`/vaga/aberta/${vaga._id}`)}}>{vaga.nome}</h2>}):"Não há vagas"}
                </div>
                <div style={{backgroundColor:"#F5F5F5F5", padding:"1%"}}>
                    <h1>Vagas finalizadas</h1>
                    {vagas[1].length>0? vagas[1].map((vaga,index)=>{return <h2>{vaga.nome}</h2>}):"Não há vagas finalizadas  "}
                </div>
            </div>
        </div>
    )
}