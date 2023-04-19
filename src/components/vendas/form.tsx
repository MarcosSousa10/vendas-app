import { ItemVenda, Venda } from "../../app/models/vendas";
import { useFormik } from "formik";
import {
    AutoComplete,
    AutoCompleteChangeParams,
    AutoCompleteCompleteMethodParams
} from 'primereact/autocomplete';
import { useState } from "react";
import { Page } from "../../app/models/common";
import { Cliente } from "../../app/models/clientes";
import { useClienteService } from "../../app/services/cliente.service";
import { useProdutoService } from "../../app/services/produto.service";
import { Dropdown } from 'primereact/dropdown'
import { Button } from "primereact/button";
import { Produto } from "../../app/models/produtos";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { number } from "yup";
import { FormatUtils } from "@4us-dev/utils";
import { validationSchema } from "./validationSchema";
import axios from "axios";

const formatadorMoney = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
})

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
    onNovaVenda: () => void;
    vendaRealizada: boolean;
}
const formScheme: Venda = {
    cliente: null!,
    itens: [],
    total: 0,
    formaPagamento: ''
}
export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit,
    onNovaVenda,
    vendaRealizada
}) => {
    const clienteService = useClienteService();
    const produtoService = useProdutoService();
    const [listaProdutos, setListaProdutos] = useState<Produto[]>([])
    const [listaFiltradaProdutos, setListaFiltradaProdutos] = useState<Produto[]>([])
    const formaPagamento: String[] = ["DINHEIRO", "CARTAO"]
    const [mensagem, setMensagem] = useState<string>('')
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0)
    const [codigoProduto, setCodigoProduto] = useState<string>('');
    const [produto, setProduto] = useState<Produto>(null!);
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        size: 0,
        totalElements: 0
    })
    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formScheme,
        validationSchema
    })
    const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query;
        clienteService.find(nome, '', 0, 20)
            .then(cliente => setListaClientes(cliente))
    }
    const handleClienteChange = (e: AutoCompleteChangeParams) => {
        const clienteSelecionado: Cliente = e.value;
        formik.setFieldValue("cliente", clienteSelecionado)
    }

    const handleCodigoProdutoSelect = (event: any) => {
        if (codigoProduto) {
            produtoService.carregarProduto(codigoProduto)
                .then(produtoEncontrado => setProduto(produtoEncontrado))
                .catch(error => {
                    setMensagem("Produto não Encontrado!")
                })
        }

    }
    const handleAddProduto = () => {
        const itensAdicionados = formik.values.itens;
        const JaExistemOItemNaVenda = itensAdicionados?.some((iv: ItemVenda) => {
            return iv.produto?.id === produto.id
        })
        if (JaExistemOItemNaVenda) {
            itensAdicionados?.forEach((iv: ItemVenda) => {
                if (iv.produto?.id === produto.id) {
                    iv.quantidade = iv.quantidade! + quantidadeProduto
                }
            })
        } else {
            itensAdicionados?.push({
                produto: produto,
                quantidade: quantidadeProduto
            });
        }

        setProduto(null!);
        setCodigoProduto('');
        setQuantidadeProduto(0);
        const total = totalVenda();
        formik.setFieldValue("total", total)
    }
    const dialogMensagemFooter = () => {
        return (
            
            <div>
                <Button label="Ok" onClick={handleFecharProdutoNaoEncontrado} />
            </div>
        )
    }
    const handleFecharProdutoNaoEncontrado = () => {
        setMensagem('')
        setCodigoProduto('')
        setQuantidadeProduto(0);
    }
    const handleProdutoAutoComplete = async (e: AutoCompleteCompleteMethodParams) => {
        const nomeProduto = e.query;
        if (!listaProdutos.length) {
            const produtosEncontrados = await produtoService.listar();
            setListaProdutos(produtosEncontrados);
        }
        const produtosEncontrados = listaProdutos.filter((produto: Produto) => {
            return produto.nome?.toUpperCase().includes(e.query.toUpperCase()
            )
        }
        );
        setListaFiltradaProdutos(produtosEncontrados)
    }
    const disableAddProdutoButton = () => {
        return !produto || !quantidadeProduto
    }
  
    const totalVenda = () => {
        const totais:any = formik.values.itens?.map(iv => iv.quantidade * iv.produto?.preco);
        if (totais?.length) {
            return totais.reduce((somatoriaAtual = 0, valorItemAtual:number) => somatoriaAtual + valorItemAtual);
        } else {
            return 0;
        }
    }

    const realizarNovaVenda = () => {
        onNovaVenda();
        formik.resetForm();
        formik.setFieldValue("itens", [])
        formik.setFieldTouched("itens", false)
    }
    return (
        <div className="container">
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="cliente">Cliente: *</label>
                    <AutoComplete value={formik.values.cliente}
                        onChange={handleClienteChange} field="nome" suggestions={listaClientes.content}
                        completeMethod={handleClienteAutoComplete} id="cliente" name="cliente" />
                    <small className="p-error p-d-block"> {formik.errors.cliente}</small>
                </div>
                <div className="p-grid">
                    <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText onBlur={handleCodigoProdutoSelect} id="codigoProduto" value={codigoProduto} onChange={e => setCodigoProduto(e.target.value)} />
                            <label htmlFor="codigoProduto">Codigo</label>
                        </span>
                    </div>
                    <div className="p-col-6">
                        <span className="p-float-label">
                            <AutoComplete value={produto} completeMethod={handleProdutoAutoComplete} id="produto" name="produto"
                                onChange={e => setProduto(e.value)} suggestions={listaFiltradaProdutos} field="nome" />
                        </span>
                    </div>
                    <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText id="qtdProduto" value={quantidadeProduto}
                                onChange={e => setQuantidadeProduto(parseInt(e.target.value))} />
                            <label htmlFor="qtdProduto">QTD</label>
                        </span>
                    </div>
                    <div className="p-col-2">
                        <Button label="adicionar"
                            disabled={disableAddProdutoButton()} type="button" onClick={handleAddProduto} />
                    </div>
                    <div className="p-col-12">
                        <DataTable  value={formik.values.itens} emptyMessage="Nenhum Produto Adicionando">
                            <Column body={(item: ItemVenda) => {
                                const handleRemoverItem = () => {
                                    const novaLista = formik.values.itens?.filter(iv => iv.produto?.id !== item.produto?.id)
                                    formik.setFieldValue("itens", novaLista)
                                }
                                return (
                                    <Button label="Excluir" type="button" onClick={handleRemoverItem} />
                                )
                            }} />
                            <Column field="produto.id" header="Código" />
                            <Column field="produto.sku" header="SKU" />
                            <Column field="produto.nome" header="Produto" />
                            <Column field="produto.preco" header="Preço Unitário" />
                            <Column field="quantidade" header="QTD" />
                            <Column header="Total" body={(iv: ItemVenda) => {
                                const total = iv.produto?.preco! * iv.quantidade!
                                const totalFormatado = formatadorMoney.format(total)
                                return (
                                    <div>
                                        {totalFormatado}
                                    </div>
                                )
                            }} />
                        </DataTable>
                        <small className="p-error p-d-block"> {formik.touched && formik.errors.itens}</small>

                    </div>

                    <div className="p-col-5">
                        <div className="p-field">
                            <label htmlFor="formaPagamento">Forma de pagamento: *</label>
                            <Dropdown id="formaPagamento" options={formaPagamento} value={formik.values.formaPagamento} onChange={e => formik.setFieldValue("formaPagamento", e.value)}
                                placeholder="Selecione..." />
                            <small className="p-error p-d-block"> {formik.touched && formik.errors.formaPagamento}</small>

                        </div>
                    </div>
                    <div className="p-col-2">
                        <div className="p-field">
                            <label htmlFor="itens">Itens: </label>
                            <InputText disabled value={formik.values.itens?.length} />
                        </div>
                    </div>
                    <div className="p-col-2">
                        <div className="p-field">
                            <label htmlFor="total">Total: </label>
                            <InputText disabled value={formatadorMoney.format(formik.values.total)} />
                        </div>
                    </div>
                </div>
                {!vendaRealizada &&
                    <Button type="submit" label="Finalizar" />
                }
                {
                    vendaRealizada &&
                    <Button type="button" onClick={realizarNovaVenda} label="Nova Venda" className="p-button-success" />
                }

            </div>
            <Dialog header="Atenção!"
                position="top" visible={!!mensagem}
                onHide={handleFecharProdutoNaoEncontrado}
                footer={dialogMensagemFooter}>
                {mensagem}

            </Dialog>


        </form>
        </div>
    )
}