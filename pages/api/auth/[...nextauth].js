import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // id: "password-login",
      // name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };

        // const resp = await fetch(backendURL + "/auth/login", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentialDetails),
        // });
        // const user = await resp.json();
        const { email, password } = credentialDetails;
        if (email === "pratik320@gmail.com" && password === "12345678") {
          return {
            id: 1234,
            email: email,
            name: "pratikprajapati",
          };
        } else {
          alert("wrong password and email");
          return null;
        }
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET,
    }),

    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
