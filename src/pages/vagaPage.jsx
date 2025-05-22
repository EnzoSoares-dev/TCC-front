import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVagaById } from "../services/vaga";
import { Primary } from "../components/primary";

export const VagaPage = ()=>{
    const [vaga,setVaga] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
        const fetchVagaById = async ()=>{
            const response = await getVagaById(id,sessionStorage.getItem("token"))
            if(response.etapas.length ===0){
                navigate(`/vaga/${id}/etapa/cadastro`)
            }

            setVaga(response)
        }
        fetchVagaById()
    },[id,navigate])

    return(
        <div>
            <div style={{marginLeft:"12%", marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5"}}>
                <div style={{marginLeft:"50px"}}>
                    <div style={{display:"flex", alignItems:"baseline", gap:"15px"}}>
                        <h1>Cargo exercido:</h1>
                        <h2>{vaga.nome}</h2>
                    </div>
                    <div style={{display:"flex", alignItems:"baseline", gap:"15px"}}>
                        <h1>Salário esperado:</h1>
                        <h2>R$ {vaga.salario},00</h2>
                    </div>
                    <div style={{display:"flex", alignItems:"baseline", gap:"15px"}}>
                        <h1>Data inicio:</h1>
                        <h2>{vaga.dataInicio}</h2>
                        <h1>Data final:</h1>
                        <h2>{vaga.dataFinal}</h2>
                    </div>                
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{marginLeft:"12%", marginTop:"5%", backgroundColor:"#F5F5F5F5", paddingLeft:"40px", paddingRight:"20%"}}>
                    <h1>Candidatos:</h1>
                    {vaga.candidatos.length> 0
                    ?vaga.candidatos && vaga.candidatos.map((candidato,index)=>(
                        <div key={index}>
                            <h2>{candidato.nomeCandidato}</h2>
                            <h2>{candidato.etapaVigente}</h2>
                        </div>
                    ))
                    :<p>Não há candidatos cadastrados</p>
                    }
                </div>
                <div style={{marginLeft:"12%", marginTop:"5%", backgroundColor:"#F5F5F5F5", paddingLeft:"40px", paddingRight:"1%"}}>
                    <div style={{display:"grid", justifyItems:"flex-start", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                        <h1>Etapas:</h1>
                        <Primary styles={{marginTop:"20px",width:"150px", height:"50px"}} content={"Criar Etapa"} onClick={()=>{navigate(`/vaga/${id}/etapa/cadastro`)}}/>
                    </div>
                    {vaga.etapas && vaga.etapas.map((etapa,index)=>(
                        <div key={index} style={{display:"flex",gap:"250px"}}>
                            <h2 onClick={()=>{navigate(`/vaga/${id}/etapa/${etapa._id}`)}} style={{cursor:"pointer"}}>
                                {etapa.descricao.length>20?etapa.descricao.slice(0,20)+"...":etapa.descricao}
                            </h2>
                            <div style={{display:"flex"}}>
                                <h2>Data Final:</h2>
                                <h2>{etapa.dataFinal}</h2>
                            </div>
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    )
}