import Layout from "../../layout";
import { Input } from "../../common/input";
import { useState } from "react";
import { useEffect } from "react";
import { Produto } from "../../../app/models/produtos";
import { formatReal } from "../../../app/util/money";
import { useRouter } from "next/router";
import { converterEmBigDecimal } from "../../../app/util/money";
import { Alert } from "../../common/message";
import * as yup from 'yup';
import Link from "next/link";
import { InputMoney } from "../../common/input";
import { Custo } from "../../../app/models/CadastroCusto";
import { useCustoService } from "../../../app/services/custo.service";
const validationSchema = yup.object().shape({
    nome: yup.string().trim().required("Campo Obrigatorio"),
    // exige 10 caracterees.length(10, "Deve subir pelo menos 10 caracteres"),
    preco: yup.number().required("Campo Obrigatorio").moreThan(0, "Valor deve ser maior que 0,00 (Zero)")
})
interface FormErros {
    nome?: string;
    preco?: string;
}
export const CadastroCusto: React.FC = () => {
    const service = useCustoService();
    const [preco, setPreco] = useState<string>('');
    const [nome, setNome] = useState<string>('');
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
                setNome(produtoEncontrado.nome || '')
                setPreco(formatReal(`${produtoEncontrado.preco}`) || '')
                setCadastro(produtoEncontrado.cadastro || "")
            })

        }
    }, [queryId])
    const submit = () => {
        const custo: Custo = {
            id,
            preco: converterEmBigDecimal(preco),
            nome: nome,
        }
        validationSchema.validate(custo).then(obj => {
            setErrors({})
            if (id) {
                service.atualizar(custo)
                    .then(Response => setMessages([{
                        tipo: "success", texto: "Produto Atualizado com sucesso"
                    }]))
            } else {
                service
                    .salvar(custo)
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
        <Layout titulo="Cadastros de Custo" mensagem={messages}>

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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end m-2">
                <div className="control is-link">
                    <button className="btn btn-success me-md-2" onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className="control is-link">
                    <Link href={'/consultas/custo'}><button className="btn btn-primary">Voltar</button></Link>
                </div>
            </div>

        </Layout>
    )
}