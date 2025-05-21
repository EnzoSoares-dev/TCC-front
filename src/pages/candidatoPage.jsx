import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidato, getVagaByCandidato } from "../services/candidato";
import { Primary } from "../components/primary";

export const CandidatoPage = () => {
    const [candidato, setCandidato] = useState({});
    const [vagas,setVagas]=useState([]);
    const navigate = useNavigate();
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    useEffect(() => {
        const fetchCandidato = async () => {
            try {
                const response = await getCandidato(token.id, sessionStorage.getItem("token"));
                if (!response.data || Object.values(response.data.curriculo).some(value => Array.isArray(value) && value.length === 0)) {
                    console.warn("Seu curriculo não está completo. Preencha-o para se inscrever nas vagas.");
                    navigate("/candidato/cadastro");
                }
                setCandidato(response.data)
            } catch (error) {
                console.error("Erro ao buscar candidato:", error);
                navigate("/login")
            }
        };
        fetchCandidato();
    }, [token.id, navigate]);

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const response = await getVagaByCandidato(token.id, sessionStorage.getItem("token"));
                setVagas(response.data)
            } catch (error) {
                console.error("Erro ao buscar vagas:", error);
            }
        };
        fetchVagas();
    }, [token.id, navigate]);




    const trataData = (data)=>{
        const arrayDate = data.split("-");
        return `${arrayDate[2][0]+arrayDate[2][1]}/${arrayDate[1]}/${arrayDate[0]}`
    }

    return (
        <div>
            <div style={{marginLeft:"12%", marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5"}}>
                <h1>Informações do Candidato</h1>
                <h2>Nome: {candidato.nome}</h2>
                <h2>Email: {candidato.email}</h2>
            </div>
            <div style={{display:"flex", marginLeft:"12%", marginRight:"2%", justifyContent:"space-between"}}>
                <div style={{marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5", paddingRight:"5%", paddingLeft:"5%"}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h1>Curriculo</h1>
                        <Primary styles={{marginTop:"5%"}} onClick={()=>{navigate("/candidato/cadastro")}} content={"Editar"}/>
                    </div>
                    <h2>Idiomas</h2>
                    {candidato.curriculo && candidato.curriculo.idiomas && candidato.curriculo.idiomas.map((idioma, index) => (
                        <div key={index} style={{display:"flex", flexDirection:"column"}}>
                            <h3>Idioma: {idioma.nome}</h3>
                            <h3>Fluência: {idioma.fluencia}</h3>
                            <div style={{border:0,height:"1px",backgroundColor:"#CCC"}}></div>
                        </div>
                    ))}
                    <h2>Experiências</h2>
                    {candidato.curriculo && candidato.curriculo.experiencias && candidato.curriculo.experiencias.map((experiencia, index) => (
                        <div key={index} style={{display:"flex", flexDirection:"column"}}>
                            <h3>Empresa: {experiencia.empresa}</h3>
                            <h3>Cargo: {experiencia.cargo}</h3>
                            <h3>Descrição: {experiencia.descricao}</h3>
                            <h3>Data de Início: {trataData(experiencia.data_inicio)}</h3>
                            <h3>Data Final: {trataData(experiencia.data_final)}</h3>
                            <div style={{border:0,height:"1px",backgroundColor:"#CCC"}}></div>
                        </div>
                    ))}
                    <h2>Formação</h2>
                    {candidato.curriculo && candidato.curriculo.certificados.map((certificado, index) => (
                        <div key={index} style={{display:"flex", flexDirection:"column"}}>
                            <h3>Nome: {certificado.nome}</h3>
                            <h3>Descrição: {certificado.descricao}</h3>
                            <h3>Data de Conclusão: {trataData(certificado.data_emissao)}</h3>
                            <div style={{border:0,height:"1px",backgroundColor:"#CCC"}}></div>
                        </div>
                    ))}
                </div>
                <div style={{display:"flex", marginTop:"5%", marginRight:"12%", backgroundColor:"#F5F5F5F5", paddingRight:"5%", paddingLeft:"5%"}}>
                    {vagas.length >0
                    ?<div>
                        <div>
                            <h1>Vagas inscritas</h1>
                            {vagas && vagas.map((vaga, index) => {
                                return(
                                <div key={index}>
                                    <h1 style={{cursor:"pointer"}} onClick={()=>{vaga.dataFinal<= new Date().toISOString()?alert("Vaga Finalizada"): navigate(`/vaga/${token.id}/${vaga._id}`)}}>{vaga.nome}</h1>
                                </div>                                
                                )})}
                        </div>

                        <div>
                            <h1>Etapa</h1>
                            {vagas && vagas.map((vaga, index) => (
                                <div key={index} style={{marginLeft:"90%"}}>
                                    {vaga.candidatos && vaga.candidatos.map((candidato, index) => {
                                        if(candidato.idCandidato !== token.id){
                                            return <></>
                                        }
                                        return <h1>{candidato.etapaVigente}</h1>
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    :<h1 style={{marginLeft:"40%"}}>Você não está inscrito em nenhuma vaga</h1>
                    }
                </div>
            </div>
        </div>

    );
}