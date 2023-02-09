import { AxiosResponse } from "axios";
import { httpClient } from "../http";
import { Venda } from "../models/vendas";
import { Vendedor } from "../models/vendedor";
import { Page } from "../models/common";
import { Cliente } from "../models/clientes";
const resourceURL = '/api/vendas'
export const useVendaService=()=>{

    const realizarVenda = async (venda: Venda) : Promise<void> => {
        await httpClient.post<Venda>(resourceURL, venda);
    }

    const gerarRelatorioVendas = async (
        idCliente: string = '', 
        dataInicio: string = '', 
        dataFim: string = '') : Promise<Blob> => {
        const url = `${resourceURL}/relatorio-vendas?id=${idCliente}&inicio=${dataInicio}&fim=${dataFim}`
        const response: AxiosResponse = await httpClient.get(url, { responseType: 'blob' } )
        const bytes = response.data       
        return new Blob([bytes], { type: 'application/pdf' } )
    }
    
    return {
        realizarVenda,
        gerarRelatorioVendas
    }
}