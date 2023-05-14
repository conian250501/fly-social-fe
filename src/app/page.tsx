"use client";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "./features/auth/authAction";
import styles from "./main.module.scss";
import { useAppDispatch } from "./redux/hooks";

const Home = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <main className={styles.mainPage}>
        <div className="homepage">Home page</div>
      </main>
    </MainLayout>
  );
};

export default Home;
