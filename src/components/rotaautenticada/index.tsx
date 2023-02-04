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
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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


