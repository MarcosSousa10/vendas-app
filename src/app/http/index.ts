import axios, {AxiosInstance} from "axios";
export const httpClient:AxiosInstance = axios.create({
    baseURL:"https://supremogas.herokuapp.com/"
})