import { Venda } from "../../app/models/vendas";
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
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}
const formScheme: Venda = {
    cliente: null,
    produtos: [],
    total: 0,
    formaPagamento: ''
}
export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit,
}) => {
    const clienteService = useClienteService();
    const [codigoProduto, setCodigoProduto] = useState<string>('');
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
        console.log(codigoProduto)
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
                            <AutoComplete />
                        </span>
                    </div>
                    <div className="p-col-2">
                    <span className="p-float-label">
                            <InputText id="qtdProduto" value={codigoProduto} />
                            <label htmlFor="qtdProduto">QTD</label>
                        </span>
                    </div>
                    <div className="p-col-2">
                        <Button label="adicionar"/>
                    </div>
                    </div>
                    
                    


                <Button type="submit" label="Finalizar" />
            </div>
        </form>
    )
}