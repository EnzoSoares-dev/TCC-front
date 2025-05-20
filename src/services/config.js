import axios from "axios";

export const config = ()=>{
    return axios.create({
        baseURL:"https://tcc-api-red.vercel.app/",
        timeout: 10000,
    });
}