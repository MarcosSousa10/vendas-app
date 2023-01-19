import Layout from "../../layout";
import { Input } from "../../common/input";
import { useState } from "react";
import { useProdutoService } from "../../../app/services/produto.service";
import { Produto } from "../../../app/models/produtos";

export const CadastroProdutos:React.FC = ()=>{
    const service = useProdutoService();
    const [sku, setSku]= useState('');
    const [preco, setPreco]= useState('');
    const [nome, setNome]= useState('');
    const [descricao, setDescricao]= useState('');

    const submit = ()=>{
         const produto:Produto = {
            descricao:descricao,
            nome:nome,
            preco: parseFloat(preco),
            sku:sku ,            
            
        }
        console.log(produto);
       service.salvar(produto)//.then(produtoResposta=> console.log(produtoResposta))
    }
    return(
        <Layout titulo="Cadastros de Produtos" >
            <div className="columns"> 
            <Input label="SKU: *"
                columnClasses="is-half"
                onChange={setSku}
                value={sku}
                id="inputSKU"
                placeholder="Digite o SKU do produto"
            />
            <Input label="Preço: *"
                columnClasses="is-half"
                onChange={setPreco}
                value={preco}
                id="inputPreco"
                placeholder="Digite o Preço do produto"
            />
            </div>
            <div className="columns">
            <Input label="Nome: *"
                columnClasses="is-full"
                onChange={setNome}
                value={nome}
                id="inputNome"
                placeholder="Digite o Nome do produto"
            />
            </div>
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputDesc">Descrição *</label>
                <div className="control">
                    <textarea value={descricao} onChange={event => setDescricao(event.target.value)} className="textarea" placeholder="Digite o SKU do produto" id="inputDesc" />
                </div>
            </div>
            </div>

            
            <div className="field is-grouped ">
                <div className="control is-link">
                    <button className="button" onClick={submit}>Salvar</button>
                </div>
                <div className="control is-link">
                    <button className="button">Voltar</button>
                </div>
            </div>
            
        </Layout>
    )
}