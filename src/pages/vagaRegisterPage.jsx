import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { Input } from "../components/input"
import { Primary } from "../components/primary"
import { Secondary } from "../components/secondary"
import { StyledLoginDiv } from "../styles/components/loginDiv"
import { postVaga } from "../services/vaga";
import { useNavigate } from "react-router-dom"

export const VagaRegisterPage = ()=>{
    const navigate = useNavigate();
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));
    const [vaga, setVaga] = useState("")
    const [vagaDescricao, setVagaDescricao] = useState("")
    const [salario, setSalario] = useState("")
    const [dataInicio, setDataInicio] = useState("")
    const [dataFinal, setDataFinal] = useState("")

    const handleCreateVaga = async ()=>{
        const newDatainicio = new Date(dataInicio+ "T00:00:00.000Z");
        const newDataFinal = new Date(dataFinal + "T00:00:00.000Z");
        const vagaObject = {
            nome: vaga,
            descricao: vagaDescricao,
            salario: salario,
            dataInicio: newDatainicio,
            dataFinal: newDataFinal
        }
        try{
            const response = await postVaga(token.id,vagaObject,sessionStorage.getItem("token"));
            if(response.status === 200){
                navigate(`/vaga/aberta/${response.data.id}`)
            }
        }catch(e){

        }
        
    }

    
    return(
        <div>
            <StyledLoginDiv margin={"5% 35% 5% 35%"}>
                <div>
                    <h1>Nova vaga</h1>
                    <h4>Nome da vaga</h4>
                    <Input type="text" placeholder={"Ex: Desenvolvedor de software júnior"} onChange={(e)=>{setVaga(e.target.value)}}/>
                    <h4>Descrição da vaga</h4>
                    <textarea placeholder="Descreva sobre a função da vaga" style={{height:"30px", width:"200px"}} onChange={(e)=>{setVagaDescricao(e.target.value)}}></textarea>
                    <h4>Previsão de Salário</h4>
                    <Input placeholder={"Valor aproximado ao previsto"} type="number" onChange={(e)=>{setSalario(e.target.value)}}/>
                    <h3>Datas</h3>
                    <div style={{display:"flex"}}>
                        <div>
                            <h4>Inicio</h4>
                            <Input type={"date"} onChange={(e)=>{setDataInicio(e.target.value)}}/>
                        </div>
                        <div>
                        <h4>Final</h4>
                        <Input type={"date"}  onChange={(e)=>{setDataFinal(e.target.value)}}/>
                        </div>
                    </div>
                    <br/>
                    <div style={{display:"flex", gap:"65px"}}>
                        <Secondary content={"Cancelar"}/>
                        <Primary content={"Criar"} onClick={()=>{handleCreateVaga()}}/>
                    </div>
                </div>
            </StyledLoginDiv>
        </div>
    )
}