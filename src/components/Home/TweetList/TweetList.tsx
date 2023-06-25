/* eslint-disable @next/next/no-img-element */
import { ITweet } from "@/features/interface";
import { clearIsDeleted } from "@/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { PATHS } from "@/contanst/paths";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FiLock } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import Loading from "../../Loading";
import ButtonsAction from "../TabsTweetList/components/ButtonsAction";
import styles from "./tweetList.module.scss";

type Props = { tweets: ITweet[] | null };

const TweetList = ({ tweets }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isDeleted } = useAppSelector((state: RootState) => state.tweet);

  const handleMoveDetailPage = (tweetId: number) => {
    router.push(`${PATHS.Tweets}/${tweetId}`);
  };
  const handleCloseModalSuccessDeletedTweet = useCallback(() => {
    dispatch(clearIsDeleted());
  }, []);

  return (
    <div className={styles.tweetList}>
      {tweets && tweets.length <= 0 ? (
        <div>
          <h1 className={styles.noneText}>App does&apos;t anything tweet</h1>
        </div>
      ) : (
        <>
          {tweets?.map((tweet) => (
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
                  <div className={styles.audienceIcon}>
                    {tweet.isPrivate ? (
                      <FiLock className={styles.icon} />
                    ) : (
                      <GiWorld className={styles.icon} />
                    )}
                  </div>
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
