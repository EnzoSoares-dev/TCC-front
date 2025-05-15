import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { getVagaById } from "../services/vaga"
import { jwtDecode } from "jwt-decode";
import { Primary } from "../components/primary";
import { useNavigate } from "react-router-dom";
import { getResultadoEtapa } from "../services/etapa";

export const CandidatoVagaPage = () => {
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    const navigate = useNavigate();
    const [vaga,setVaga] = useState({});
    const [idEtapa,setIdEtapa] = useState([]);
    const [etapa,setEtapa] = useState("");
    const {idVaga} = useParams();

    useEffect(()=>{
        const fetchResultado = async ()=>{
            if(typeof idEtapa === "string"){
                console.log(idEtapa)
                const response = await getResultadoEtapa(token.id,idEtapa,sessionStorage.getItem("token"));
                if(response.status===200){
                    alert(response.data.message);
                    navigate(`/candidato`);
                }
            }
        }
        const fetchVaga = async ()=>{
            const response = await getVagaById(idVaga,sessionStorage.getItem("token"))
            const etapaAtual = response.candidatos && response.candidatos.find((candidato)=>{
                if(candidato.idCandidato===token.id){  
                    return candidato.etapaVigente
                }
            })
            setIdEtapa((response.etapas.find((etapa)=>{ return etapa.posicao === etapaAtual.etapaVigente? etapa.questoes : null}))._id)
            setEtapa(etapaAtual)
            await fetchResultado()
            setVaga(response)

        }
        fetchVaga()
    },[idVaga,token.id,navigate,idEtapa])

    return(
        <div>
            <div style={{marginLeft:"12%", marginTop:"5%", marginRight:"12%",paddingBottom:"1%",paddingLeft:"1%", backgroundColor:"#F5F5F5F5"}}>
                <h1>{vaga.nome}</h1>
                <h2>Descrição: {vaga.descricao}</h2>
                <h3>Sua etapa atual: {etapa.etapaVigente}</h3>
                <Primary onClick={()=>{navigate(`/vaga/${idVaga}/etapa/${idEtapa}/questoes`)}} content={"Realizar questões da etapa"}/>
            </div>            
        </div>

    )
}