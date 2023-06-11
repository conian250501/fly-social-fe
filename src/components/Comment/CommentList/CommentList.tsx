/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import styles from "./commentList.module.scss";
import { IComment, ITweet } from "@/app/features/interface";
import moment from "moment";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import { useAppDispatch } from "@/app/redux/hooks";
import CommentItem from "../CommentItem";
type Props = {
  tweet: ITweet;
};

const CommentList = React.memo(({ tweet }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {tweet.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
});

export default CommentList;
