import { Axios, AxiosResponse } from "axios"
import { httpClient } from "../http"
import { Custo } from "../models/CadastroCusto"
import { Lucro } from "../models/lucro"
const resourceURL: string = "/api/codigoCusto"
export const useLucroService = () => {
    const carregarProduto = async (id: any): Promise<Lucro> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Custo> = await httpClient.get(url);
        return response.data;
    }
    const listar = async (): Promise<Custo[]> => {
        const response: AxiosResponse<Custo[]> = await httpClient.get(resourceURL);
        return response.data;
    }
    return {
        carregarProduto,
        listar
    }
}