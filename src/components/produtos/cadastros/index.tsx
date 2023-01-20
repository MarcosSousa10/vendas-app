import Layout from "../../layout";
import { Input } from "../../common/input";
import { useState } from "react";
import { useProdutoService } from "../../../app/services/produto.service";
import { Produto } from "../../../app/models/produtos";
import { converterEmBigDecimal } from "../../../app/util/money";
import { Alert } from "../../common/message";
export const CadastroProdutos:React.FC = ()=>{
    const service = useProdutoService();
    const [sku, setSku]= useState<string>('');
    const [preco, setPreco]= useState<string>('');
    const [nome, setNome]= useState<string>('');
    const [descricao, setDescricao]= useState<string>('');
    const [id, setId]=useState<string>();
    const [cadastro, setCadastro]=useState<string>();
    const [messages, setMessages]=useState<Array<Alert>>([])
        const submit = ()=>{
         const produto:Produto = {
            id,
            sku:sku,
            preco: converterEmBigDecimal(preco),
            nome:nome,
            descricao:descricao
        }
        if(id){
        service.atualizar(produto)
        .then(Response=>setMessages([{
            tipo:"success", texto:"Produto Atualizado com sucesso"
        }]))
        }else{
          service
       .salvar(produto)
       .then(produtoResposta => {
        setId(produtoResposta.id)
        setCadastro(produtoResposta.cadastro)
        setMessages([{
            tipo:"success", texto:"Produto Salvo com sucesso"
        }])
       })  
        }
       
    }
    return(
        <Layout titulo="Cadastros de Produtos" mensagem={messages}>
            
            {id &&
            <div className="columns"> 
            <Input label="Codigo: *"
                columnClasses="is-half"                
                value={id}
                id="inputSKU"
                disabled={true}
               
            />
            <Input label="Data Cadastro: *"
                columnClasses="is-half"                
                value={cadastro}
                id="inputPreco"
                disabled
            />
            </div>}
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
                currency
                maxLength={10}
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
                    <button className="button" onClick={submit}>
                        { id?"Atualizar":"Salvar"}</button>
                </div>
                <div className="control is-link">
                    <button className="button">Voltar</button>
                </div>
            </div>
            
        </Layout>
    )
}