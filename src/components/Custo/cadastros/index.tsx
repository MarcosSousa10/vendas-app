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
import axios from "axios";
import { useLucroService } from "../../../app/services/lucro.service";
import { Button } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { error } from "console";
const validationSchema = yup.object().shape({
    Mes: yup.string().trim().required("Campo Obrigatorio"),
})
interface FormErros {
    Mes?: string;
}

export const Cadastro: React.FC = () => {

        
        const [cod, setCod] = useState('');
        const [custo, setCusto] = useState(0);
        const [dataCadastro, setDataCadastro] = useState();
        const [custos, setCustos] = useState(0);
        const [dataCadastros, setDataCadastros] = useState();

        const Task = async (cod: any) => {
          await axios
            .get(`http://192.168.2.181:8080/api/codigo/${cod}`)
            .then(Response => {
             
              setDataCadastro(Response.data.dataCadastro);
              setCusto(Response.data.custo);
            
            }).catch(error=>{
                 alert("Não Forão Encontrados Lucros")
            }               
            );
        }  

        const Tasks = async (cod: any) => {
            await axios
              .get(`http://192.168.2.181:8080/api/codigoCusto/${cod}`)
              .then(Response => {
               
                setDataCadastros(Response.data.dataCadastro);
                setCustos(Response.data.custo);
               console.log(custos)
              }).catch(error=>{
                alert("Não Foram encontrados Despesas")
                setCusto(null!);
                setCustos(null!);
              }
              );
          }  
    return (
        <Layout titulo="Cadastros de Custo" >
                
            <div className="row m-2">
                <div className= "col p-2">
                <Input label="Mes: * "
                className="form-control "
                    columnClasses="is-full"
                    onChange={e => setCod(e.target.value)}
                    value={cod}
                    id="inputNome"
                    placeholder="Digite o Mes"
                    
                />
                </div>
                <div className= "col p-2">
                <Input label="Lucro"
                className="form-control "
                    columnClasses="is-full"
                    disabled
                    value={custo == null ? 0 :custo}
                    
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    
                />
                </div>
                <div className= "col p-2">
                 <Input label="Despesas"
                className="form-control "
                    columnClasses="is-full"
                    disabled
                    value={custos == null ? 0 :custos}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    
                />
                </div>

                <Input label="Total"
                className="form-control "
                    columnClasses="is-full"
                    disabled
                    value={custo - custos}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    
                />
                </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end m-2">
                <div className="control is-link">
                    <button className="btn btn-success me-md-2"onClick={()=>{Task(cod),Tasks(cod)}}>
                      Consultar Mes</button>
                </div>
                <div className="control is-link">
                    
                </div>
            </div>
            

        </Layout>
    )
}