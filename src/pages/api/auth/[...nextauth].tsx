import NextAuth from "next-auth"
import Providers from "next-auth/providers/github"
// yarn add @types/next-auth -D dependencia de desenvolvimento
export const authOptions = {

}
export default NextAuth({
    providers:[
        Providers({
            clientId: 'Iv1.c9096e133ca5352d',
            clientSecret: '52b205eef69792ebd7495682d07c58cdc3c520c5',
        }),
],}
)