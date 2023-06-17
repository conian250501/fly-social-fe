"use client";
import TabsTweetList from "@/components/Home/TabsTweetList";
import TweetList from "@/components/Home/TweetList";
import TweetListFollowing from "@/components/Home/TweetListFollowing";
import { ETypeTabTweetList } from "@/components/interfaces";
import Loading from "@/components/Loading/Loading";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import { useEffect, useState } from "react";
import { getUser } from "./features/auth/authAction";
import { getAll as getAllTweet } from "./features/tweet/tweetAction";
import styles from "./main.module.scss";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ETypeTabTweetList>(
    ETypeTabTweetList.ForYou
  );
  const { tweets } = useAppSelector((state: RootState) => state.tweet);

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

  useEffect(() => {
    dispatch(getAllTweet());
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
        <TabsTweetList activeTab={activeTab} changeActiveTab={setActiveTab} />
        {activeTab === ETypeTabTweetList.ForYou && (
          <TweetList tweets={tweets} />
        )}
        {activeTab === ETypeTabTweetList.Following && <TweetListFollowing />}
      </LayoutWithNews>
    </GuestLayout>
  );
};

export default Home;
