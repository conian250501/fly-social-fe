"use client";
import { ITweet } from "@/app/features/interface";
import { getAllTweetsSaved } from "@/app/features/tweet/tweetAction";
import { getUserById } from "@/app/features/user/userAction";
import { useAppDispatch } from "@/app/redux/hooks";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import ProfileLayout from "@/Layouts/ProfileLayout";
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
    <MainLayout>
      <LayoutWithNews>
        <ProfileLayout id={Number(params.id)}>
          <TweetList tweets={tweets} />
        </ProfileLayout>
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
