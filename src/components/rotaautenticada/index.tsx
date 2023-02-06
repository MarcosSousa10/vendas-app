import { useSession, signIn, signOut } from "next-auth/react"
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';




interface RotaAutenticadaProps{
    children: React.ReactNode;
}
export const RotaAutenticada:React.FC<RotaAutenticadaProps>=({
    children
})=>{
  const { data: session } = useSession()
console.log(session);
  if (session) {
    return (
       <>
       <img src={session.user?.image} alt="" />
        Seja Bem Vindo {session.user?.name} <br />
        {children}
      </>
    )
  }
  return (
    <>
       <button className="button is-large"  onClick={() => signIn()}>
    <span className="icon is-medium">
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
    <span>Entrar</span>
    </button>
        
    </>
  )
}


