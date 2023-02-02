import { Venda } from "../../app/models/vendas";
import Layout from "../layout";
import { VendasForm } from "./form";
import { useVendaService } from "../../app/services/vendas.service";
import { useState } from "react";
import { Alert } from "../common/message";

export const Vendas: React.FC = () => {
    const service = useVendaService();
    const [messages,setMessages]=useState<Alert[]>([])
    const [vendaRealizada,setVendaRealizada]=useState<boolean>(false)
    const handleSubmit = (venda: Venda) => {
        service.realizarVenda(venda).then((response:any) => {
          setMessages([{texto:"Vendas Realizadas Com Sucesso!",
        tipo:"seccess",}])  
        setVendaRealizada(true);
        }).catch((error:any) =>{
            console.log(error);
            setMessages([{
                texto:"Ocorreu um erro, Entre em Contato com a Administração",
                tipo:"danger",
            }])
        })
    }
    const handleNovaVenda=()=>{
        setVendaRealizada(false);

    }
    return (
        <Layout titulo="Venda" mensagem={messages}>

            <VendasForm onSubmit={handleSubmit} onNovaVenda={handleNovaVenda} vendaRealizada={vendaRealizada} />
        </Layout>
    )
}