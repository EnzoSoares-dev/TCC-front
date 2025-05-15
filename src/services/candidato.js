import { config } from "./config";

const candidato = config();

export const loginCandidato = (email,senha)=>{
    return candidato.get(`/candidato/login/${email}/${senha}`);
}
export const registerCandidato = (postCandidato)=>{
    return candidato.post("/candidato",postCandidato);
}
export const getCandidato = (id,token)=>{
    return candidato.get(`/candidato/${id}`,{headers:{authorization:`Bearer ${token}`}})
}

export const updateCandidato = (id,postCandidato,token)=>{
    return candidato.put(`/candidato/${id}`,postCandidato,{headers:{authorization:`Bearer ${token}`}})
}
export const getVagaByCandidato = (id,headerToken)=>{
    return candidato.get(`/candidato/vagas/${id}`,{headers:{authorization:`Bearer ${headerToken}`}})
}