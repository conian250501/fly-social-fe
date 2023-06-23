/* eslint-disable react/display-name */
import LoadingDots from "@/components/LoadingDots";
import { ITweet } from "@/features/interface";
import { getAllTweetsFollowing } from "@/features/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import TweetList from "../TweetList/TweetList";

type Props = {};

const TweetListFollowing = React.memo((props: Props) => {
  const dispatch = useAppDispatch();

  const [loadingGetTweets, setLoadingGetTweets] = useState<boolean>(false);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    if (lastPage) {
      setLoadingGetTweets(false);
      return;
    }
    getTweets();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
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
      setLoadingGetTweets(true);
      const tweets = await dispatch(
        getAllTweetsFollowing({ page: page, limit: 10 })
      ).unwrap();

      if (tweets.length === 0) {
        setLastPage(true);
        return;
      }
      setLoadingGetTweets(false);

      setTweets((prevTweets) => {
        const uniqueTweets = tweets.filter(
          (newTweet: ITweet) =>
            !prevTweets.some((prevTweet) => prevTweet.id === newTweet.id)
        );
        return [...prevTweets, ...uniqueTweets];
      });
    } catch (error) {
      setLoadingGetTweets(false);
      console.log(error);
    }
  };

  return (
    <div>
      <TweetList tweets={tweets} />
      {loadingGetTweets && (
        <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
          <LoadingDots />
        </div>
      )}
    </div>
  );
});

export default TweetListFollowing;
