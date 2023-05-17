import { Html, Head, Main, NextScript } from "next/document";
import Pokemon from "./pokemon/pokemon";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>DemoShop</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
          type="text/css"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
