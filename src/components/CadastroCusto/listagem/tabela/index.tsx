
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import  Router  from "next/router";
import { Cliente } from "../../../../app/models/clientes";
import { confirmDialog } from "primereact/confirmdialog";
import { Custo } from "../../../../app/models/CadastroCusto";
interface TabelaProdutosProps{
    produtos:Array<Custo>;
    onEdit:(produto:any)=>void;
    onDelete:(produto:any)=>void;
}
export const TabelaProdutos:React.FC<TabelaProdutosProps> = ({
    produtos,
    onEdit,
    onDelete
})=>{
    const actionTemplate = (registro: Custo) => {
        const url = `/cadastros/custo?id=${registro.id}`
        return (
            <div>
                <Button label="Editar" 
                        className="p-button-rounded p-button-info"
                     //   onClick={e => Router.push(url) }
                        onClick={e => onEdit(registro) }
                        />
                <Button label="Deletar" onClick={event => {
                    // confirmDialog({
                    //     message: "Confirma a exclusão deste registro?",
                    //     acceptLabel: "Sim",
                    //     rejectLabel: "Não",
                        // accept: () => 
                        onDelete(registro)
                        // ,
                    //     header: "Confirmação"
                    // })
                }}
                        className="p-button-rounded p-button-danger" />
            </div>
        )
    }
    
    return (
        <DataTable value={produtos} paginator rows={5}>
            <Column field="id" header="Codigo"/>
            <Column field="nome" header="Nome"/>
            <Column field="preco" header="Preço"/>
            <Column header="" body={actionTemplate}/>
        </DataTable>
    )}