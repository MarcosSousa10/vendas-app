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
          <Card.Title><h5 style={{ fontWeight: 'bold', fontSize: "50px", fontFamily: "sans-serif" }}>Login</h5></Card.Title>
        </div>

        <div className="row">
          <div className="col" >
            <form action="" className="m-5" style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
              <InputCPF id="cpf" name="cpf" label="CPF" className='form-control' />
              <InputEmail id="email" name="email" label="Email" className='form-control' />
              <Input id="nome" name="nome" label="Nome" className='form-control' />
              <Input type="password" id="senha" name="senha" label="Senha" className='form-control' />
              <InputTelefone id="telefone" name="telefone" label="Telefone" className='form-control' />
              <div style={{ textAlign: "center" }} className="m-5"><Button >Cadastrar</Button></div>

            </form>
          </div>
          <div className="col">
            <div className="car m-5">




              <Card.Body >


                <Card.Text style={{ textAlign: "center", fontFamily: 'fantasy' }}>
                  Faça o Login Ultilizando Uma Das Redes Sociais
                  <br />

                </Card.Text>


                <InputEmail id="email" name="email" label="Email" className='form-control' />
                <Input type="password" id="senha" name="senha" label="Senha" className='form-control' />
                <div className="container">
                  <div className="row mt-5">
                    <div className="col">
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
                        <span>Entrar Ultilizando Redes Sociais</span></Button></div>
                    </div>

                    <div className="col">
                      <div style={{ textAlign: "center" }} ><Button > <span>Login</span> </Button></div>
                    </div>
                  </div>
                </div>
              </Card.Body>

            </div>

          </div>

        </div>
      </Card>
    </div>
  )
}


