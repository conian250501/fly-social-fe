/* eslint-disable react/display-name */
import CommentList from "@/components/Comment/CommentList";
import FormComment from "@/components/Comment/FormComment";
import ButtonsAction from "@/components/Home/TabsTweetList/components/ButtonsAction";
import Loading from "@/components/Loading";
import { PATHS } from "@/contanst/paths";
import { getAllByTweet } from "@/features/comment/commentAction";
import { ITweet } from "@/features/interface";
import { getById } from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { FiLock } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import styles from "./tweetDetail.module.scss";
type Props = {
  tweet: ITweet;
  isOpen: boolean;
  handleClose: () => void;
};

const TweetDetail = React.memo(({ tweet, isOpen, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { commentsForTweet: comments } = useAppSelector(
    (state: RootState) => state.comment
  );

  const [loadingGetTweet, setLoadingGetTweet] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetTweet(true);
        // await dispatch(getById(tweet.id)).unwrap();
        await dispatch(getAllByTweet(tweet.id)).unwrap();
        setLoadingGetTweet(false);
      } catch (error) {
        setLoadingGetTweet(false);
        return error;
      }
    }
    if (isOpen) {
      getData();
    }
  }, [isOpen]);

  if (!tweet)
    return (
      <div>
        <h1>Tweet doest exist</h1>
      </div>
    );

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      fullscreen
      contentClassName={styles.modalContent}
    >
      <div className={styles.tweetDetailWrapper}>
        <div className={styles.filePreview}>
          <div className={styles.iconClose} onClick={handleClose}>
            <CgClose className={styles.icon} />
          </div>

          <img src={tweet.image} className={styles.image} alt="tweet-image" />
        </div>
        <div className={styles.tweetContent}>
          <div className={styles.userInfo}>
            <div className="d-flex align-items-center justify-content-start gap-3">
              <Link
                href={`${PATHS.Profile}/${tweet.user.id}`}
                className={styles.profileLink}
              >
                <img
                  src={
                    tweet.user.avatar
                      ? tweet.user.avatar
                      : "/images/avatar-placeholder.png"
                  }
                  alt=""
                  className={styles.avatar}
                />
                <div className={styles.info}>
                  <h6 className={styles.name}>{tweet.user.name}</h6>
                  <p className={styles.nickname}>
                    {tweet.user.nickname ? tweet.user.nickname : ""}
                  </p>
                </div>
              </Link>
              <div className={styles.dateCreated}>
                {moment(tweet.createdAt).fromNow()}
              </div>
              <div className={styles.audienceIcon}>
                {tweet.isPrivate ? (
                  <FiLock className={styles.icon} />
                ) : (
                  <GiWorld className={styles.icon} />
                )}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          {tweet.content && <p className={styles.content}>{tweet.content}</p>}

          <div className={`${styles.lineDivide}`}></div>

          {/* BUTTON ACTION */}
          <ButtonsAction tweet={tweet} />

          <div className={styles.lineDivide}></div>

          {/* FORM COMMENT */}
          <div className="mt-3 mb-3">
            <FormComment tweet={tweet} />
          </div>
          <div className={`${styles.lineDivide}`}></div>

          {/* COMMENT LIST */}
          {loadingGetTweet ? (
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Loading />
            </div>
          ) : (
            <div className={styles.commentListWrapper}>
              <CommentList comments={comments} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
});

export default TweetDetail;
