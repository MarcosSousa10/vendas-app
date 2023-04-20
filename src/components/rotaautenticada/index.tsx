import { useSession, signIn, signOut } from "next-auth/react"
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { InputCPF, InputEmail, Input, InputTelefone } from "../common/input";
interface RotaAutenticadaProps {
  children: React.ReactNode;

}
export const RotaAutenticada: React.FC<RotaAutenticadaProps> = ({
  children
}) => {
  const { data: session } = useSession()
  console.log(session);
  if (session) {
    const imagem: any = session.user?.image
    return (
      <>
        <img src={imagem} />
        Seja Bem Vindo {session.user?.name} <br />
        {children}
      </>
    )
  }
  return (
    <div className="container" >
      <Card style={{ minWidth: '100%', minHeight: '100vh', display: "flex" }}>
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Card.Img variant="top" src="https://ps.w.org/login-customizer/assets/icon-256x256.png?rev=2455454" style={{ width: '400px', }} ></Card.Img>
          <Card.Title><h5 style={{ fontWeight: 'bold', fontSize: "50px", fontFamily: "sans-serif" }}>Supremo Gas</h5></Card.Title>
        </div>
              <Card.Body >
              <div style={{ textAlign: "center" }} ><Button className="button is-large" onClick={() => signIn()}>  <span className="icon is-medium">
                        <Icon path={mdiAccount}
                          title="User Profile"
                          size={1}
                          horizontal
                          vertical
                          rotate={90}
                          color="red"
                          spin
                        />
                      </span>
                        <span>Faça Login</span></Button></div>
              </Card.Body>
      </Card>
    </div>
    
  )
}


