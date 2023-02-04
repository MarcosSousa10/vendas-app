import { useSession, signIn, signOut } from "next-auth/react"
import { Loader } from "../common/loader";

interface RotaAutenticadaProps{
    children: React.ReactNode;
}
export const RotaAutenticada:React.FC<RotaAutenticadaProps>=({
    children
})=>{
  const { data: session } = useSession()

  if (session) {
    return (
       <>
        Seja Bem Vindo {session.user?.name} <br />
        {children}
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}


