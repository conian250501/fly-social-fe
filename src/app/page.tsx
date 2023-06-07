"use client";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import Loading from "@/components/Loading/Loading";
import TweetList from "@/components/Home/TweetList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getUser } from "./features/auth/authAction";
import styles from "./main.module.scss";
import { useAppDispatch } from "./redux/hooks";
import { ETypeTabTweetList } from "@/components/interfaces";
import TabsTweetList from "@/components/Home/TabsTweetList/TabsTweetList";
import TweetListFollowing from "@/components/Home/TweetListFollowing/TweetListFollowing";

const Home = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ETypeTabTweetList>(
    ETypeTabTweetList.ForYou
  );

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
      <Row className={styles.mainPage}>
        <Col
          xs={12}
          sm={12}
          md={7}
          lg={7}
          className={`${styles.homeWrapper} p-0`}
        >
          <h1 className={styles.heading}>Home</h1>
          <TabsTweetList activeTab={activeTab} changeActiveTab={setActiveTab} />
          {activeTab === ETypeTabTweetList.ForYou && <TweetList />}
          {activeTab === ETypeTabTweetList.Following && <TweetListFollowing />}
        </Col>
        <Col xs={12} sm={12} md={5} lg={5}>
          User list
        </Col>
      </Row>
    </GuestLayout>
  );
};

export default Home;
