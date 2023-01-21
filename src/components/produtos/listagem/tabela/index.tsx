import { Produto } from "../../../../app/models/produtos"
import { useState } from "react";
interface TabelaProdutosProps{
    produtos:Array<Produto>;
    onEdit:(produto:any)=>void;
    onDelete:(produto:any)=>void;
}
export const TabelaProdutos:React.FC<TabelaProdutosProps> = ({
    produtos,
    onEdit,
    onDelete
})=>{
    
    return (
       
        <table className="table is-striped is-hoverable">
            <thead>
                <tr>
                <th>Código</th>
                <th>SKU</th>
                <th>Nome</th>
                <th>Preço</th>
                <th></th>    
                </tr>            
            </thead>
            <tbody>
               {produtos.map(produto=> <ProdutoRow onDelete={onDelete} onEdit={onEdit} key={produto.id} produto={produto}/>)
               
               }
            </tbody>
        </table>
    )
}
interface ProdutoRowProps{
    produto:Produto;
    onEdit:(produto:any)=>void;
    onDelete:(produto:any)=>void;
}
const ProdutoRow:React.FC<ProdutoRowProps>=({
    produto,onDelete,onEdit
})=>{
    const [deletando, setDelentando]=useState<boolean>(false)
    const onDeleteClick=(produto:Produto)=>{
        if(deletando){
            onDelete(produto)
            setDelentando(false)
        }else{setDelentando(true)
        }

    }
    const cancelaDelete=()=>setDelentando(false)
return(
<tr>
    <td>{produto.id}</td>
    <td>{produto.sku}</td>
    <td>{produto.nome}</td>
    <td>{produto.preco}</td>
    <td>
        {!deletando &&
        <button onClick={e=>onEdit(produto)} className="button is-success is-rounded is-small">Editar</button>
        }

        <button onClick={e=>onDeleteClick(produto)} className="button is-danger is-rounded is-small">{deletando?"Confisrma?":"Deletar"}</button>
        
        {deletando && 
            <button onClick={cancelaDelete} className="button is-rounded is-small">Cancelar</button>
        }
    </td>
</tr>
)
}