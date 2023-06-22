"use client";
import TabsTweetList from "@/components/Home/TabsTweetList";
import Loading from "@/components/Loading/Loading";
import TweetListHomePage from "@/components/TweetListHomePage";
import { getUser } from "@/features/auth/authAction";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import styles from "./main.module.scss";

const Page = () => {
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
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
        <Loading />
      </div>
    );
  }
  return (
    <GuestLayout>
      <LayoutWithNews>
        <h1 className={styles.heading}>Home</h1>
        <TabsTweetList />
        <TweetListHomePage />
      </LayoutWithNews>
    </GuestLayout>
  );
};

export default Page;
