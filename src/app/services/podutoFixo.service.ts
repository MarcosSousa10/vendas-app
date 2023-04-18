import { Axios, AxiosResponse } from "axios"
import { httpClient } from "../http"
import { ProdutoFixo } from "../models/produtoFixo"
const resourceURL: string = "/api/produtofixo"
export const useProdutoServiceFixo = () => {
    const salvar = async (produto: ProdutoFixo): Promise<ProdutoFixo> => {
        console.log();//aqui o produto esta normal
        const response: AxiosResponse<ProdutoFixo> = await httpClient.post<ProdutoFixo>(resourceURL, produto)
        console.log(response.data);//aqui esta null
        return response.data;

    }
    const atualizar = async (produto: ProdutoFixo): Promise<void> => {
        const url: string = `${resourceURL}/${produto.id}`
        await httpClient.put<ProdutoFixo>(url, produto)
    }
    const carregarProduto = async (id: any): Promise<ProdutoFixo> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<ProdutoFixo> = await httpClient.get(url);
        return response.data;
    }
    const deletar = async (id: any): Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }
    const listar = async (): Promise<ProdutoFixo[]> => {
        const response: AxiosResponse<ProdutoFixo[]> = await httpClient.get(resourceURL);
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