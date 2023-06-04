"use client";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "./features/auth/authAction";
import styles from "./main.module.scss";
import { useAppDispatch } from "./redux/hooks";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import Loading from "@/components/Loading/Loading";

const Home = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getUser()).unwrap();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error;
      }
    };

    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
        <Loading />
      </div>
    );
  }

  return (
    <GuestLayout>
      <main className={styles.mainPage}>
        <div className="homepage">Home page</div>
      </main>
    </GuestLayout>
  );
};

export default Home;
