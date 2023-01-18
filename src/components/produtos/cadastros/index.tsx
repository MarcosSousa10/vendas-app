import Layout from "../../layout";
import { useState } from "react";

export const CadastroProdutos:React.FC = ()=>{
    const [sku, setSku]= useState('');
    const [preco, setPreco]= useState('');
    const [nome, setNome]= useState('');
    const [descricao, setDescricao]= useState('');

    const submit = ()=>{
         const Produto = {
            sku,
            preco,
            nome,
            descricao
        }
        console.log(Produto);
    }
    return(
        <Layout titulo="Cadastros de Produtos" >
            <div className="columns"> 
            <div className="field is-half column">
                <label className="label" htmlFor="inputSKU">SKU *</label>
                <div className="control">
                    <input value={sku}  onChange={event => setSku(event.target.value)} className="input" placeholder="Digite o SKU do produto" type="text" id="inputSKU" />
                </div>
            </div>

            <div className="field is-half column">
                <label className="label" htmlFor="inputPreco">Preço *</label>
                <div className="control">
                    <input value={preco} onChange={event => setPreco(event.target.value)} className="input" placeholder="Digite o Preço do produto" type="text" name="" id="inputPreco" />
                </div>
            </div>
            </div>
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputNome">Nome *</label>
                <div className="control">
                    <input value={nome} onChange={event => setNome(event.target.value)} className="input" placeholder="Digite o Nome do produto" type="text" name="" id="inputNome" />
                </div>
            </div>
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