import { ClientRequest } from "http";
import { Card } from 'primereact/card';
import { Chart } from "primereact/chart"
import { VendaPorMes } from "../../app/models/dashboard";
import { MESES } from "../../app/util/meses";
import { useState, useEffect } from "react";
interface DashboardProps {
    clientes?: number;
    produtos?: number;
    vendas?: number;
    vendasPorMes?:VendaPorMes[];
}


export const Dashboard: React.FC<DashboardProps> = ({
    clientes,
    produtos,
    vendas,
    vendasPorMes
}) => {
    const [charData,setCharData]= useState({});
    const carregaDadosGrafico=()=>{
       const labels:any  = vendasPorMes?.map(vm=>MESES[vm.mes - 1]);
       const valores= vendasPorMes?.map(vm=>vm.valor);
       const dadosGraficos ={
        labels:labels,
        datasets:[
            {
                label:"Valor Mensal",
                backgroundColor:"#42A5F5",
                data:valores
            }
        ]
       }
       setCharData(dadosGraficos);
    }
    useEffect(carregaDadosGrafico,[])

    const produtosCardStyle = {
        background: "red",
        color: "white"
    };
    const clientesCardStyle = {
        background: "blue",
        color: "white"
    };
    const vendasCardStyle = {
        background: "green",
        color: "white"
    };
    return (
        <div className="p-fluid">
            <div className="p-grid">
                <div className="p-col">
                    <Card title="Produtos" style={produtosCardStyle}>
                        <p className="p-m-0">
                            {produtos}
                        </p>
                    </Card>
                </div>
                <div className="p-col">
                    <Card title="Clientes" style={clientesCardStyle}>
                        <p className="p-m-0">
                            {clientes}
                        </p>
                    </Card>
                </div>


                <div className="p-col">
                    <Card title="vendas" style={vendasCardStyle}>
                        <p className="p-m-0">
                            {vendas}
                        </p>
                    </Card>
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col">
                    <Chart type="bar" data={charData} style={{ position: 'relative', with: '70%' }}/>
            </div>
            </div>

        </div>
    )
}