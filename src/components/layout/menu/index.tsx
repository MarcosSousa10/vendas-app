import Link from "next/link";
import {signOut } from "next-auth/react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Menu: React.FC = () => {
    return (
        <Navbar  className="column is-2 is-narrow-mobile s-fullheight section is-hidden-mobile" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Supremo Gas</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><MenuItem href="/consultas/produtos" label="Produtos" /></Nav.Link>
            <Nav.Link ><MenuItem href="/consultas/custo" label="Custo" /></Nav.Link>
            <Nav.Link ><MenuItem href="/consultas/clientes" label="Clientes" /></Nav.Link>
            <Nav.Link > <MenuItem href="/vendas/nova-venda" label="Venda" /></Nav.Link>
            <Nav.Link><MenuItem href="/vendas/relatorio-vendas" label="Relatorio" /></Nav.Link>
            <Nav.Link ><MenuItem href="/cadastros/preco" label="Margem de Lucro" /></Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link href="#/" eventKey={2}><MenuItem onClick={()=>signOut()} href="/" label="Sair" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
                      
               
              
                
               
    </Navbar>
        
         
          
                
                
           
    )
}
interface MenuItemProps {
    href: string;
    label: string;
    onClick?: ()=>void;
}
const MenuItemBootstap: React.FC<MenuItemProps> = (props: MenuItemProps)=>{
    return(
    <Nav.Link>
        {props.label}
    </Nav.Link>)
}
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return (
        <li>
            <Link style={{textDecoration: 'none', color:'grey'}} href={props.href} onClick={props.onClick}>
                    
                         {props.label}
                

            </Link>
        </li>
    )
}