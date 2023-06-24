"use client";
import LoadingDots from "@/components/LoadingDots";
import BackLink from "@/components/shared/Profile/BackLink";
import TabsProfile from "@/components/shared/Profile/TabsProfile";
import TopInfo from "@/components/shared/Profile/TopInfo";
import { ITweet } from "@/features/interface";
import { getAllTweetsSaved } from "@/features/tweet/tweetAction";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import ProfileLayout from "@/Layouts/ProfileLayout";
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
        getAllTweetsSaved({ userId: Number(params.id), filter: { page: page } })
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
    <section>
      <BackLink user={user} />
      <TopInfo user={user} />
      <TabsProfile userId={Number(params.id)} />
      <TweetList tweets={tweets} />
      {loading && tweets.length > 0 && (
        <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
          <LoadingDots />
        </div>
      )}
    </section>
  );
};

export default Page;
