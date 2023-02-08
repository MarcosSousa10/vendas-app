import { AxiosResponse } from "axios";
import { Vendedor } from "../models/vendedor";
import { httpClient } from "../http";





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
return{
salvar,
carregarVendedor,
deletar
}

}