import NextAuth from "next-auth"

 import GitHubProvider from "next-auth/providers/github";
export const authOptions = {

}
export default NextAuth({
  
     
   
      providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        })
      ],
      callbacks: {
      },
      // secret: process.env.NEXTAUTH_SECRET,    
      secret: process.env.JWT_SECRET
    }
 )
//  OpenSSL> rand -base64 32
//  JDOmgILh7gjlgfqdSsnbxMSeUajHURv1S8IjwC4CauU=
//  unable to write 'random state'
//  OpenSSL>
 