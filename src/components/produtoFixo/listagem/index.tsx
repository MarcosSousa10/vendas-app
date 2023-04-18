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
import Button from "react-bootstrap/esm/Button"
import { useEffect } from "react"
import { ProdutoFixo } from "../../../app/models/produtoFixo"
import { useProdutoServiceFixo } from "../../../app/services/podutoFixo.service"
export const ListagemProdutos: React.FC = () => {
    const service = useProdutoServiceFixo();
    const [messages, setMessages] = useState<Array<Alert>>([])

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>
        ('/api/produtofixo', url => httpClient.get(url))
    const [lista, setLista] = useState<ProdutoFixo[]>([])
    useEffect(() => {
        setLista(result?.data || [])
    }, [result])
    const editar = (produto: ProdutoFixo) => {
        const url = `/cadastros/produtoFixo?id=${produto.id}`
        Router.push(url)
    }
    const deletar = (produto: ProdutoFixo) => {
        service.deletar(produto.id).then(response => {
            setMessages([
                { tipo: "success", texto: "Produto excluido com sucesso!" }
            ])
            const listaAlterada: ProdutoFixo[] = lista?.filter(p => p.id != produto.id)
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
        <Layout titulo="Produtos Fixo" mensagem={messages}>
            <br />
            <Link href={'/cadastros/produtoFixo'} className="pt-5 m-5"><Button variant="outline-dark">Novo</Button></Link>
            
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
        </Layout>
        </div>
    )
}