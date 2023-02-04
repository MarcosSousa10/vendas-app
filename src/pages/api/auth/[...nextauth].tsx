import NextAuth from "next-auth"
import Providers from "next-auth/providers/github"
import Auth0Provider from "next-auth/providers/auth0";

// yarn add @types/next-auth -D dependencia de desenvolvimento
export const authOptions = {

}
export default NextAuth({
    providers:[
        Providers({
            clientId: 'Iv1.c9096e133ca5352d',
            clientSecret: '52b205eef69792ebd7495682d07c58cdc3c520c5',
        }),
        Auth0Provider({
            clientId: 'x834JoVESoE8G75knKIrgC28sHse7Fvv',
            clientSecret: 'VsvICoKeWehfxluTvQjR_8_6pcph6ycajBZnrFwvlcOR4juQXgFhEwtKNtzpZHVV',
            issuer: 'dev-j3caa6yiujbuwfit.us.auth0.com'
          }),
],}
)