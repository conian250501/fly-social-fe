/* eslint-disable @next/next/no-img-element */
import { getAll as getAllTweet } from "@/app/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../../Loading";
import { RootState } from "@/app/redux/store";
import styles from "./tweetList.module.scss";
import moment from "moment";
import ButtonsAction from "../TabsTweetList/components/ButtonsAction";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
import { useRouter } from "next/navigation";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { clearIsDeleted } from "@/app/features/tweet/tweetSlice";
import { ITweet } from "@/app/features/interface";

type Props = { tweets: ITweet[] };

const TweetList = ({ tweets }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loadingGetAll, setLoadingGetAll] = useState<boolean>(false);
  const { isDeleted } = useAppSelector((state: RootState) => state.tweet);

  const handleMoveDetailPage = (tweetId: number) => {
    router.push(`${PATHS.Tweets}/${tweetId}`);
  };
  const handleCloseModalSuccessDeletedTweet = useCallback(() => {
    dispatch(clearIsDeleted());
  }, []);

  if (loadingGetAll) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.tweetList}>
      {tweets.length <= 0 ? (
        <div>
          <h1 className={styles.noneText}>App does&apos;t anything tweet</h1>
        </div>
      ) : (
        <>
          {tweets.map((tweet) => (
            <div key={tweet.id} className={styles.tweetItem}>
              <Link
                href={`${PATHS.Profile}/${tweet.user.id}`}
                className={styles.avatarAuthor}
              >
                <img
                  src={
                    tweet.user.avatar
                      ? tweet.user.avatar
                      : "/images/avatar-placeholder.png"
                  }
                  alt=""
                  className={styles.image}
                />
              </Link>
              <div className={styles.tweetInfoWrapper}>
                <Link
                  href={`${PATHS.Profile}/${tweet.user.id}`}
                  className={styles.authorInfo}
                >
                  <h5 className={styles.name}>{tweet.user.name}</h5>
                  {tweet.user.nickname && (
                    <p className={styles.nickname}>{tweet.user.nickname}</p>
                  )}
                  <p className={styles.createdAt}>
                    {moment(tweet.createdAt).fromNow()}
                  </p>
                </Link>
                <div
                  className={styles.tweetInfo}
                  onClick={() => handleMoveDetailPage(tweet.id)}
                >
                  {tweet.content && (
                    <p className={styles.content}>{tweet.content}</p>
                  )}
                  <Link href={`${PATHS.Tweets}/${tweet.id}`}>
                    {tweet.image && (
                      <img src={tweet.image} alt="" className={styles.image} />
                    )}
                  </Link>
                </div>
                <ButtonsAction tweet={tweet} />
              </div>
            </div>
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
