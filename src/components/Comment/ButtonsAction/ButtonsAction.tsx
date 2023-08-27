/* eslint-disable react/display-name */
import { disLikeComment, likeComment } from "@/features/comment/commentAction";
import { IComment, IError, ITweet } from "@/features/interface";
import { disLikeTweet, likeTweet } from "@/features/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import ModalError from "@/components/Modal/ModalError";
import { PATHS } from "@/contanst/paths";
import { useCheckLiked } from "@/hooks/useCheckLiked";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiBookmark, BiMessageSquare } from "react-icons/bi";
import styles from "./buttonsAction.module.scss";
import { AiOutlineLoading } from "react-icons/ai";
type Props = {
  comment: IComment;
};

const ButtonsAction = React.memo(({ comment }: Props) => {
  const dispatch = useAppDispatch();
  const { userIsLiked } = useCheckLiked(comment.likes);
  const [error, setError] = useState<IError | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(userIsLiked);
  const [countLike, setCountLike] = useState<number>(comment.likes.length);
  const [loadingLike, setLoadingLike] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      setLoadingLike(true);
      await dispatch(likeComment(comment.id)).unwrap();

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
      setLoadingLike(true);

      await dispatch(disLikeComment(comment.id)).unwrap();
      setIsLiked(false);

      if (countLike > 0) {
        setCountLike(countLike - 1);
      }
      setLoadingLike(false);
    } catch (error) {
      setLoadingLike(false);

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
      <div className={styles.buttonItemWrapper}>
        <div className="d-flex align-items-center justify-content-start gap-4">
          <div className={styles.btnItem}>
            <div
              className={`${styles.stage}`}
              onClick={isLiked ? handleDisLike : handleLike}
            >
              {loadingLike ? (
                <div className={styles.iconLoadingWrapper}>
                  <AiOutlineLoading className={styles.iconLoading} />
                </div>
              ) : (
                <div
                  className={` ${styles.heart} ${isLiked ? styles.liked : ""}`}
                />
              )}
            </div>
            <div className={styles.listInfoItem}>
              <p className={styles.number}>{countLike}</p>
              <div className={styles.text}>Likes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ButtonsAction;
