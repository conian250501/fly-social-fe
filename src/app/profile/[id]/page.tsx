"use client";
import { getUserById } from "@/app/features/user/userAction";
import Loading from "@/components/Loading";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import ProfileLayout from "@/Layouts/ProfileLayout";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ITweet } from "../../features/interface";
import { getAllTweetByUser } from "../../features/tweet/tweetAction";
import { useAppDispatch } from "../../redux/hooks";

const TweetList = dynamic(() => import("@/components/Home/TweetList"), {
  ssr: false,
  loading: () => (
    <div className="d-flex align-items-center justify-content-center w-100 vh-100">
      <Loading />
    </div>
  ),
});

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();

  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    if (lastPage) return;
    getTweets();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getTweets = async () => {
    try {
      setLoading(true);
      const tweets = await dispatch(
        getAllTweetByUser({ userId: Number(params.id), filter: { page: page } })
      ).unwrap();

      if (tweets.length === 0) {
        setLastPage(true);
        return;
      }

      setTweets((prevTweets) => {
        const uniqueTweets = tweets.filter(
          (newTweet: ITweet) =>
            !prevTweets.some((prevTweet) => prevTweet.id === newTweet.id)
        );
        return [...prevTweets, ...uniqueTweets];
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <LayoutWithNews>
        <ProfileLayout id={Number(params.id)}>
          <TweetList tweets={tweets} />
          {loading && !lastPage && <h1>loading...</h1>}
        </ProfileLayout>
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
