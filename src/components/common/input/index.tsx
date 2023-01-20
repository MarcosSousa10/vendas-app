import { InputHTMLAttributes } from "react";
import { formatReal } from "../../../app/util/money";
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    onChange?: (value: any) => void;
    label: string;
    id:string;
    columnClasses?: string;
    currency?: boolean;

}
export const Input: React.FC<InputProps> =({onChange, label, columnClasses, id,currency, ...props}:InputProps)=>{
    const onInputChange= (event: any) =>{{let value: any = event.target.value;
                if(value && currency){
                    value = formatReal(value);
                }
                 if (onChange){
                onChange(value)
                }}}
    return(
        <div className={`field column ${columnClasses}`}>
        <label className="label" htmlFor={id}>{label}</label>
        <div className="control">
            <input className="input" id={id} {...props}  onChange={onInputChange}/>
        </div>
        </div>
    )
}