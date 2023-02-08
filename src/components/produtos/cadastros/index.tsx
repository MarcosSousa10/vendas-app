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
import { InputMoney } from "../../common/input";
const validationSchema = yup.object().shape({
    sku: yup.string().trim().required("Campo Obrigatorio"),
    nome: yup.string().trim().required("Campo Obrigatorio"),
    descricao: yup.string().trim()
        .required("Campo Obrigatorio"),

    // exige 10 caracterees.length(10, "Deve subir pelo menos 10 caracteres"),
    preco: yup.number().required("Campo Obrigatorio").moreThan(0, "Valor deve ser maior que 0,00 (Zero)")
})
interface FormErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}
export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();
    const [sku, setSku] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [id, setId] = useState<string>();
    const [cadastro, setCadastro] = useState<string>();
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errosr, setErrors] = useState<FormErros>({})
    const router = useRouter();
    const { id: queryId } = router.query;
    useEffect(() => {
        if (queryId) {
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku || '')
                setNome(produtoEncontrado.nome || '')
                setDescricao(produtoEncontrado.descricao || '')
                setPreco(formatReal(`${produtoEncontrado.preco}`) || '')
                setCadastro(produtoEncontrado.cadastro || "")
            })

        }
    }, [queryId])
    const submit = () => {
        const produto: Produto = {
            id,
            sku: sku,
            preco: converterEmBigDecimal(preco),
            nome: nome,
            descricao: descricao
        }
        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if (id) {
                service.atualizar(produto)
                    .then(Response => setMessages([{
                        tipo: "success", texto: "Produto Atualizado com sucesso"
                    }]))
            } else {
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setCadastro(produtoResposta.cadastro)
                        setMessages([{
                            tipo: "success", texto: "Produto Salvo com sucesso"
                        }])
                    })
            }

        }).catch(err => {
            const fild = err.path;
            const message = err.message;
            setErrors({
                [fild]: message
            })
            setMessages([
                { tipo: "danger", fild, texto: message }
            ])
        })
    }


    return (
        <Layout titulo="Cadastros de Produtos" mensagem={messages}>

            {id &&
            <div className="row m-2">
                <div className="col">
                    <Input label="Codigo: *"
                        columnClasses="is-half"
                        value={id}
                        id="inputSKU"
                        disabled={true}

                    />
                    </div>
                    <div className="col">
                    <Input label="Data Cadastro: *"
                        columnClasses="is-half"
                        value={cadastro}
                        id="inputPreco"
                        disabled
                    />
                </div>
                </div>}
            <div className="row p-2">
            <div className="col">
                <Input label="SKU: *"
                    className="form-control"
                    columnClasses="is-half"
                    onChange={e => setSku(e.target.value)}
                    value={sku}
                    id="inputSKU"
                    placeholder="Digite o SKU do produto"
                    error={errosr.sku}
                />
                </div>
                <div className="col">
                <InputMoney label="Preço: *"
                className="form-control"
                    columnClasses="is-half"
                    onChange={e => setPreco(e.target.value)}
                    value={preco}
                    id="inputPreco"
                    placeholder="Digite o Preço do produto"
                    currency
                    maxLength={10}
                    error={errosr.preco}
                />
            </div>
            </div>
            
            <div className="row col p-2">
                <Input label="Nome: * "
                className="form-control "
                    columnClasses="is-full"
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    error={errosr.nome}
                />
            </div>
            <div className="row col p-2">
                <div className="field column is-full ">
                    <label className="form-check-label " htmlFor="inputDesc">Descrição *</label>
                    <div className="control">
                        <textarea value={descricao} onChange={event => setDescricao(event.target.value)} className="form-control " placeholder="Digite o SKU do produto" id="inputDesc" />
                        {errosr.descricao && <p className="help is-danger">{errosr.descricao}</p>}
                    </div>
                </div>
            </div>


            <div className="d-grid gap-2 d-md-flex justify-content-md-end m-2">
                <div className="control is-link">
                    <button className="btn btn-success me-md-2" onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className="control is-link">
                    <Link href={'/consultas/produtos'}><button className="btn btn-primary">Voltar</button></Link>
                </div>
            </div>

        </Layout>
    )
}