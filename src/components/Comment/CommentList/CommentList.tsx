/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import Loading from "@/components/Loading";
import { getAllByTweet } from "@/features/comment/commentAction";
import { IComment, ITweet } from "@/features/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import CommentItem from "../CommentItem";
import styles from "./commentList.module.scss";
type Props = {
  comments: IComment[];
};

const CommentList = React.memo(({ comments }: Props) => {
  const dispatch = useAppDispatch();
  // const { commentsForTweet: comments } = useAppSelector(
  //   (state: RootState) => state.comment
  // );

  // const [loadingGetAll, setLoadingGetAll] = useState<boolean>(false);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       dispatch(getAllByTweet(tweet.id))
  //     } catch (error) {
  //       setLoadingGetAll(false);
  //     }
  //   }
  //   getData();
  // }, []);

  // if (loadingGetAll) {
  //   return (
  //     <div className="d-flex align-items-center justify-content-center w-100 h-100">
  //       <Loading />
  //     </div>
  //   );
  // }

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
