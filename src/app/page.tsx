"use client";
import react from "react";
import styles from "./main.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {

  if (typeof window === 'undefined') {
    return
  }
  const isAuthenticated = localStorage.getItem("token");
  const router = useRouter();

  if(!isAuthenticated){
    router.replace("/auth");
    return
  }

  return (
    <main className={styles.mainPage}>
      <h1>HOME PAGE</h1>
    </main>
  )
}
