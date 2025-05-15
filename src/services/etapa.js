import { config } from "./config";

const Etapa = config();

export const postEtapa = async (idVaga, etapas, headerToken) => {
    const response = await Etapa.put(`/empresa/etapa/${idVaga}`, etapas, { headers: { authorization: `Bearer ${headerToken}` } });
    return response;
}

export const postRespostaQuestao = async (idCandidato, idEtapa, respostas, headerToken) =>{
    const response = await Etapa.post(`candidato/${idCandidato}/etapa/${idEtapa}/resultado`,respostas, { headers: { authorization: `Bearer ${headerToken}` } });
    return response;
}

export const getResultadoEtapa = async (idCandidato, idEtapa, headerToken) =>{
    const response = await Etapa.get(`candidato/${idCandidato}/etapa/${idEtapa}/resultado`, { headers: { authorization: `Bearer ${headerToken}` } });
    return response;
}