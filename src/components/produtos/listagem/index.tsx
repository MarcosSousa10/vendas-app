import Layout from "../../layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import Router from "next/router"
import { Produto } from "../../../app/models/produtos"
import useSWR from 'swr';
import { httpClient } from "../../../app/http";
import { AxiosResponse } from "axios";
import { Loader } from "../../common/loader";
export const ListagemProdutos: React.FC =()=>{
    const {data:result , error}= useSWR<AxiosResponse<Produto[]>>
    ('/api/produtos',url => httpClient.get(url))
    const editar =(produto:Produto)=>{
        const url= `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }
    const deletar =(produto:Produto)=>{
        console.log(produto)
    }
// quando quiser carregar sem aparecer nada
// if(!result){
//     return(
        
//     )
// }
    return (
    <Layout titulo="Produtos">
        <Link href={'/cadastros/produtos'}><button className="button is-warning">Novo</button></Link>
        <br />
        <br />
        <Loader show={!result}/>
        <TabelaProdutos onEdit={editar} onDelete={deletar} produtos ={result?.data || []}  />
    </Layout>
)
}