import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    cliente: Yup.object().nullable(true).required("Campo obrigatório"),
    itens: Yup.array().min(1, "Deve conter pelo menos um Produto. "),
    formaPagamento: Yup.string().trim().required("Campo obrigatorio.")
})