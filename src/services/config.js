import axios from "axios";

export const config = ()=>{
    return axios.create({
        baseURL:"https://tcc-api-94yj.onrender.com",
        timeout: 10000,
    });
}