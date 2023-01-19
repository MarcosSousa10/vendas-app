import { AxiosResponse } from "axios"
import { Produto } from "../models/produtos"
import { httpClient } from "../http"
const resourceURL: string ="/api/produtos"
export const useProdutoService=()=>{
   const salvar = async (produto: Produto) : Promise<Produto>=>{
    console.log(produto);//aqui o produto esta normal
    const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceURL, produto)
    console.log(response.data);//aqui esta null
    return response.data;
    
   }
    return {
        salvar
    }
}