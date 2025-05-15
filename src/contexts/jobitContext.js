import React, { useState } from "react"
import { Outlet } from "react-router-dom"

const JobItContext= React.createContext()

const JobItProvider = (children)=>{
    const [vaga, setVaga] = useState({})

    const value = {
        vaga,
        setVaga
    }

    return(
        <JobItContext.Provider value={value}>
            <Outlet/>
            {children}
        </JobItContext.Provider>
    )
}

export default JobItProvider;