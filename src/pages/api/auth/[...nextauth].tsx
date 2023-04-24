import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//  import GitHubProvider from "next-auth/providers/github";
export const authOptions = {

}
export default NextAuth({
  
     
   
      providers: [
        // GitHubProvider({
        //   clientId: process.env.GITHUB_ID ?? "",
        //   clientSecret: process.env.GITHUB_SECRET ?? ""
        // }),
        CredentialsProvider({
          name:"NextAuthCredentials",
          credentials:{
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            var user = null
            if (credentials?.username =="administrador" && credentials?.password =="admin"){
              user = { id: "1", name: "administrador", email: "administrador@gmail.com" }
            }else{
              user =null;
            }

            // const user = await res.json()
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
            // return{
            //        id: "1",
            //        name:"marcos",
            //        email:"marcospegodesousa10@gmail.com",
            //        image:"gsds"
                };
              },
            })
          ],
      secret: 'fadfadasdpiasjdsad524ad534a45d34a35d4a65d4a56s4da54d6a84sd658a4sd6584asd',
    }
 )
//  OpenSSL> rand -base64 32
//  JDOmgILh7gjlgfqdSsnbxMSeUajHURv1S8IjwC4CauU=
//  unable to write 'random state'
//  OpenSSL>
 