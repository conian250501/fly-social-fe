"use client";
import Loading from "@/components/Loading";
import { ITweet } from "@/features/interface";
import { getAllTweetsLiked } from "@/features/tweet/tweetAction";
import { getUserById } from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LayoutWithNews = dynamic(() => import("@/Layouts/LayoutWithNews"), {
  ssr: false,
  loading: () => {
    return (
      <div className="d-flex align-items-center justify-content-center mt-4">
        <Loading />
      </div>
    );
  },
});

const ProfileLayout = dynamic(() => import("@/Layouts/ProfileLayout"), {
  ssr: false,
  loading: () => {
    return (
      <div className="d-flex align-items-center justify-content-center mt-4">
        <Loading />
      </div>
    );
  },
});

const MainLayout = dynamic(() => import("@/Layouts/MainLayout"), {
  ssr: false,
  loading: () => {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100 mt-4">
        <Loading />
      </div>
    );
  },
});
const TweetList = dynamic(() => import("@/components/Home/TweetList"), {
  ssr: false,
  loading: () => {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100 mt-4">
        <Loading />
      </div>
    );
  },
});

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserById(Number(params.id)));
  }, []);

  useEffect(() => {
    if (!user) return;
    if (lastPage) return;
    getTweets();
  }, [page, user]);

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
      setLoading(true);
      const tweets = await dispatch(
        getAllTweetsLiked({ userId: Number(params.id), filter: { page: page } })
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
          {loading && (
            <div className="d-flex align-items-center justify-content-center w-100 mt-5">
              <Loading />
            </div>
          )}
        </ProfileLayout>
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
