"use client";
import Loading from "@/components/Loading";
import LoadingDots from "@/components/LoadingDots";
import BackLink from "@/components/shared/Profile/BackLink";
import TabsProfile from "@/components/shared/Profile/TabsProfile";
import TopInfo from "@/components/shared/Profile/TopInfo";
import { ITweet } from "@/features/interface";
import { getAllTweetsLiked } from "@/features/tweet/tweetAction";
import { getUserById } from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const TweetList = dynamic(() => import("@/components/Home/TweetList"), {
  ssr: false,
});

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);

  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingForTweets, setLoadingForTweets] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserById(Number(params.id)));
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
        window.innerHeight + document.documentElement.scrollTop + 2 >=
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
        getAllTweetsLiked({ userId: Number(params.id), filter: { page: page } })
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
      setLoadingForTweets(false);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section>
      <BackLink user={user} />
      <TopInfo user={user} />
      <TabsProfile userId={Number(params.id)} />
      {loadingForTweets ? (
        <div className="d-flex align-items-center justify-content-center mt-4">
          <Loading />
        </div>
      ) : (
        <TweetList tweets={tweets} />
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
