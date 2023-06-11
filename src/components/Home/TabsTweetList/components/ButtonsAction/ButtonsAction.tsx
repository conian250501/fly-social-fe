/* eslint-disable react/display-name */
import { IError, ITweet } from "@/app/features/interface";
import { disLikeTweet, likeTweet } from "@/app/features/tweet/tweetAction";
import { useAppDispatch } from "@/app/redux/hooks";
import { PATHS } from "@/contanst/paths";
import { useCheckLiked } from "@/hooks/useCheckLiked";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiBookmark, BiMessageSquare } from "react-icons/bi";
import styles from "./buttonsAction.module.scss";
type Props = {
  tweet: ITweet;
};

const ButtonsAction = React.memo(({ tweet }: Props) => {
  const dispatch = useAppDispatch();
  const { userIsLiked } = useCheckLiked(tweet.likes);
  const [error, setError] = useState<IError | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(userIsLiked);
  const [countLike, setCountLike] = useState<number>(tweet.likes.length);

  const handleLike = async () => {
    try {
      await dispatch(likeTweet(tweet.id)).unwrap();
      setIsLiked(true);
      setCountLike(countLike + 1);
    } catch (error) {
      setError(error as IError);
    }
  };

  const handleDisLike = async () => {
    try {
      await dispatch(disLikeTweet(tweet.id)).unwrap();
      setIsLiked(false);

      if (countLike > 0) {
        setCountLike(countLike - 1);
      }
    } catch (error) {
      setError(error as IError);
    }
  };

  const handleStorage = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className={styles.btnList}>
      <div className={styles.listInfo}>
        <div className={styles.listInfoItem}>
          <p className={styles.number}>{countLike}</p>
          <div className={styles.text}>Likes</div>
        </div>
        <div className={styles.listInfoItem}>
          <p className={styles.number}>12</p>
          <div className={styles.text}>Comments</div>
        </div>
        <div className={styles.listInfoItem}>
          <p className={styles.number}>12</p>
          <div className={styles.text}>Bookmark</div>
        </div>
      </div>
      <div className={styles.lineDivide}></div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-4">
          <div className={styles.btnItem}>
            <div
              className={`${styles.stage}`}
              onClick={isLiked ? handleDisLike : handleLike}
            >
              <div
                className={` ${styles.heart} ${isLiked ? styles.liked : ""}`}
              />
            </div>
          </div>
          <div className={styles.btnItem}>
            <Link
              href={`${PATHS.Tweets}/${tweet.id}`}
              className={styles.iconItem}
            >
              <BiMessageSquare className={`${styles.icon} ${styles.comment}`} />
            </Link>
          </div>
        </div>
        <div className={styles.btnItem}>
          <div className={styles.iconItem}>
            <BiBookmark className={`${styles.icon} ${styles.save}`} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ButtonsAction;
