import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import Image from "next/image";
function Nav() {
  const { data: session } = useSession();
  return (
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>DemoShop</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/productPage">Shop</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/cart">Cart</Link>
        </li>
        {session && session.user ? (
          <li
            className={styles.navlink}
            onClick={() => {
              signOut({
                callbackUrl: "http://localhost:3000",
              });
            }}
          >
            signOut
          </li>
        ) : (
          <li className={styles.navlink} href="./">
            Signin
          </li>
        )}
        <li className={styles.navlink}>Welcome {session?.user?.name} </li>
        <li className={styles.navlink}>
          <img src={session?.user?.image} className={styles.profileImage} />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
