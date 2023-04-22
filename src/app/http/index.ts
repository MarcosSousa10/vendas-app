import axios, {AxiosInstance} from "axios";
export const httpClient:AxiosInstance = axios.create({
    baseURL:"http://192.168.1.21:8080"
})