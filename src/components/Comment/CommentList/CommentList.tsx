/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from "react";
import styles from "./commentList.module.scss";
import { IComment, ITweet } from "@/app/features/interface";
import moment from "moment";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import CommentItem from "../CommentItem";
import { getAllByTweet } from "@/app/features/comment/commentAction";
import { RootState } from "@/app/redux/store";
import Loading from "@/components/Loading";
type Props = {
  tweet: ITweet;
};

const CommentList = React.memo(({ tweet }: Props) => {
  const dispatch = useAppDispatch();
  const { commentsForTweet: comments } = useAppSelector(
    (state: RootState) => state.comment
  );

  const [loadingGetAll, setLoadingGetAll] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetAll(true);
        await dispatch(getAllByTweet(tweet.id)).unwrap();
        setLoadingGetAll(false);
      } catch (error) {
        setLoadingGetAll(false);
      }
    }
    getData();
  }, []);

  if (loadingGetAll) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {comments &&
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
  );
});

export default CommentList;
