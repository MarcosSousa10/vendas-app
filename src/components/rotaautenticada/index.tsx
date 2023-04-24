import { useSession, signIn, signOut } from "next-auth/react"
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image'
import Image2 from 'next/image'
import img from '../../imagens/imagem.png';


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
        {/* <img src={imagem} /> */}
        Seja Bem Vindo {session.user?.name} <br />
        {children}
      </>
    )
  }
  return (
    <div >
    <div className="container " >
      <Card style={{ minWidth: '100%', minHeight: '100vh', display: "flex" }}>
        <div style={{ alignItems: "center", textAlign: "center" }}>
          {/* <Card.Img variant="top" src="https://scontent.frao1-1.fna.fbcdn.net/v/t1.6435-9/120018403_106733417854100_4086658827985042327_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=ipqO4JZ5X04AX_M79zu&_nc_oc=AQlcx5pruxX92UGZyGoYljfN3UZxnGR9Ajx5K7f1nRJOUo-NyF71tpIYRfV5RLrR4so&_nc_ht=scontent.frao1-1.fna&oh=00_AfDMr8XuZb3xgU6Q5HK2DuRPkmMiaVKv2aHp1RyBYoj-0g&oe=646E09BB" style={{ width: '400px', }}  ></Card.Img> */}
          <Image src={img} alt={""} />

          {/* <Card.Title><h5 style={{ fontWeight: 'bold', fontSize: "50px", fontFamily: "sans-serif" }}>Supremo Gas</h5></Card.Title> */}
        </div>

        <div className="row">
          <div className="col">
            <div className="car m-5">

              <Card.Body >
                <div className="container">
                  <div className="row mt-5">
                    <div className="col">
                      <div style={{ textAlign: "center" }} ><Button className="button is-large" onClick={() => signIn()} style={{height:'50px' , width:'200px'}}>  <span className="icon is-medium">
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
                        <span>Login</span></Button></div>
                    </div>
                  </div>
                </div>
              </Card.Body>

            </div>

          </div>

        </div>
      </Card>
    </div>
    </div>
  )
}


