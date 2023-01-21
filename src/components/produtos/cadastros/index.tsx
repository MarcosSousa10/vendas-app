import Layout from "../../layout";
import { Input } from "../../common/input";
import { useState } from "react";
import { useEffect } from "react";
import { useProdutoService } from "../../../app/services/produto.service";
import { Produto } from "../../../app/models/produtos";
import { formatReal } from "../../../app/util/money";
import { useRouter } from "next/router";
import { converterEmBigDecimal } from "../../../app/util/money";
import { Alert } from "../../common/message";
import * as yup from 'yup';
import Link from "next/link";
import { setMaxListeners } from "events";
const validationSchema = yup.object().shape({
    sku: yup.string().trim().required("Campo Obrigatorio"),
    nome: yup.string().trim().required("Campo Obrigatorio"),
    descricao: yup.string().trim()
    .required("Campo Obrigatorio"),

    // exige 10 caracterees.length(10, "Deve subir pelo menos 10 caracteres"),
    preco: yup.number().required("Campo Obrigatorio").moreThan(0,"Valor deve ser maior que 0,00 (Zero)")
})
interface FormErros{
    sku?:string;
    nome?:string;
    preco?:string;
    descricao?:string;
}
export const CadastroProdutos:React.FC = ()=>{
    const service = useProdutoService();
    const [sku, setSku]= useState<string>('');
    const [preco, setPreco]= useState<string>('');
    const [nome, setNome]= useState<string>('');
    const [descricao, setDescricao]= useState<string>('');
    const [id, setId]=useState<string>();
    const [cadastro, setCadastro]=useState<string>();
    const [messages, setMessages]=useState<Array<Alert>>([])
    const [errosr,setErrors]=useState<FormErros>({})
    const router= useRouter();
    const {id:queryId}= router.query;
    useEffect(()=>{
            if(queryId){
                 service.carregarProduto(queryId).then(produtoEncontrado=>{
        setId(produtoEncontrado.id)
        setSku(produtoEncontrado.sku||"")
        setNome(produtoEncontrado.nome||"")
        setDescricao(produtoEncontrado.descricao||"")
        setPreco(formatReal(`${produtoEncontrado.preco}`)||"")
        setCadastro(produtoEncontrado.cadastro|| "")
            })
       
    }}, [queryId])
        const submit = ()=>{
         const produto:Produto = {
            id,
            sku:sku,
            preco: converterEmBigDecimal(preco),
            nome:nome,
            descricao:descricao
        }
        validationSchema.validate(produto).then(obj=>{
            setErrors({})
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
           
        }).catch(err=>{
            const fild = err.path;
            const message= err.message;
            setErrors({
                [fild]:message
            })
            setMessages([
                {tipo:"danger", fild, texto:message}
            ])
        })
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
                error={errosr.sku}
            />
            <Input label="Preço: *"
                columnClasses="is-half"
                onChange={setPreco}
                value={preco}
                id="inputPreco"
                placeholder="Digite o Preço do produto"
                currency
                maxLength={10}
                error={errosr.preco}
            />
            </div>
            <div className="columns">
            <Input label="Nome: *"
                columnClasses="is-full"
                onChange={setNome}
                value={nome}
                id="inputNome"
                placeholder="Digite o Nome do produto"
                error={errosr.nome}
            />
            </div>
            <div className="columns">
            <div className="field column is-full">
                <label className="label" htmlFor="inputDesc">Descrição *</label>
                <div className="control">
                    <textarea  value={descricao} onChange={event => setDescricao(event.target.value)} className="textarea" placeholder="Digite o SKU do produto" id="inputDesc" />
                {errosr.descricao&&<p className="help is-danger">{errosr.descricao}</p>}
                </div>
            </div>
            </div>

            
            <div className="field is-grouped ">
                <div className="control is-link">
                    <button className="button" onClick={submit}>
                        { id?"Atualizar":"Salvar"}</button>
                </div>
                <div className="control is-link">
                    <Link href={'/consultas/produtos'}><button className="button">Voltar</button></Link>
                </div>
            </div>
            
        </Layout>
    )
}