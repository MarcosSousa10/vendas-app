import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import  Router  from "next/router";
import { confirmDialog } from "primereact/confirmdialog";
import { ProdutoFixo } from "../../app/models/produtoFixo";
import { useProdutoServiceFixo } from "../../app/services/podutoFixo.service";
import { Alert } from "../common/message";
import { AxiosResponse } from "axios";
import { httpClient } from "../../app/http";
import Link from "next/link"
import useSWR from 'swr';
import { useEffect } from "react"



export const PrecoFixo:React.FC = ()=>{

 const service = useProdutoServiceFixo();
const { data: result, error } = useSWR<AxiosResponse<ProdutoFixo[]>>
    ('/api/produtofixo', url => httpClient.get(url))
const [lista, setLista] = useState<ProdutoFixo[]>([])

useEffect(() => {
    setLista(result?.data || [])
}, [result])

    const actionTemplate = (registro: ProdutoFixo) => {
        const url = `/cadastros/produtofixo?id=${registro.id}`
        return (
            <div></div>
        )
    }
          console.log(lista[0].preco) 

    return (
        <div></div>
    )}