import React, { InputHTMLAttributes } from "react"
import { formatReal } from "../../../app/util/money"
import {FormatUtils} from '@4us-dev/utils'

const formatUtils = new FormatUtils;
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    formatter?:(value:string) =>string;
    label: string;
    id:string;
    columnClasses?: string;
    currency?: boolean;
    error?:string;
}
export const Input: React.FC<InputProps> =({    onChange,formatter, label, columnClasses, id,currency,error, ...props}:InputProps)=>{
    const onInputChange= (event: any) =>{{
        const value: any = event.target.value;
        const name = event.target.name;
        const formattedValue=(formatter && formatter(value as string))|| value;
        if(onChange !== undefined){
        onChange({
            ...event,
            target:{
                name,
                value:formattedValue
            }
        })
                 }}}
    return(
        <div className={`field column ${columnClasses}`}>
        <label className="label" htmlFor={id}>{label}</label>
        <div className="control">
            <input className="input" id={id} {...props} onChange={onInputChange} />
            {error &&
            <p className="help is-danger">{error}</p>}
        </div>
        </div>
    )
}
export const InputMoney: React.FC<InputProps> =(props:InputProps)=>{
    return (
        <Input {...props} formatter={formatReal}/>
    )
}
export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatUtils.formatCPF} />
    )
}