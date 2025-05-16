import { StyledLoginDiv } from "../styles/components/loginDiv";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Secondary } from "../components/secondary";
import { Primary } from "../components/primary";
import { jwtDecode } from "jwt-decode";
import { updateCandidato } from "../services/candidato";

const Idioma = ({ index, setValor, valor }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValor = [...valor];
        newValor[index][name] =  value
        setValor(newValor);
    };
    return(
        <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%"}}>
            <div style={{display:"flex", gap:"10px"}}>
                        <div>
                            <h2>Idioma</h2>
                            <select name="nome" id="nome" onChange={handleInputChange} required>
                                <option selected disabled value={""}>Selecione o idioma</option>
                                <option value="português">Português</option>
                                <option value="inglês">Inglês</option>
                                <option value="espanhol">Espanhol</option>
                            </select>
                        </div>
                    <div>
                        <h2>Proeficiencia</h2>
                        <select name="fluencia" id="fluencia" onChange={handleInputChange} required>
                            <option selected disabled value={""}>Selecione o nível de proficiência</option>
                            <option value="básico">Básico</option>
                            <option value="intermediário">Intermediário</option>
                            <option value="avancado">Avançado</option>
                            <option value="fluente">Fluente</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

const Experiencia = ({ index, setValor, valor }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValor = [...valor];
        newValor[index][name] =  value
        setValor(newValor);
    };
    return(
        <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%"}}>
                <div style={{display:"flex", gap:"10px"}}>
                    <div>
                        <h2>Empresa</h2>
                        <input type="text" name="empresa" id="empresa" placeholder="Nome da empresa" required onChange={handleInputChange}/>
                    </div>
                    <div>
                        <h2>Cargo</h2>
                        <input type="text" name="cargo" id="cargo" placeholder="Cargo" onChange={handleInputChange} required/>
                    </div>
                    <div>
                        <h2>Descrição</h2>
                        <textarea name="descricao" id="descricao" placeholder="Descrição da experiência" required onChange={handleInputChange}></textarea>
                    </div>
                    <div>
                        <h2>Data de Início</h2>
                        <input type="date" name="data_inicio" id="data_inicio" required onChange={handleInputChange}/>
                    </div>
                    <div>
                        <h2>Data de Fim</h2>
                        <input type="date" name="data_final" id="data_final" required onChange={handleInputChange}/>
                    </div>
                </div>
        </div>
    )
}

const Certificado = ({ index, setValor, valor }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValor = [...valor];
        newValor[index][name] =  value
        setValor(newValor);
    };
    return(
        <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%"}}>
            <div style={{display:"flex", gap:"10px", marginBottom:"10px"}}>
                    <div>
                        <h2>Nome</h2>
                        <input type="text" name="nome" id="nomeCertificado" placeholder="Nome do certificado" onChange={handleInputChange} required/>
                    </div>
                <div>
                    <h2>Descrição</h2>
                    <textarea type="text" name="descricao" id="descricao" placeholder="descrição" onChange={handleInputChange} required/>
                </div>
                <div>
                    <h2>Data de Emissão</h2>
                    <input type="date" name="data_emissao" id="dataEmissao" onChange={handleInputChange} required/>
                </div>
            </div>
        </div>
    )
}

export const CurriculoRegisterPage = () => {
    const idiomaAux = {
        nome:"",
        fluencia:""
    }
    const experienciaAux = {
        empresa:"",
        cargo:"",
        descricao:"",
        data_inicio:"",
        data_final:""
    }
    const certificadoAux = {
        nome:"",
        descricao:"",
        data_emissao:""
    }

    const navigate = useNavigate()
    const [idiomas, setIdiomas] = useState([ idiomaAux ])
    const [experiencias, setExperiencias] = useState([ experienciaAux ])
    const [certificados, setCertificados] = useState([ certificadoAux ])
    const token = jwtDecode(JSON.stringify(sessionStorage.getItem("token")));

    const adicionarInput = (state,setState,aux) => {
        setState([...state, aux])
    }

    const handleSendCurriculo = async () => {
        const curriculo = {
            curriculo:{
                idiomas: idiomas,
                experiencias: experiencias,
                certificados: certificados
            }
        }

        try{
            const response = await updateCandidato(token.id,curriculo,sessionStorage.getItem("token"));
            if(response.status === 200){
                console.log("Curriculo atualizado com sucesso")
                navigate(-1)
            }
        }catch(e){}
    }

    useEffect(() => {
        const lastForm = document.querySelector('form > div:last-of-type');
        if (lastForm) {
            lastForm.scrollIntoView({ behavior: 'smooth' });
        }
    }, [idiomas, experiencias, certificados]);

    return (
        <div>
            <h1>Cadastro de Curriculo</h1>
            <StyledLoginDiv style={{marginLeft: "10%", marginTop: "5%", marginRight: "10%"}}>
                <form style={{ display: "flex", flexDirection: "column", gap: "10%", width: "100%",backgroundColor:"#F5F5F5F5"}}>
                    <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%"}}>
                        <h1>Idiomas</h1> 
                    </div>
                    {idiomas.map((idioma, index) => (
                        <Idioma key={index} index={index} setValor={setIdiomas} valor={idiomas}/>
                    ))}
                    <Secondary style={{ marginRight:"45%",marginTop:"15px", marginBottom:"15px"}} onClick={() => {adicionarInput(idiomas,setIdiomas,idiomaAux)}} content={"Novo idioma"}/>
                    <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%"}}>
                        <h1>Experiencias</h1>
                    </div>
                    {experiencias.map((experiencia, index) => (
                        <Experiencia key={index} index={index} setValor={setExperiencias} valor={experiencias}/>
                    ))}
                    <Secondary style={{ marginRight:"45%",marginTop:"15px", marginBottom:"15px"}} onClick={() => {adicionarInput(experiencias,setExperiencias,experienciaAux)}} content={"Nova experiência"}/>
                    <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%"}}>
                        <h1>Certificados</h1>
                    </div>
                    {certificados.map((certificado, index) => (
                        <Certificado key={index} index={index} setValor={setCertificados} valor={certificados}/>
                    ))}
                    <Secondary style={{ marginRight:"45%",marginTop:"15px", marginBottom:"15px"}} onClick={() => {adicionarInput(certificados,setCertificados,certificadoAux)}} content={"Novo certificado"}/>
                </form>
                <Primary style={{ marginRight:"45%",marginTop:"15px", marginBottom:"15px"}} onClick={() => {handleSendCurriculo()}} content={"Cadastrar"}/>
            </StyledLoginDiv>

        </div>
    );
}