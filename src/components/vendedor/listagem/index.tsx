import { Cliente } from '../../../app/models/clientes'
import Layout from '../../layout'
import { Input, InputCPF } from '../../common/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Page } from '../../../app/models/common'
import { useClienteService } from '../../../app/services/cliente.service'
import Router from 'next/router'
import { Vendedor } from '../../../app/models/vendedor'
import { useVendedorService } from '../../../app/services/vendedor.service'

interface ConsultaVendedorForm {
    nome?: string;
    cpf?: string;
}

export const ListagemVendedores: React.FC = () => {

    const service = useVendedorService();
    const [loading, setLoading] = useState<boolean>(false)
    const [vendedor, setVendedor] = useState<Page<Vendedor>>({
        content: [],
        first: 0,
        number: 0,
        size: 5,
        totalElements: 0
    });

    const handleSubmit = (filtro: Vendedor) => {
        handlePage(null!);
    }

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaVendedorForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: '', cpf: '' }
    })

    const handlePage = (event: DataTablePageParams) => {
        setLoading(true)
        service.find(filtro.nome, filtro.cpf, event?.page, event?.rows)
            .then(result => {
                setVendedor({ ...result, first: event?.first })
            }).finally(() => setLoading(false))
    }

    const deletar = (vendedor: Vendedor) => {
        service.deletar(vendedor.id).then(result => {
            handlePage(null!)
        })
    }

    const actionTemplate = (registro: Vendedor) => {
        const url = `/consulta/vendedor?id=${registro.id}`
        return (
            <div>
                <Button label="Editar"
                    className="p-button-rounded p-button-info"
                    onClick={e => Router.push(url)}
                />
                <Button label="Deletar" onClick={event => {
                    confirmDialog({
                        message: "Confirma a exclusão deste registro?",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        accept: () => deletar(registro),
                        header: "Confirmação"
                    })
                }}
                    className="p-button-rounded p-button-danger" />
            </div>
        )
    }

    return (
        <Layout titulo="Vendedor">
            <form onSubmit={formikSubmit}>
                <div className='row m-2'>
                    <div className="col">
                        <Input label="Nome" id="nome"
                            columnClasses="is-half"
                            className='form-control'
                            autoComplete="off"
                            onChange={handleChange}
                            name="nome"
                            value={filtro.nome} />
                    </div>
                    <div className='col '>
                        <InputCPF label="CPF" id="cpf" className='form-control'
                            columnClasses="is-half"
                            onChange={handleChange}
                            name="cpf" value={filtro.cpf} />


                    </div>
                </div>
                <br />
                <div className='d-grid gap-2 d-md-flex justify-content-md-end m-2'>
                    <div className="control is-link ">
                        <button type="submit" className="btn btn-success me-md-2">
                            Consultar
                        </button>
                    </div>

                    <div className="control is-link">
                        <button type="submit"
                            onClick={e => Router.push("/cadastros/clientes")}
                            className="btn btn-warning">
                            Novo
                        </button>
                    </div>
                </div>

            </form>

            <br />
            <div className='row m-2'>
            <div className="col ">
                
                    <DataTable value={vendedor.content}
                        totalRecords={vendedor.totalElements}
                        lazy paginator
                        first={vendedor.first}
                        rows={vendedor.size}
                        onPage={handlePage}
                        loading={loading}
                        emptyMessage="Nenhum registro."
                    >
                        <Column field="id" header="Código" />
                        <Column field="nome" header="Nome" />
                        <Column field="cpf" header="CPF" />
                        <Column field="email" header="Email" />
                        <Column body={actionTemplate} />
                    </DataTable>
                
            </div>
            </div>
        </Layout>
    )
}