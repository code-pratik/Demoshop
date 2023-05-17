import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import { Button } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function Login() {
  // const [values, setValue] = useState();
  // const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  };

  //   const response = await fetch("/api/sessions", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   console.log(response);
  //   if (response.ok) {
  //     return router.push("/productPage");
  //   }
  // };

  return (
    <div>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </Head>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <h1>Login</h1>
          <label className={styles.label}>Email</label>
          <br />
          <input
            type="text"
            className={styles.email}
            ref={emailInput}
            placeholder="&#xf2bb;"
            // onChange={({ target }) => {
            //   setValue({ ...values, email: target.value });
            //   console.log(target.value);
            // }}
          />
          <br />
        </div>
        <div>
          <label className={styles.label}>Password</label>
          <br />
          <input
            type="password"
            ref={passwordInput}
            className={styles.email}
            placeholder="&#xf084;"
          />
        </div>
        <div>
          <Button className={styles.btn} type="submit" variant="contained">
            LogIn
          </Button>
        </div>
        <label className={styles.label}>or Sign Up using</label>
        <div>
          <button
            className={styles.sbtn}
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/productPage",
              })
            }
          >
            <GoogleIcon className={styles.micon} />
          </button>
          <button
            className={styles.sbtn}
            onClick={() =>
              signIn("facebook", {
                callbackUrl: "http://localhost:3000/productPage",
              })
            }
          >
            <FacebookRoundedIcon className={styles.micon} />
          </button>
          <button
            className={styles.sbtn}
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000/productPage",
              })
            }
          >
            <GitHubIcon className={styles.micon} />
          </button>
        </div>
      </form>
    </div>
  );
}
