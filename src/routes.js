import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import { EmpresaHomePage } from "./pages/empresaPage";
import { VagaRegisterPage } from "./pages/vagaRegisterPage";
import { VagaPage } from "./pages/vagaPage";
import { EtapaPage } from "./pages/EtapaPage";
import { EtapaRegisterPage } from "./pages/etapaRegisterPage";
import { QuestaoRegisterPage } from "./pages/QuestaoRegisterPage";
import { CandidatoPage } from "./pages/candidatoPage";
import { CurriculoRegisterPage } from "./pages/CurriculoRegisterPage";
import { NavBar } from "./components/NavBar";
import { BuscaVagaPage } from "./pages/BuscaVagaPage";
import { CandidatoVagaPage } from "./pages/CandidatoVagaPage";
import { QuestionPage } from "./pages/QuestionPage";

const HandleNavBar = ({content}) => {
    return(
        <div>
            <NavBar/>
            {content}
        </div>
    )
}

export const routes = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/login", element: <LoginPage />},
    {path: "/register", element: <RegisterPage />},
    {path: "/candidato", element: <HandleNavBar content={<CandidatoPage/>}/>},
    {path: "/candidato/cadastro", element: <HandleNavBar content={<CurriculoRegisterPage/>}/>},
    {path: "/empresa",element:<HandleNavBar content={<EmpresaHomePage/>}/>},
    {path: "/vagas", element:<HandleNavBar content={<BuscaVagaPage/>}/>},
    {path: "/vaga/criar",element:<HandleNavBar content={<VagaRegisterPage/>}/>},
    {path: "/vaga/:idCandidato/:idVaga",element:<HandleNavBar content={<CandidatoVagaPage/>}/>},
    {path: "/vaga/:idVaga/etapa/:idEtapa/questoes",element:<HandleNavBar content={<QuestionPage/>}/>},
    {path: "/vaga/aberta/:id",element:<HandleNavBar content={<VagaPage/>}/>},
    {path: "/vaga/encerrada"},
    {path: "/vaga/:idVaga/etapa/cadastro", element:<HandleNavBar content={<EtapaRegisterPage/>}/>},
    {path: "/vaga/:idVaga/etapa/:idEtapa", element:<HandleNavBar content={<EtapaPage/>}/>},
    {path: "/vaga/:idVaga/etapa/:idEtapa/questao/cadastro", element:<HandleNavBar content={<QuestaoRegisterPage/>}/>},
])