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
        <Navbar.Brand href="/">Vendas</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><MenuItem href="/consultas/produtos" label="Produtos" /></Nav.Link>
            <Nav.Link ><MenuItem href="/consultas/produtoFixo" label="Produtos Bruto" /></Nav.Link>

            <Nav.Link ><MenuItem href="/consultas/clientes" label="Clientes" /></Nav.Link>
            <Nav.Link > <MenuItem href="/vendas/nova-venda" label="Venda" /></Nav.Link>
            <Nav.Link><MenuItem href="/vendas/relatorio-vendas" label="Relatorio" /></Nav.Link>
            <Nav.Link><MenuItem href="/vendas/vendedores" label="Cadastro De Vendedores" /></Nav.Link>
            <Nav.Link ><MenuItem href="/vendedoresa/listagem_vendedores" label="Vendedores" /></Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#/" eventKey={2}><MenuItem onClick={()=>signOut()} href="/" label="Sair" /></Nav.Link>
            <Nav.Link eventKey={2} href="/">
              Dank memes
            </Nav.Link>
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