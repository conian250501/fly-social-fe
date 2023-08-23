"use client";
import Loading from "@/components/Loading";
import LoadingDots from "@/components/LoadingDots";
import TweetListArchived from "@/components/TweetListArchived";
import { ITweet } from "@/features/interface";
import { getAllTweetByUser } from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const TweetList = dynamic(() => import("@/components/Home/TweetList"), {
  ssr: false,
});

type Props = {};

const Page = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingForTweets, setLoadingForTweets] = useState(true);

  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    if (lastPage) {
      setLoading(false);
      return;
    }
    getTweets();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
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
        getAllTweetByUser({
          userId: Number(user?.id),
          filter: { limit: 10, page: 1, isArchived: true },
        })
      ).unwrap();
      setLoadingForTweets(false);

      if (tweets.length === 0) {
        setLastPage(true);
        return;
      }

      setTweets((prevTweets) => {
        const uniqueTweets: ITweet[] = tweets
          .filter(
            (newTweet: ITweet) =>
              !prevTweets.some((prevTweet) => prevTweet.id === newTweet.id)
          )
          .filter((item: ITweet) => item.deletedAt);

        return [...prevTweets, ...uniqueTweets];
      });
      setLoading(false);
    } catch (error) {
      setLoadingForTweets(false);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section>
      {loadingForTweets ? (
        <div className="d-flex align-items-center justify-content-center mt-4">
          <Loading />
        </div>
      ) : (
        <TweetListArchived tweets={tweets} />
      )}
      {loading && tweets.length > 0 && (
        <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
          <LoadingDots />
        </div>
      )}
    </section>
  );
};

export default Page;
