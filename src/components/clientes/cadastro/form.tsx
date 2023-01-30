import { Cliente } from "../../../app/models/clientes";
import { useFormik } from "formik";
import { Input } from "../../common/input";
import { formatReal } from "../../../app/util/money";
import { InputCPF,InputTelefone,InputEmail, InputDate } from "../../common/input";
import * as Yup from 'yup';
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
                <div className="columns">

                    <Input id="id" name="id" disabled
                        value={formik.values.id} label="Codigo:" columnClasses="is-half" autoComplete="off" />
                    <Input id="cadastro" name="cadastro" columnClasses="is-half" disabled
                        value={formik.values.cadastro} label="Data Cadastro " autoComplete="off" 
                        />
                </div>}
            <div className="columns">
                <Input id="nome" name="nome" onChange={formik.handleChange}
                    value={formik.values.nome} label="Nome *" formatter={caixaAlta} columnClasses="is-full" autoComplete="off" 
                    error={formik.errors.nome}/>
            </div>
            <div className="columns">
               <InputCPF id="cpf" 
                      name="cpf"
                      label="CPF: *"
                      autoComplete="off" 
                      columnClasses="is-half"
                      onChange={formik.handleChange} 
                      value={formik.values.cpf} 
                      error={formik.errors.cpf}

                      />
                <InputDate id="dataNascimento" name="dataNascimento" columnClasses="is-half" onChange={formik.handleChange}
                    value={formik.values.dataNascimento} label="Data Nascimento *" autoComplete="off" 
                    error={formik.errors.dataNascimento}/>
            </div>
            <div className="columns">
               <Input id="endereco" 
                      name="endereco"
                      label="Endereco: *"
                      autoComplete="off" 
                      columnClasses="is-full"
                      onChange={formik.handleChange} 
                      value={formik.values.endereco} 
                      error={formik.errors.endereco}/>
           </div>  
            <div className="columns">
                <Input id="email" name="email" onChange={formik.handleChange}
                    value={formik.values.email} label="Email *" columnClasses="is-half" autoComplete="off" 
                    error={formik.errors.email}/>
                <InputTelefone id="telefone" name="telefone" columnClasses="is-half" onChange={formik.handleChange}
                    value={formik.values.telefone} label="Telefone *" autoComplete="off"
                    error={formik.errors.telefone} />
            </div>
            <div className="field is-grouped">
                <button type="submit" className="button" >
                    {formik.values.id ? "Atualizar" : "Salvar"}
                </button>
            </div>


        </form>
    )
}