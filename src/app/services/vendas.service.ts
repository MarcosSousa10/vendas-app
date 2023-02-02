import { httpClient } from "../http";
import { Venda } from "../models/vendas";
const resourceURL = '/api/vendas'
export const useVendaService=()=>{
    const realizarVenda = async (venda: Venda):Promise<void>=>{
        await httpClient.post<Venda>(resourceURL, venda)
    }
    return{
        realizarVenda
    }
}