import { AxiosResponse } from "axios"
import { Produto } from "../models/produtos"
import { httpClient } from "../http"
const resourceURL: string ="/api/produtos"
export const useProdutoService=()=>{
   const salvar = async (produto: Produto) : Promise<Produto>=>{
    console.log();//aqui o produto esta normal
    const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceURL, produto)
    console.log(response.data);//aqui esta null
    return response.data;
    
   }
   const atualizar = async (produto: Produto) : Promise<void> =>{
    const url: string=`${resourceURL}/${produto.id}`
    await httpClient.put<Produto>(url, produto)
   }

    return {
        salvar,
        atualizar
    }
}