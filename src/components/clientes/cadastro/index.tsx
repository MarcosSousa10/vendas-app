import Layout from "../../layout";
import { useState } from "react";
import { Cliente } from "../../../app/models/clientes";
import { ClienteForm } from "./form";
import { useClienteService } from "../../../app/services/cliente.service";
import { Alert } from "../../common/message";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const CadastroCliente: React.FC = () => {
    const [cliente, setCliente] = useState<Cliente>({});
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const service = useClienteService();
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(id){
            service.carregarCliente(id).then(clienteEncontrado=>{
                setCliente(clienteEncontrado);
            })
        };
    }, [id])
    const handleSubmit = (cliente: Cliente) => {
        if(cliente.id){
            service.atualizar(cliente).then(Response=>{
                setMessages([{tipo: "success",texto:"Cliente atualizado com sucesso!"}]);
            })}else{
                service.salvar(cliente).then(clienteSalvo=>{
                    setCliente(clienteSalvo)
                    setMessages([{tipo: "success",texto:"Cliente Salvo com sucesso!"}])})
            }
        }
    
    return (
        <Layout titulo="Clientes" mensagem={messages}>
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </Layout>

    )
}