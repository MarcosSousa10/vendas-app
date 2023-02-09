import { useRouter } from "next/router";
import { Vendedor } from "../../../app/models/vendedor";
import { useVendaService } from "../../../app/services/vendas.service";
import { useVendedorService } from "../../../app/services/vendedor.service";
import { Alert } from "../../common/message";
import { CadastroVendedor } from "./form"
import {useState, useEffect} from "react";
import Layout from "../../layout";

export const VendedorTela: React.FC =()=>{
    const [vendedor, setVendedor] = useState<Vendedor>({});
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const service = useVendedorService();
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(id){
            service.carregarVendedor(id).then(vendedorEncontrado=>{
                setVendedor(vendedorEncontrado);
            })
        };
    }, [id])
    const handleSubmit = (vendedor: Vendedor) => {
    
                service.salvar(vendedor).then(vendedorSalvo=>{
                    setVendedor(vendedorSalvo)
                    setMessages([{tipo: "success",texto:"Cliente Salvo com sucesso!"}])})
            
        }
    
    return(
        <Layout titulo="Cadastro De Vendedores" mensagem={messages}>
        <CadastroVendedor vendedor={vendedor} onSubmit={handleSubmit}/>
        </Layout>
    )
}