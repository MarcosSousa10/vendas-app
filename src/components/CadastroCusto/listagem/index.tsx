import Layout from "../../layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import Router from "next/router"
import useSWR from 'swr';
import { httpClient } from "../../../app/http";
import { AxiosResponse } from "axios";
import { Loader } from "../../common/loader";
import { Alert } from "../../common/message"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import { useEffect } from "react"
import { Custo } from "../../../app/models/CadastroCusto";
import { useCustoService } from "../../../app/services/custo.service";
export const ListagemCusto: React.FC = () => {
    const service = useCustoService();
    const [messages, setMessages] = useState<Array<Alert>>([])

    const { data: result, error } = useSWR<AxiosResponse<Custo[]>>
        ('/api/Custo', url => httpClient.get(url))
    const [lista, setLista] = useState<Custo[]>([])
    useEffect(() => {
        setLista(result?.data || [])
    }, [result])
    const editar = (produto: Custo) => {
        const url = `/cadastros/custo?id=${produto.id}`
        Router.push(url)
    }
    const deletar = (produto: Custo) => {
        service.deletar(produto.id).then(response => {
            setMessages([
                { tipo: "success", texto: "Produto excluido com sucesso!" }
            ])
            const listaAlterada: Custo[] = lista?.filter(p => p.id != produto.id)
            setLista(listaAlterada);
        })
    }
    // quando quiser carregar sem aparecer nada
    // if(!result){
    //     return(

    //     )
    // }
    return (
        <div className="Container">
        <Layout titulo="Custo" mensagem={messages}>
            <br />
            <Link href={'/cadastros/custo'} className="pt-5 m-5"><Button variant="outline-dark">Novo</Button></Link>
            
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
        </Layout>
        </div>
    )
}