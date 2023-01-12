import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
export const RouteApp = ()=>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}