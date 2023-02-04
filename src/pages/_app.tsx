
import type { AppProps } from 'next/app'
import 'bulma/css/bulma.css'
import '../components/common/loader/loader.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primeflex/primeflex.css'
import { SessionProvider } from "next-auth/react"
import { RotaAutenticada } from '../components/rotaautenticada'


export default function App({ Component,  pageProps: { session, ...pageProps }, }: AppProps) {
  return (
<SessionProvider session={pageProps.session}>
  <RotaAutenticada >
    <Component {...pageProps} />
  </RotaAutenticada>
    
    </SessionProvider>
  )
}
