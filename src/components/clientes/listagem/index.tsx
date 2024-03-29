import { Cliente } from '../../../app/models/clientes'
import Layout from '../../layout'
import { Input, InputCPF, InputTelefone } from '../../common/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Page } from '../../../app/models/common'
import { useClienteService } from '../../../app/services/cliente.service'
import Router from 'next/router'

interface ConsultaClientesForm {
    nome?: string;
    telefone?: string;
}

export const ListagemClientes: React.FC = () => {

    const service = useClienteService();
    const [loading, setLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 5,
        totalElements: 0
    });

    const handleSubmit = (filtro: ConsultaClientesForm) => {
        handlePage(null!);
    }

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: '', telefone: '' }
    })

    const handlePage = (event: DataTablePageParams) => {
        setLoading(true)
        service.find(filtro.nome, filtro.telefone, event?.page, event?.rows)
            .then(result => {
                setClientes({ ...result, first: event?.first })
            }).finally(() => setLoading(false))
    }

    const deletar = (cliente: Cliente) => {
        service.deletar(cliente.id).then(result => {
            handlePage(null!)
        })
    }

    const actionTemplate = (registro: Cliente) => {
        const url = `/cadastros/clientes?id=${registro.id}`
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
        <Layout titulo="Clientes">
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
                        <Input label="Telefone" id="telefone" className='form-control'
                            columnClasses="is-half"
                            onChange={handleChange}
                            name="telefone" value={filtro.telefone} />


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
                
                    <DataTable value={clientes.content}
                        totalRecords={clientes.totalElements}
                        lazy paginator
                        first={clientes.first}
                        rows={clientes.size}
                        onPage={handlePage}
                        loading={loading}
                        emptyMessage="Nenhum registro."
                    >
                        <Column field="id" header="Código" />
                        <Column field="nome" header="Nome" />
                        <Column field="telefone" header="Telefone" />
                        <Column field="email" header="Email" />
                        <Column body={actionTemplate} />
                    </DataTable>
                
            </div>
            </div>
        </Layout>
    )
}