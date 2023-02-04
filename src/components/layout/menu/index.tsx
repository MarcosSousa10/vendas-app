import Link from "next/link";
import {signOut } from "next-auth/react"
export const Menu: React.FC = () => {
    return (
        <aside className="column is-2 is-narrow-mobile s-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch" />
            <ul className="menu-list">
                <MenuItem href="/" label="Home" />
                <MenuItem href="/consultas/produtos" label="Produtos" />
                <MenuItem href="/consultas/clientes" label="Clientes" />
                <MenuItem href="/vendas/nova-venda" label="Venda" />
                <MenuItem href="/vendas/relatorio-vendas" label="Relatorio" />
                <MenuItem onClick={()=>signOut()} href="/" label="Sair" />

            </ul>

        </aside>
    )
}
interface MenuItemProps {
    href: string;
    label: string;
    onClick?: ()=>void;
}
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return (
        <li>
            <Link href={props.href} onClick={props.onClick}>
                    
                        <span className="icon"></span> {props.label}
                

            </Link>
        </li>
    )
}