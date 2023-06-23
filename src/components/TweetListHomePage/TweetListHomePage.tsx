import { getUser } from "@/features/auth/authAction";
import { ITweet } from "@/features/interface";
import { getAll as getAllTweets } from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import TweetList from "../Home/TweetList";
import LoadingDots from "../LoadingDots";
type Props = {};

const TweetListHomePage = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { tweets } = useAppSelector((state: RootState) => state.tweet);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTweets = async () => {
      try {
        setLoading(true);
        await dispatch(
          getAllTweets({
            page: 1,
          })
        ).unwrap();

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getTweets();
  }, []);

  return (
    <div>
      <TweetList tweets={tweets} />
      {loading && (
        <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
          <LoadingDots />
        </div>
      )}
    </div>
  );
};

export default TweetListHomePage;
