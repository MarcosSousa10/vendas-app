import { Axios, AxiosResponse } from "axios"
import { httpClient } from "../http"
import { Custo } from "../models/CadastroCusto"
const resourceURL: string = "/api/Custo"
export const useCustoService = () => {
    const salvar = async (custo: Custo): Promise<Custo> => {
        console.log();//aqui o produto esta normal
        const response: AxiosResponse<Custo> = await httpClient.post<Custo>(resourceURL, custo)
        console.log(response.data);//aqui esta null
        return response.data;

    }
    const atualizar = async (custo: Custo): Promise<void> => {
        const url: string = `${resourceURL}/${custo.id}`
        await httpClient.put<Custo>(url, custo)
    }
    const carregarProduto = async (id: any): Promise<Custo> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Custo> = await httpClient.get(url);
        return response.data;
    }
    const deletar = async (id: any): Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }
    const listar = async (): Promise<Custo[]> => {
        const response: AxiosResponse<Custo[]> = await httpClient.get(resourceURL);
        return response.data;
    }
    return {
        salvar,
        atualizar,
        carregarProduto,
        deletar,
        listar
    }
}