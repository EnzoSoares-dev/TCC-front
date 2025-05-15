import { config } from "./config";

const empresa = config();

export const loginEmpresa = (email, senha)=>{
    return empresa.get(`/empresa/login/${email}/${senha}`)
}
export const registerEmpresa = (postEmpresa)=>{        
    return empresa.post("/empresa",postEmpresa);
}
export const getEmpresa = async (idEmpresa,headerToken)=>{
        const response = await empresa.get(`/empresa/${idEmpresa}`,{headers:{authorization:`Bearer ${headerToken}`}});
    return response.data
}