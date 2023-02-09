import { AxiosResponse } from "axios";
import { Vendedor } from "../models/vendedor";
import { httpClient } from "../http";
import { Page } from "../models/common";





const urlvendedor:string ="/api/vendedor";
export const useVendedorService=()=>{
    const salvar = async (vendedor: Vendedor): Promise<Vendedor> =>{
        const response: AxiosResponse<Vendedor>= await httpClient.post<Vendedor> (urlvendedor, vendedor);
        console.log(response.data)
        return response.data;
        
    }
const carregarVendedor = async(id:any):Promise <Vendedor>=>{
    const url:string=`${urlvendedor}/${id}`
    const response: AxiosResponse<Vendedor> =await httpClient.get(url);
    return response.data;
}
const deletar= async (id:any):Promise<void>=>{
    const url:string=`${urlvendedor}/${id}`
    await httpClient.delete(url)
}
const find = async (
    nome :string='',
    cpf: string = '',
    page:number=0,
    size:number=5):Promise<Page<Vendedor>>=>{
        const url =`${urlvendedor}?nome${nome}&cpf=${cpf}&page=${page}&size=${size}` 
        const response: AxiosResponse<Page<Vendedor>> = await httpClient.get(url);
        return response.data;
    }
    

return{
salvar,
carregarVendedor,
deletar,
find
}

}