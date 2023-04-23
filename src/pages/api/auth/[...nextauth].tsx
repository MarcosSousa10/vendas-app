import NextAuth from "next-auth"
 import Providers from "next-auth/providers/github"
export const authOptions = {

}
export default NextAuth({
     providers:[
         Providers({
             clientId: process.env.NEXT_PUBLIC_GITHUB_PROVIDER_CLIENTID,
             clientSecret: process.env.NEXT_PUBLIC_GITHUB_PROVIDER_CLIENTSECRET         
            }),
  ],}
 )