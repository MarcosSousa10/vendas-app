import Link from "next/link";
import {signOut } from "next-auth/react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Menu: React.FC = () => {
    return (
        <Navbar  className="column is-2 is-narrow-mobile s-fullheight section is-hidden-mobile" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><img src="https://o.remove.bg/downloads/024e9ada-e14a-4665-b77e-c4dae6ceb0d6/logo-removebg-preview.png" alt="" style={{height:'40px'}} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><MenuItem href="/consultas/produtos" label="Produtos" /></Nav.Link>

            <Nav.Link ><MenuItem href="/consultas/clientes" label="Clientes" /></Nav.Link>
            <Nav.Link > <MenuItem href="/vendas/nova-venda" label="Venda" /></Nav.Link>
            <Nav.Link><MenuItem href="/vendas/relatorio-vendas" label="Relatorio" /></Nav.Link>
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