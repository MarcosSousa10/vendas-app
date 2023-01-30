import React, { InputHTMLAttributes } from "react"
import { formatReal } from "../../../app/util/money"
import {FormatUtils,StringUtils} from '@4us-dev/utils'
import { number } from "yup";

const formatUtils = new FormatUtils;
const stringUtils= new StringUtils;
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    formatter?:(value:string) =>string | any;
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
export const InputTelefone: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatUtils.formatPhone} />
    )
}
export const InputDate: React.FC<InputProps> = (props: InputProps)=>{
    const formatDate= (value: string ) =>{
        if(!value){
            return '';
        }
        const data = formatUtils.formatOnlyIntegers(value);
        const size= value.length;
        if (size <= 2){
            return data;
        }
        if (size <= 4){
            return data.substr(0,2)+"/"+data.substr(2,2)
        }
        if (size<=6){
            return data.substr(0,2)+"/"+data.substr(2,2)+"/"+data.substr(4,2)

        }
    }
    return (
        <Input {...props} maxLength={10} formatter={formatDate}/>
    )
}
export const InputEmail: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={stringUtils.hideEmail} />
    )
}