import Layout from "../../layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import Router from "next/router"
import { Produto } from "../../../app/models/produtos"
import useSWR from 'swr';
import { httpClient } from "../../../app/http";
import { AxiosResponse } from "axios";
import { Loader } from "../../common/loader";
import { useProdutoService } from "../../../app/services/produto.service"
import { Alert } from "../../common/message"
import { useState } from "react"
import { useEffect } from "react"
export const ListagemProdutos: React.FC = () => {
    const service = useProdutoService();
    const [messages, setMessages] = useState<Array<Alert>>([])

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
        ('/api/produtos', url => httpClient.get(url))
    const [lista, setLista] = useState<Produto[]>([])
    useEffect(() => {
        setLista(result?.data || [])
    }, [result])
    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }
    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(response => {
            setMessages([
                { tipo: "success", texto: "Produto excluido com sucesso!" }
            ])
            const listaAlterada: Produto[] = lista?.filter(p => p.id != produto.id)
            setLista(listaAlterada);
        })
    }
    // quando quiser carregar sem aparecer nada
    // if(!result){
    //     return(

    //     )
    // }
    return (
        <Layout titulo="Produtos" mensagem={messages}>
            <Link href={'/cadastros/produtos'}><button className="button is-warning">Novo</button></Link>
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
        </Layout>
    )
}