import { Primary } from "./primary";
import { putCandidatura } from "../services/vaga";
import { useNavigate } from "react-router-dom";

export const Modal = ({id, vaga, idCandidato, nomeCandidato, idVaga}) => {
    const modalOpen = document.getElementById("modalOpen");
    const navigate = useNavigate()

    const trataData = (data)=>{
        const arrayDate = data.split("-");
        return `${arrayDate[2][0]+arrayDate[2][1]}/${arrayDate[1]}/${arrayDate[0]}`
    }
    const renderDatas = ()=>{
        return Object.keys(vaga).length === 0
            ?<></>
            :<div>
                <h4>Inicio das etapas: {trataData(vaga.dataInicio)}</h4>
                <h4>Final do processo: {trataData(vaga.dataFinal)}</h4>
            </div>
    }

    const handleSubmitCandidatura = async ()=>{
        try{
            const response = await putCandidatura( idCandidato,idVaga, nomeCandidato, sessionStorage.getItem("token"))
            if(response.status === 200){
                alert("Candidatura realizada com sucesso")
                navigate("/candidato")
            }
        }catch(e){
            console.log("Erro ao se candidatar")
        }

    }

    return(
        <dialog id={id} style={{width:"50%", height:"50%", borderRadius:"10px", padding:"20px", backgroundColor:"#F5F5F5F5"}}>
            <button style={{marginRight:"60%"}} onClick={()=>{modalOpen.close()}}>X</button>
            <div>
                <h1>{idVaga}</h1>
                <h1>{vaga.nomeEmpresa}</h1>
                <h1>{vaga.nome}</h1>
                <h2>{vaga.descricao}</h2>
                <h3>Salário: {vaga.salario}</h3>
                <hr></hr>
                {renderDatas()}
                <Primary onClick={()=>{handleSubmitCandidatura()}} content={"Candidatar-se"}/>
            </div>
        </dialog>
    )
}