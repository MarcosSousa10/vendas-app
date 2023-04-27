import axios, {AxiosInstance} from "axios";
export const httpClient:AxiosInstance = axios.create({
    // baseURL:process.env.NEXT_PUBLIC_VENDAS_API
    baseURL:'https://supremogas.herokuapp.com/'
})