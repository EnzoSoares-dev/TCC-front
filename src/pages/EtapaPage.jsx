import { useState,useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getVagaById } from "../services/vaga"
import { Primary } from "../components/primary"

export const EtapaPage = () => {
    const {idVaga, idEtapa} = useParams()
    const [etapa,setEtapa] = useState({})
    const navigate = useNavigate()
    localStorage.setItem("questoes", JSON.stringify(etapa.questoes))

    useEffect(()=>{
        const fetchVagaById = async ()=>{
            const response = await getVagaById(idVaga,sessionStorage.getItem("token"))
            response.etapas.forEach((etapa)=>{
                if(etapa._id === idEtapa){
                    setEtapa(etapa)
                }
            })
        }
        fetchVagaById()
    },[idVaga, idEtapa])
    return (
        <div>
            <div style={{marginLeft:"12%", marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5"}}>
                <div style={{marginLeft:"50px"}}>
                    <div style={{display:"flex", alignItems:"baseline", gap:"15px"}}>
                        <h1>Descrição:</h1>
                        <h2>{etapa.descricao}</h2>
                    </div>
                    <div style={{display:"flex", alignItems:"baseline", gap:"15px"}}>
                        <h1>Data inicial:</h1>
                        <h2>{etapa.dataInicio}</h2>
                    </div> 
                    <div style={{display:"flex", alignItems:"baseline", gap:"15px"}}>
                        <h1>Data final:</h1>
                        <h2>{etapa.dataFinal}</h2>
                    </div>                
                </div>
            </div>
            <div style={{marginLeft:"12%", marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5"}}>
                <div style={{ marginLeft: "50px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1>Questões:</h1>
                        <Primary content={"Adicionar questão"} onClick={() => {navigate(`/vaga/${idVaga}/etapa/${idEtapa}/questao/cadastro`)}}/>
                    </div>
                    <ul>
                        {etapa.questoes && etapa.questoes.length > 0 ? (
                            etapa.questoes.map((questao, index) => (
                                <li key={index} style={{ marginBottom: "10px" }}>
                                    <h3>{questao.titulo}</h3>
                                    <p>{questao.descricao}</p>
                                </li>
                            ))
                        ) : (
                            <h3>Não há questões nesta etapa.</h3>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}