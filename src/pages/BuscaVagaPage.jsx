import { useState } from 'react'
import { getVagaByname } from '../services/vaga'
import { VagaCard } from '../components/Vagacard'
import { Modal } from '../components/Modal'
import { jwtDecode } from 'jwt-decode'


export const BuscaVagaPage = ()=>{
    const [vagaModal,setVagaModal] = useState({})
    const [vagaId,setVagaId] = useState("")
    const [vagas, setVagas] = useState([])
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    const idCandidato = token.id;

    const fetchVagas = async (vaga)=>{

        const response = await getVagaByname({vaga:vaga},sessionStorage.getItem("token"));
        setVagas(response.data);
    }
    return(
        <div>
            <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"#F5F5F5F5", paddingLeft:"5%", paddingRight:"5%", marginTop:"5%", marginLeft:"5%", marginRight:"5%"}}>
                <h1>Busca de vagas</h1>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", backgroundColor:"#F5F5F5F5", paddingLeft:"5%", paddingRight:"5%", marginTop:"32px", marginLeft:"5%", marginRight:"5%"}}>
                <input onChange={(e)=>{fetchVagas(e.target.value)}} type="text" placeholder="Digite o nome da vaga" style={{width:"80%", height:"40px", border:"1px solid black", marginTop:"32px",marginBottom:"24px"}}/>
                <div>
                    {vagas.map((vaga,index)=>{
                        return (
                            <div>                                
                                <Modal id="modalOpen" vaga={vagaModal} idCandidato={idCandidato} idVaga={vagaId}/>
                                <VagaCard key={index} vaga={vaga} setVagaModal={setVagaModal} setVagaId={setVagaId}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}