/* eslint-disable react/display-name */
import { IError, ITweet } from "@/features/interface";
import {
  saveTweet,
  unSaveTweet,
} from "@/features/storageTweet/storageTweetAction";
import { disLikeTweet, likeTweet } from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ModalError from "@/components/Modal/ModalError";
import { PATHS } from "@/contanst/paths";
import { useCheckLiked } from "@/hooks/useCheckLiked";
import { useCheckSavedTweet } from "@/hooks/useCheckSavedTweet";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiBookmark, BiMessageSquare } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styles from "./buttonsAction.module.scss";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
type Props = {
  tweet: ITweet;
};

const ButtonsAction = React.memo(({ tweet }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userIsLiked } = useCheckLiked(tweet.likes);
  const { tweetIsSaved: _tweetIsSaved } = useCheckSavedTweet(
    tweet.storageTweets
  );
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [error, setError] = useState<IError | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(userIsLiked);
  const [tweetIsSaved, setTweetIsSaved] = useState<boolean>(_tweetIsSaved);
  const [countLike, setCountLike] = useState<number>(tweet.likes.length);
  const [countSaved, setCountSaved] = useState<number>(
    tweet.storageTweets.length
  );
  const [loadingLike, setLoadingLike] = useState<boolean>(false);
  const [loadingStorage, setLoadingStorage] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        router.replace(PATHS.LoginPage);
        return;
      }
      setLoadingLike(true);

      await dispatch(likeTweet(tweet.id)).unwrap();

      setIsLiked(true);
      setCountLike(countLike + 1);
      setLoadingLike(false);
    } catch (error) {
      setLoadingLike(false);
      setError(error as IError);
    }
  };

  const handleDisLike = async () => {
    try {
      if (!isAuthenticated) {
        router.replace(PATHS.LoginPage);
        return;
      }
      setLoadingLike(true);

      await dispatch(disLikeTweet(tweet.id)).unwrap();

      setIsLiked(false);
      setLoadingLike(false);
      if (countLike > 0) {
        setCountLike(countLike - 1);
      }
    } catch (error) {
      setLoadingLike(false);

      setError(error as IError);
    }
  };

  const handleSaveTweet = async () => {
    try {
      if (!isAuthenticated) {
        router.replace(PATHS.LoginPage);
        return;
      }
      setLoadingStorage(true);

      await dispatch(saveTweet({ tweetId: tweet.id })).unwrap();

      setCountSaved((prev) => prev + 1);
      setTweetIsSaved(true);
      setLoadingStorage(false);
    } catch (error) {
      setLoadingStorage(false);
      setError(error as IError);
    }
  };

  const handleUnSavedTweet = async () => {
    try {
      setLoadingStorage(true);

      await dispatch(unSaveTweet({ tweetId: tweet.id })).unwrap();
      setTweetIsSaved(false);

      setLoadingStorage(false);
      setCountSaved((prev) => prev - 1);
      setLoadingStorage(false);
    } catch (error) {
      setError(error as IError);
    }
  };

  if (error) {
    return (
      <ModalError
        isOpen={Boolean(error)}
        handleClose={() => setError(null)}
        message={error.message}
      />
    );
  }
  return (
    <div className={styles.btnList}>
      <div className={styles.listInfo}>
        <div className={styles.listInfoItem}>
          <p className={styles.number}>{countLike}</p>
          <div className={styles.text}>Likes</div>
        </div>
        <div className={styles.listInfoItem}>
          <p className={styles.number}>{tweet.comments.length}</p>
          <div className={styles.text}>Comments</div>
        </div>
        <div className={styles.listInfoItem}>
          <p className={styles.number}>{countSaved}</p>
          <div className={styles.text}>Bookmark</div>
        </div>
      </div>
      <div className={styles.lineDivide}></div>
      <div className={styles.buttonItemWrapper}>
        <div className="d-flex align-items-center justify-content-start gap-2 gap-md-4">
          <div className={styles.btnItem}>
            <div
              className={`${styles.stage}`}
              onClick={() => {
                if (loadingLike) return;
                isLiked ? handleDisLike() : handleLike();
              }}
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
          {tweetIsSaved ? (
            <div
              className={styles.iconItem}
              onClick={() => {
                if (loadingStorage) return;
                handleUnSavedTweet();
              }}
            >
              <BsBookmarkFill className={`${styles.icon} ${styles.saved}`} />
            </div>
          ) : (
            <div
              className={styles.iconItem}
              onClick={() => {
                if (loadingStorage) return;
                handleSaveTweet();
              }}
            >
              <BsBookmark className={`${styles.icon} ${styles.unsaved}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ButtonsAction;
