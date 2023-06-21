/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import { ITweet } from "@/features/interface";
import { getAllTweetsFollowing } from "@/features/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import TweetList from "../TweetList/TweetList";

type Props = {};

const TweetListFollowing = React.memo((props: Props) => {
  const dispatch = useAppDispatch();
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [loadingGetAllTweets, setLoadingGetAllTweets] =
    useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetAllTweets(true);
        const _tweets = await dispatch(
          getAllTweetsFollowing({ filter: { page: 1, limit: 10 } })
        ).unwrap();

        setTweets(_tweets);
        setLoadingGetAllTweets(false);
      } catch (error) {
        setLoadingGetAllTweets(false);
        console.log({ error });
      }
    }
    getData();
  }, []);
  return (
    <div>
      {loadingGetAllTweets ? (
        <div className="d-flex align-content-center justify-content-center w-100 mt-5">
          <Loading />
        </div>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
});

export default TweetListFollowing;
