import Layout from "../../layout";
export const CadastroProdutos:React.FC = ()=>{
    return(
        <Layout titulo="Cadastros de Produtos" >
            <div className="columns"> 
            <div className="field is-half column">
                <label className="label" htmlFor="inputSKU">SKU *</label>
                <div className="control">
                    <input  className="input" placeholder="Digite o SKU do produto" type="text" name="" id="inputSKU" />
                </div>
            </div>

            <div className="field is-half column">
                <label className="label" htmlFor="inputPreco">Preço *</label>
                <div className="control">
                    <input  className="input" placeholder="Digite o Preço do produto" type="text" name="" id="inputPreco" />
                </div>
            </div>
            </div>
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputNome">Nome *</label>
                <div className="control">
                    <input  className="input" placeholder="Digite o Nome do produto" type="text" name="" id="inputNome" />
                </div>
            </div>
            </div>
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputDesc">Descrição *</label>
                <div className="control">
                    <textarea  className="textarea" placeholder="Digite o SKU do produto" id="inputDesc" />
                </div>
            </div>
            </div>

            
            <div className="field is-grouped ">
                <div className="control is-link">
                    <button className="button">Salvar</button>
                </div>
                <div className="control is-link">
                    <button className="button">Voltar</button>
                </div>
            </div>
            
        </Layout>
    )
}