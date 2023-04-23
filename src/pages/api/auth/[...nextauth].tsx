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
      secret: process.env.NEXT_PUBLIC_SECRET,
      pages: {
        signIn: '/auth/signin',
      }
    
    }
 )