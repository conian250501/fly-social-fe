"use client";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import Loading from "@/components/Loading/Loading";
import TweetList from "@/components/TweetList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getUser } from "./features/auth/authAction";
import styles from "./main.module.scss";
import { useAppDispatch } from "./redux/hooks";

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
        <Row>
          <Col xs={12} sm={12} md={7} lg={7}>
            <TweetList />
          </Col>
          <Col xs={12} sm={12} md={5} lg={5}>
            User list
          </Col>
        </Row>
      </main>
    </GuestLayout>
  );
};

export default Home;
