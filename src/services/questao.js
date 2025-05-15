import { config } from "./config";

const Questao = config();

export const postQuestao = async (idEtapa, questao, headerToken) => {
    const response = await Questao.put(`/empresa/vaga/etapa/${idEtapa}/questao`, questao, { headers: { authorization: `Bearer ${headerToken}` } });
    return response;
}