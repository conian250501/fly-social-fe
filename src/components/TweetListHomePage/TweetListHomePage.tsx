import { ITweet } from "@/features/interface";
import { getAll as getAllTweets } from "@/features/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import TweetList from "../Home/TweetList";
import Loading from "../Loading";
import LoadingDots from "../LoadingDots";
import styles from "./tweetListHomePage.module.scss";

type Props = {};

const TweetListHomePage = ({}: Props) => {
  const dispatch = useAppDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingForTweets, setLoadingForTweets] = useState<boolean>(true);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

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
        getAllTweets({ page: page, limit: 10 })
      ).unwrap();
      setLoadingForTweets(false);

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
      setLoadingForTweets(false);

      console.log(error);
    }
  };

  return (
    <div
      className={`${styles.tweetListWrapper} ${
        !isAuthenticated ? styles.loggedIn : ""
      }`}
    >
      {loadingForTweets ? (
        <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
          <Loading />
        </div>
      ) : (
        <TweetList tweets={tweets} />
      )}
      {loading && tweets && tweets.length > 0 && (
        <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
          <LoadingDots />
        </div>
      )}
    </div>
  );
};

export default TweetListHomePage;
