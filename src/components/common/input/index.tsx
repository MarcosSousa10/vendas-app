import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    onChange?: (value: any) => void;
    label: string;
    id:string;
    columnClasses?: string;


}
export const Input: React.FC<InputProps> =({onChange, label, columnClasses, id, ...props}:InputProps)=>{
    return(
        <div className={`field column ${columnClasses}`}>
        <label className="label" htmlFor={id}>{label}</label>
        <div className="control">
            <input {...props}  onChange={event => { if (onChange){onChange(event.target.value)}}} className="input" id={id} />
        </div>
        </div>
    )
}