"use client";
import react, { useEffect } from "react";
import styles from "./main.module.scss";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "./redux/hooks";
import { getUser } from "./features/auth/authAction";

 const Home = () => {

  if (typeof window === "undefined") {
    return
  }
  const isAuthenticated = localStorage.getItem("token");
  const router = useRouter();

  const dispatch = useAppDispatch();

  if(!isAuthenticated){
    router.replace("/auth");
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        return error;
      }
    }
    fetchData()
  },[]);

  return (
    <main className={styles.mainPage}>
      <h1>HOME PAGE</h1>
    </main>
  )
}

export default Home;
