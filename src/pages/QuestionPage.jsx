import { useParams } from "react-router-dom"
import {useState,useEffect} from "react"
import { getVagaById } from "../services/vaga"
import { StyledForm } from "../styles/components/form";
import { Primary } from "../components/primary";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {postRespostaQuestao} from "../services/etapa";


export const QuestionPage = () => {
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    const {idVaga, idEtapa} = useParams();
    const [questoes, setQuestoes] = useState([]);
    const [respostas, setRespostas] = useState([]);
    const navigate = useNavigate();

    const handleResposta = (resposta, index) => {
        setRespostas(prevRespostas => {
            // Cria uma cópia do array de respostas
            const novasRespostas = [...prevRespostas];
            // Verifica se já está selecionado (toggle)
            if (novasRespostas[index] === resposta) {
                novasRespostas[index] = ""; // Desmarca
            } else {
                novasRespostas[index] = resposta; // Marca
            }
            
            return novasRespostas;
        });
    };

    const handleSubmit = async () => {
        const response = await postRespostaQuestao(token.id,idEtapa,respostas,sessionStorage.getItem("token"));
        if(response.status===200){
            alert(response.data.message);
            navigate(`/candidato`);
        }
    }

    useEffect(() => {
        const fetchVaga = async () => {
            const response = await getVagaById(idVaga, sessionStorage.getItem("token"));
            response.etapas.forEach((etapa) => {
                if (etapa._id === idEtapa) {
                    if(etapa.questoes.length===0){
                        alert("Essa etapa não possui questões");
                        navigate(-1)
                    }
                    setQuestoes(etapa.questoes);
                    // Inicializa o array de respostas com strings vazias
                    setRespostas(new Array(etapa.questoes.length).fill(""));
                }
            });
        };
        fetchVaga();
    }, [idVaga, idEtapa,navigate]);

    return (
        <div style={{alignContent: "center", justifyItems: "center", marginLeft: "12%", marginTop: "5%", marginRight: "12%", paddingBottom: "1%", paddingLeft: "1%", backgroundColor: "#F5F5F5"}}>
            <StyledForm>
                {questoes.map((questao, index) => {
                    return (
                        <div key={index}>
                            <h2>{questao.titulo}</h2>
                            <h3>{questao.enunciado}</h3>
                            {questao.opcoes.map((alternativa, indice) => {
                                return (
                                    <div key={indice}>
                                        <input 
                                            checked={respostas[index].resposta === alternativa.resposta} 
                                            type="radio" 
                                            name={`questao-${index}`} // Nome único por questão
                                            value={alternativa.resposta} 
                                            onChange={(e) => handleResposta({resposta: e.target.value, certa: alternativa.certa}, index)}
                                        />
                                        <label>{alternativa.resposta}</label>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                
                <Primary content={"Enviar respostas"} onClick={() => {handleSubmit()}}/>
            </StyledForm>
        </div>
    );
};