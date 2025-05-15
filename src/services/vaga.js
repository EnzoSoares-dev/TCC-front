import { config } from "./config";

const Vaga = config();

export const getVagaByEmpresa = async (idEmpresa,headerToken)=>{
    const response = await Vaga.get(`/empresa/vagas/${idEmpresa}`,{headers:{authorization:`Bearer ${headerToken}`}});
    const vagaSeparaData = [[],[]];
    if(Array.isArray(response.data)){
        response.data.forEach((vaga,index)=>{
            const hojeUTC = new Date()
            if(new Date(vaga.dataFinal)<hojeUTC.setUTCHours(0, 0, 0, 0)){
                vagaSeparaData[1].push(vaga)
            }else{
                vagaSeparaData[0].push(vaga)
            }
        })
    }
    return vagaSeparaData;
}

export const getVagaById = async (idVaga,headerToken)=>{
    const response = await Vaga.get(`/vaga/${idVaga}`,{headers:{authorization:`Bearer ${headerToken}`}})
    const newDataInicio = trataDataVaga(response.data.dataInicio)
    const newDataFinal = trataDataVaga(response.data.dataFinal)
    const newResponse = {...response.data,dataFinal:newDataFinal, dataInicio:newDataInicio}
    if(response.data.etapas.length>0){
        response.data.etapas.forEach((etapa,index)=>{
            const newDataInicio = trataDataVaga(etapa.dataInicio)
            const newDataFinal = trataDataVaga(etapa.dataFinal)
            response.data.etapas[index] = {...etapa,dataFinal:newDataFinal, dataInicio:newDataInicio}
        })
    }
    return newResponse
}

export const getVagaByname = async (vaga,headerToken)=>{
    const response = await Vaga.get(`/vaga/nome/${JSON.stringify(vaga)}`,{headers:{authorization:`Bearer ${headerToken}`}});
    const newVagas = []
    response.data.forEach((vaga)=>{
        const hojeUTC = new Date();
        if (new Date(vaga.dataFinal) < hojeUTC.setUTCHours(0, 0, 0, 0)) {
            newVagas.push(vaga);
        }
    })
    return response;
}

export const postVaga = async (idEmpresa, vaga,headerToken)=>{
    const response = await Vaga.post(`/empresa/${idEmpresa}/vaga`,vaga,{headers:{authorization:`Bearer ${headerToken}`}});
    return response;
}

export const putCandidatura = async (idCandidato,idVaga,nomeCandidato, headerToken)=>{
    const response = Vaga.put(`/candidato/${idCandidato}/${idVaga}/candidatar`,nomeCandidato, {headers:{authorization:`Bearer ${headerToken}`}});
    return response;
}

const trataDataVaga = (dataVaga)=>{
    const arrayDate = dataVaga.split("-");
    return `${arrayDate[2][0]+arrayDate[2][1]}/${arrayDate[1]}/${arrayDate[0]}`
}