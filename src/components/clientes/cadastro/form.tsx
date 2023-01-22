import { Cliente } from "../../../app/models/clientes";
import { useFormik } from "formik";
import { Input } from "../../common/input";
import { formatReal } from "../../../app/util/money";
interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}
const formScheme: Cliente = {
    cadastro: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    id: '',
    nome: '',
    telefone: ''
}
export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {
    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme,...cliente},
        onSubmit,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id &&
                <div className="columns">

                    <Input id="id" name="id" disabled
                        value={formik.values.id} label="Codigo:" columnClasses="is-half" autoComplete="off" />
                    <Input id="cadastro" name="cadastro" columnClasses="is-half" disabled
                        value={formik.values.cadastro} label="Data Cadastro " autoComplete="off" />
                </div>}
            <div className="columns">
                <Input id="nome" name="nome" onChange={formik.handleChange}
                    value={formik.values.nome} label="Nome *" columnClasses="is-full" autoComplete="off" />
            </div>
            <div className="columns">
                <Input id="cpf" name="cpf" onChange={formik.handleChange}
                    value={formik.values.cpf} label="CPF *" columnClasses="is-half" autoComplete="off" />
                <Input id="dataNascimento" name="dataNascimento" columnClasses="is-half" onChange={formik.handleChange}
                    value={formik.values.dataNascimento} label="Data Nascimento *" autoComplete="off" />
            </div>
            <div className="columns">
                <Input id="endereco" name="endereco" columnClasses="is-full" onChange={formik.handleChange}
                    value={formik.values.endereco} label="Endereço *" autoComplete="off" />
            </div>
            <div className="columns">
                <Input id="email" name="email" onChange={formik.handleChange}
                    value={formik.values.email} label="Email *" columnClasses="is-half" autoComplete="off" />
                <Input id="telefone" name="telefone" columnClasses="is-half" onChange={formik.handleChange}
                    value={formik.values.telefone} label="Telefone *" autoComplete="off" />
            </div>
            <div className="field is-grouped">
                <button type="submit" className="button" >
                    {formik.values.id ? "Atualizar" : "Salvar"}
                </button>
            </div>


        </form>
    )
}