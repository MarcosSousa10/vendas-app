import Layout from "../../layout"
import { Input } from "../../common/input"
import { InputEmail } from "../../common/input"
import { InputCPF, InputTelefone } from "../../common/input"
import { Vendedor } from "../../../app/models/vendedor"
import { useFormik } from "formik"
import Router from "next/router"
interface CadastroVendedorProps{
   vendedor: Vendedor;
   onSubmit:(vendedor: Vendedor)=> void;

}
const formSchema: Vendedor={
    cpf:'',
    nome:'',
    email:'',
    telefone:''
}
export const CadastroVendedor: React.FC<CadastroVendedorProps> = ({
    onSubmit,
    vendedor
}) => {
    const formik = useFormik<Vendedor>({
        initialValues: { ...formSchema,...vendedor},
        onSubmit,
        enableReinitialize: true,
        
    });
    console.log(formik.errors);
    return (
        <form onSubmit={formik.handleSubmit}>
            
                <div className="row m-2">
                    <div className="col">
                        <Input id="nome" value={formik.values.nome} onChange={formik.handleChange} name="nome" className="form-control" label="Nome" />
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col">
                        <InputCPF value={formik.values.cpf} onChange={formik.handleChange} className="form-control" label="CPF" id='cpf' name="cpf" />
                    </div>
                    <div className="col">
                        <InputEmail className="form-control" value={formik.values.email} onChange={formik.handleChange} label="Email" name="email" id="email" />
                    </div>
                    <div className="col">
                        <InputTelefone label="Telefone" value={formik.values.telefone} onChange={formik.handleChange} className="form-control" name="telefone" id="telefone" />
                    </div>
                </div>
                <button type="submit" onClick={e=>Router.push("/vendedoresa/listagem_vendedores")} className="btn btn-center">Cadastrar</button>
           
        </form>
    )
}