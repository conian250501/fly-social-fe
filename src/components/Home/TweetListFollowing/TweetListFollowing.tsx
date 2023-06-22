/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import { getUser } from "@/features/auth/authAction";
import { ITweet } from "@/features/interface";
import { getAllTweetsFollowing } from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
    if (lastPage) return;
    getTweets();
  }, [lastPage, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (lastPage) return;
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
      if (!loadingGetTweets) {
        const tweets = await dispatch(
          getAllTweetsFollowing({ page: page, limit: 10 })
        ).unwrap();
      }

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
    </div>
  );
});

export default TweetListFollowing;
