import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/input";
import { Primary } from "../components/primary";
import { Secondary } from "../components/secondary";
import { StyledLoginDiv } from "../styles/components/loginDiv";
import { postEtapa } from "../services/etapa";

export const EtapaRegisterPage = () => {
    const navigate = useNavigate();
    const {idVaga} = useParams();
    const [etapaDescricao, setEtapaDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    const handleCreateEtapa = async () => {
        const newDataInicio = new Date(dataInicio + "T00:00:00.000Z");
        const newDataFinal = new Date(dataFinal + "T00:00:00.000Z");
        const etapaObject = {
            descricao: etapaDescricao,
            dataInicio: newDataInicio,
            dataFinal: newDataFinal,
        };
            const response = await postEtapa(idVaga, etapaObject, sessionStorage.getItem("token"));
            if (response.status === 200) {
                navigate(`/vaga/aberta/${idVaga}`);
            }
    };

    return (
        <div>
            <StyledLoginDiv margin={"5% 35% 5% 35%"}>
                <div>
                    <h1>Nova etapa</h1>
                    <h4>Descrição da etapa</h4>
                    <textarea placeholder="Descreva o que será executado na etapa" style={{ height: "30px" }} onChange={(e) => { setEtapaDescricao(e.target.value) }}></textarea>
                    <h3>Datas</h3>
                    <div style={{ display: "flex" }}>
                        <div>
                            <h4>Inicio</h4>
                            <Input type={"date"} onChange={(e) => { setDataInicio(e.target.value) }} />
                        </div>
                        <div>
                            <h4>Final</h4>
                            <Input type={"date"} onChange={(e) => { setDataFinal(e.target.value) }} />
                        </div>
                    </div>
                    <br/>
                    <div style={{gap:"20px",display:"flex"}}>
                        <Primary onClick={()=>{handleCreateEtapa()}} content={"Criar Etapa"}/>
                        <Secondary onClick={() => navigate(`/vaga/aberta/${idVaga}`)} content={"Voltar"}/>
                    </div>
                </div>
            </StyledLoginDiv>
        </div>
    );
}