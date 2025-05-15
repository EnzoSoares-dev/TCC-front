import axios from "axios";

export const config = ()=>{
    return axios.create({
        baseURL:"http://localhost:9000",
        timeout: 10000,
    });
}