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

import { Button } from "primereact/button";
import { Produto } from "../../app/models/produtos";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/components/dialog/Dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}
const formScheme: Venda = {
    cliente: null!,
    itens: [],
    total: 0,
    formaPagamento: ''
}
export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit,
}) => {
    const clienteService = useClienteService();
    const produtoService = useProdutoService();
    const [listaProdutos, setListaProdutos] = useState<Produto[]>([])
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
        initialValues: formScheme
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
    const disableAddProdutoButton = () => {
        return !produto || !quantidadeProduto
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="cliente">Cliente: *</label>
                    <AutoComplete value={formik.values.cliente}
                        onChange={handleClienteChange} field="nome" suggestions={listaClientes.content}
                        completeMethod={handleClienteAutoComplete} id="cliente" name="cliente" />
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
                            <AutoComplete value={produto} field="nome" />
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
                        <DataTable value={formik.values.itens} >
                            <Column field="produto.id" header="Código" />
                            <Column field="produto.sku" header="SKU" />
                            <Column field="produto.nome" header="Produto" />
                            <Column field="produto.preco" header="Preço Unitário" />
                            <Column field="quantidade" header="QTD" />
                            <Column header="Total" body={(iv: ItemVenda) => {
                                return (
                                    <div>
                                        {iv.produto?.preco! * iv.quantidade!}
                                    </div>
                                )
                            }} />
                        </DataTable>
                    </div>
                </div>
                <Button type="submit" label="Finalizar" />
            </div>
            <Dialog header="Atenção!"
                position="top" visible={!!mensagem}
                onHide={handleFecharProdutoNaoEncontrado}
                footer={dialogMensagemFooter}>
                    {mensagem}
              
            </Dialog> 
          
          
        </form>
    )
}