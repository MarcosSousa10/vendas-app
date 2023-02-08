import { Cliente } from "../../../app/models/clientes";
import { useFormik } from "formik";
import { Input } from "../../common/input";
import { formatReal } from "../../../app/util/money";
import { InputCPF,InputTelefone,InputEmail, InputDate } from "../../common/input";
import * as Yup from 'yup';
import Router from "next/router";
interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}
const formScheme: Cliente = {
    cadastro: '',
    cpf: '',
    endereco: '',
    dataNascimento: '',
    email: '',
    id: '',
    nome: '',
    telefone: ''
}
const campoObrigatorioMensagem ="Campo obrigatorio";
const campoObigatorioValidation= Yup.string().trim().required(campoObrigatorioMensagem);
const validationScheme= Yup.object().shape({
    cpf: Yup.string().trim().required(campoObrigatorioMensagem).length(14,"CPF Invalido!"),
    dataNascimento: Yup.string().trim().required(campoObrigatorioMensagem).length(10,"Data Invalida!"),
    email: Yup.string().trim().required(campoObrigatorioMensagem).email("Email Invalido!"),
    endereco: campoObigatorioValidation,
    nome: campoObigatorioValidation,
    telefone: campoObigatorioValidation,

})
export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {
    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme,...cliente},
        onSubmit,
        enableReinitialize: true,
        validationSchema: validationScheme
    });
    console.log(formik.errors);
    const caixaAlta=(value: string)=>{
        return value.toUpperCase();
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id &&
            <div className="row m-2">
                <div className="col">

                    <Input id="id" name="id" disabled
                        value={formik.values.id} label="Codigo:" className="form-control" columnClasses="is-half" autoComplete="off" />
                    </div>
                    <div className="col">
                    <Input id="cadastro" name="cadastro" columnClasses="is-half" disabled
                        value={formik.values.cadastro} className="form-control" label="Data Cadastro " autoComplete="off" 
                        />
                </div>
                </div>}
                <div className="row m-2">
            <div className="col">
                <Input id="nome" name="nome" onChange={formik.handleChange}
                    value={formik.values.nome} label="Nome *" className="form-control" formatter={caixaAlta} columnClasses="is-full" autoComplete="off" 
                    error={formik.errors.nome}/>
            </div>
            </div>
            <div className="row m-2">
            <div className="col">
               <InputCPF id="cpf" 
                      name="cpf"
                      label="CPF: *"
                      autoComplete="off" 
                      className="form-control"
                      columnClasses="is-half"
                      onChange={formik.handleChange} 
                      value={formik.values.cpf} 
                      error={formik.errors.cpf}

                      />
                      </div><div className="col">
                <InputDate id="dataNascimento" name="dataNascimento" className="form-control" columnClasses="is-half" onChange={formik.handleChange}
                    value={formik.values.dataNascimento} label="Data Nascimento *" autoComplete="off" 
                    error={formik.errors.dataNascimento}/> 
                    
            </div>
            </div>
            <div className="row m-2">
            <div className="col">
               <Input id="endereco" 
                      name="endereco"
                      className="form-control"
                      label="Endereco: *"
                      autoComplete="off" 
                      columnClasses="is-full"
                      onChange={formik.handleChange} 
                      value={formik.values.endereco} 
                      error={formik.errors.endereco}/>
           </div>  
           </div>
           <div className="row m-2">
            <div className="col">
                <Input id="email" name="email" onChange={formik.handleChange}
                    value={formik.values.email} label="Email *" columnClasses="is-half" autoComplete="off" className="form-control"
                    error={formik.errors.email}/>
                    </div>
                    <div className="col">
                <InputTelefone id="telefone" name="telefone" columnClasses="is-half" onChange={formik.handleChange} className="form-control"
                    value={formik.values.telefone} label="Telefone *" autoComplete="off"
                    error={formik.errors.telefone} />
            </div>
            </div>
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end m-2">
                <div className="control is-link">
                <button type="submit" className="btn btn-success me-md-2" >
                    {formik.values.id ? "Atualizar" : "Salvar"}
                </button>
                </div>
                <div className="control">
                <button type="button" onClick={e=>Router.push("/consultas/clientes")} className="btn btn-primary" >
                    Voltar
                </button>
                </div>
            </div>


        </form>
    )
}