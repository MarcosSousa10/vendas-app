import Layout from "../../layout";
import { useState } from "react";
import { Cliente } from "../../../app/models/clientes";
import { ClienteForm } from "./form";
import { useClienteService } from "../../../app/services/cliente.service";
export const CadastroCliente: React.FC = () => {
    const [cliente, setCliente] = useState<Cliente>({});
    const service = useClienteService();
    const handleSubmit = (cliente: Cliente) => {
        if(cliente.id){
            service.atualizar(cliente).then(Response=>{
                console.log("Atualizado!;")
            })}else{
                service.salvar(cliente).then(clienteSalvo=>{
                    setCliente(clienteSalvo)
                console.log(clienteSalvo)})
            }
        }
    
    return (
        <Layout titulo="Clientes">
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </Layout>

    )
}