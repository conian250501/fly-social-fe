/* eslint-disable @next/next/no-img-element */
import { ITweet } from "@/app/features/interface";
import { clearIsDeleted } from "@/app/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import Loading from "@/components/Loading";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import dynamic from "next/dynamic";
import { useCallback } from "react";
const TweetItem = dynamic(() => import("./components/TweetItem"), {
  ssr: false,
  loading: () => (
    <div className="d-flex align-items-center justify-content-center w-100 vh-100 mt-4">
      <Loading />
    </div>
  ),
});
import styles from "./tweetList.module.scss";

type Props = { tweets: ITweet[] };

const TweetList = ({ tweets }: Props) => {
  const dispatch = useAppDispatch();

  const { isDeleted } = useAppSelector((state: RootState) => state.tweet);

  const handleCloseModalSuccessDeletedTweet = useCallback(() => {
    dispatch(clearIsDeleted());
  }, []);

  return (
    <div className={styles.tweetList}>
      {tweets.length <= 0 ? (
        <div>
          <h1 className={styles.noneText}>App does&apos;t anything tweet</h1>
        </div>
      ) : (
        <>
          {tweets.map((tweet) => (
            <TweetItem key={tweet.id} tweet={tweet} />
          ))}
        </>
      )}

      {/* ====== MODALS ====== */}
      <ModalSuccess
        isOpen={isDeleted}
        handleClose={handleCloseModalSuccessDeletedTweet}
        message={`Deleted tweet successfully`}
      />
    </div>
  );
};

export default TweetList;
