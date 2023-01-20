
interface MessageProps{
    tipo: string;
    fild?: string;
    texto: string;
}
export interface Alert{
    tipo: string;
    fild?: string;
    texto: string;
}
export const Message: React.FC<MessageProps> =({texto,tipo,fild})=>{
    return(
        <article className={`message is-${tipo}`}>
            <div className="massage-body">
                {fild&&`${fild} :`}{texto}
            </div>
        </article>
    )
}