import NextAuth from "next-auth"

 import GitHubProvider from "next-auth/providers/github";
export const authOptions = {

}
export default NextAuth({
  
     
   
      providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        }),
      ],   
      secret: 'fadfadasdpiasjdsad524ad534a45d34a35d4a65d4a56s4da54d6a84sd658a4sd6584asd',
    }
 )
//  OpenSSL> rand -base64 32
//  JDOmgILh7gjlgfqdSsnbxMSeUajHURv1S8IjwC4CauU=
//  unable to write 'random state'
//  OpenSSL>
 