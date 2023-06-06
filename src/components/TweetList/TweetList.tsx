import { getAll as getAllTweet } from "@/app/features/tweet/tweetAction";
import { useAppDispatch } from "@/app/redux/hooks";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";

type Props = {};

const TweetList = (props: Props) => {
  const dispatch = useAppDispatch();
  const [loadingGetAll, setLoadingGetAll] = useState<boolean>(false);
  useEffect(() => {
    async function handleGetAllTweet() {
      try {
        setLoadingGetAll(true);
        await dispatch(getAllTweet());
        setLoadingGetAll(false);
      } catch (error) {
        setLoadingGetAll(false);
        console.log(error);
      }
    }
    handleGetAllTweet();
  }, []);

  if (loadingGetAll) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <Loading />
      </div>
    );
  }

  return <div>TweetList</div>;
};

export default TweetList;
