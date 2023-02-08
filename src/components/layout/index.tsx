import { ReactNode } from 'react';
import {Menu} from './menu/index';
import { Message } from '../common/message';
import { Alert } from '../common/message';
interface LayoutProps{
    titulo: string;
    children?: ReactNode;
    mensagem?:Array<Alert>;

}
const Layout: React.FC<LayoutProps>=(props)=>{
return(
    <div className="app"  style={{textAlign:"center"}}>
        <section className="main-content columns is-fullheight">
            <Menu/><br />
            <div className="container column is-10">
                <div className="section">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">{props.titulo}</h5> 
                                
                        
                        </div>
                        <div className="card-content">
                            <div className="content">
                                {props.mensagem &&
                                    // eslint-disable-next-line react/jsx-key
                                    props.mensagem.map(msg=><Message key={msg.texto} {...msg}/>)
                                }
                                <Message tipo="" texto="" fild=""/>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)
}
export default Layout;
