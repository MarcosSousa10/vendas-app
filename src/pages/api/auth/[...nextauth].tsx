import NextAuth from "next-auth"
// import Providers from "next-auth/providers/github"
// import Auth0Provider from "next-auth/providers/auth0";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
// yarn add @types/next-auth -D dependencia de desenvolvimento
export const authOptions = {

}
export default NextAuth({
//     providers:[
//         Providers({
//             clientId: 'Iv1.c9096e133ca5352d',
//             clientSecret: '5d653fc8a6b8770da117c441daac3a01386988bb',
//         }),
//         Auth0Provider({
//             clientId: 'x834JoVESoE8G75knKIrgC28sHse7Fvv',
//             clientSecret: 'VsvICoKeWehfxluTvQjR_8_6pcph6ycajBZnrFwvlcOR4juQXgFhEwtKNtzpZHVV',
//             issuer: 'dev-j3caa6yiujbuwfit.us.auth0.com'
//           }),
//           GoogleProvider({
//             clientId: '755155738220-e59r2s6r6tghs2612qabst9j79iadohb.apps.googleusercontent.com',
//             clientSecret: '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'
//           }),
//           FacebookProvider({
//             clientId: '929559655147168',
//             clientSecret: '2b151c4db20cb062840923b07ad82bfa'
//           }),
// ]
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      //  const res = await fetch("/api/clientes", {
      //    method: 'GET',
      //  body: JSON.stringify(credentials),
      //    headers: { "Content-Type": "application/json" }
      //  })

      //  const user = await res.json()
        
       const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
       console.log(user)
      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
],}
)