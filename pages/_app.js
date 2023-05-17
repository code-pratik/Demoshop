import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "@/componets/nav";
import Footer from "@/componets/footer";
import { Provider } from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </SessionProvider>
  );
}
