import React from 'react';
import { StyledLoginDiv } from '../styles/components/loginDiv';
import { Primary } from '../components/primary';
import { postQuestao } from '../services/questao';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Secondary } from '../components/secondary';

const Question = ({ index,setValor, valor }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValor = [...valor];
        newValor[index][name] =  value
        setValor(newValor);
    };

    const handleRespostaChange = (position, target, isCerta) => {
        const { value } = target;
        const newValor = [...valor];
        const newRespostas = [...newValor[index].opcoes];
        newRespostas[position] = { resposta: value, certa: isCerta };
        newValor[index].opcoes = newRespostas;
        setValor(newValor);
    };
    const handleCorretasChange = (position, resposta, isCerta) => {
        const newValor = [...valor];
        const newRespostas = [...newValor[index].opcoes];
        newRespostas[position] = { resposta: resposta, certa: isCerta };
        newValor[index].opcoes = newRespostas;
        setValor(newValor);
    }

    return (
        <div key={0} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor="titulo">Título:</label>
            <input
                onChange={handleInputChange}
                type="text"
                id="titulo"
                name="titulo"
                required
            />
            <label htmlFor="descricao">Enunciado:</label>
            <textarea
                id="descricao"
                name="enunciado"
                required
                onChange={handleInputChange}
            ></textarea>
            {valor[index].opcoes.map((resposta, position) => (                
                <div key={"key-"+position} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label htmlFor={`resposta${position + 1}`}>Opção {position + 1}:</label>
                    <input
                        type="text"
                        id={`resposta${position + 1}`}
                        name={`resposta${position + 1}`}
                        required
                        onChange={(e) =>
                            handleRespostaChange(position, e.target, false)
                        }
                    />
                    <input
                        type="radio"
                        id={`correta${position + 1}`}
                        name="respostaCorreta"
                        onChange={() => handleCorretasChange(position, resposta.resposta, true)}
                    />
                    <label htmlFor={`correta${position + 1}`}>Correta</label>
                </div>
            ))}
        </div>
    );
};

export const QuestaoRegisterPage = () => {
    const navigate = useNavigate();
    const { idEtapa } = useParams();
    const questoes = JSON.parse(localStorage.getItem("questoes"));
    const auxiliarQuestion = {
        titulo: "",
        enunciado: "",
        opcoes: Array(5).fill({ resposta: "", certa: false }),
    }
    const [valor, setValor] = React.useState([auxiliarQuestion]);

    const adicionarInput = () => {
        setValor([...valor, auxiliarQuestion]); // Adiciona uma string vazia ao array
      };

    const handleQuestao = async ()=>{
        const questaoObject = {questoes: questoes.concat(valor)}
        const response = await postQuestao(idEtapa,questaoObject, sessionStorage.getItem("token"));
        if (response.status === 200) {
            console.log("Questões cadastradas com sucesso!");
            navigate(-1)
        } else {
            console.error("Erro ao cadastrar questões:", response.statusText);
        }
    }

    React.useEffect(() => {
        const lastForm = document.querySelector('form > div:last-of-type');
        if (lastForm) {
            lastForm.scrollIntoView({ behavior: 'smooth' });
        }
    }, [valor.length]);
    
    return (
        <StyledLoginDiv style={{ marginLeft: "30%", marginTop: "5%", marginRight: "30%" }}>
            <h1>Cadastro de Questão</h1>
            <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {valor.map((item, index) => (
                    <Question index={index} setValor={setValor} valor={valor} key={index} />
                ))}
                <Secondary
                    onClick={() => {
                        adicionarInput()
                    }}
                    content={"Adicionar questão"}
                >
                </Secondary>
            </form>
            <Primary onClick={handleQuestao} content={"Cadastrar"} />
        </StyledLoginDiv>
    );
};
