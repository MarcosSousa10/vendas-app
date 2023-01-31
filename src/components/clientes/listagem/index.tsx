import Layout from "../../layout";
import { Input, InputCPF } from "../../common/input";
import { useFormik } from "formik";
import { Cliente } from "../../../app/models/clientes";
import { useState } from "react";
import {DataTable} from 'primereact/datatable';
import {DataTablePageParams} from 'primereact/datatable';
import { Column } from "primereact/column";
import { Page } from "../../../app/models/common";
interface ConsultaClientesForm{
    nome?:string,
    cpf?:string,
}
export const ListagemClientes: React.FC =()=>{
   // const [clientes, setClientes]= useState<Cliente[]>();
   const [clientes, setClientes]= useState <Page<Cliente>>({
    content:[],
    first:0,
    number:0,
    size:10,
    totalElements:0
   });
    const handleSumit =(filtro: ConsultaClientesForm)=>{
        console.log(filtro)
    }
    const {handleSubmit: formikSubmit,
         values:filtro,
         handleChange
        }= useFormik<ConsultaClientesForm>({
        onSubmit:handleSumit,
        initialValues:{
            nome:'',cpf:''
        }
    })
    const hand
return(
    <Layout titulo="Clientes">

        <form onSubmit={formikSubmit}>
            <div className="columns">
                <Input id='nome' columnClasses="is-half" name='nome' autoComplete="off"  onChange={handleChange}  value={filtro.nome} label="Nome"/>
                <InputCPF id='cpf' columnClasses="is-half" name='cpf' value={filtro.cpf} onChange={handleChange} label="CPF"/>
            </div>
            <div className="field is-grouped">
                <div className="control is-link">
                <button type="submit" className="button is-success" >
                    Consultar
                </button>
                </div>
            </div>

        </form>
        <div className="columns">
            <div className="is-full">
                <DataTable value={clientes}>
                    <Column field="id" header="Código" />
                    <Column field="nome" header="Nome" />
                    <Column field="cpf" header="CPF" />
                    <Column field="email" header="Email" />
                </DataTable>
            </div>

        </div>
    </Layout>
)
}