/* eslint-disable @next/next/no-img-element */
import { IComment } from "@/app/features/interface";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import moment from "moment";
import React from "react";
import { TbDots } from "react-icons/tb";
import styles from "./commentItem.module.scss";
type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  const { isAuthor } = useCheckAuthor(comment.user.id);
  return (
    <div key={comment.id} className={styles.commentItem}>
      <div className={styles.avatarAuthor}>
        <img
          src={
            comment.user.avatar
              ? comment.user.avatar
              : "/images/avatar-placeholder.png"
          }
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.commentInfo}>
        <div className={styles.authorInfo}>
          <div className="d-flex align-items-center justify-content-start gap-2">
            <h5 className={styles.name}>{comment.user.name}</h5>
            {comment.user.nickname && (
              <p className={styles.nickname}>{comment.user.nickname}</p>
            )}
            <p className={styles.createdAt}>
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
          {isAuthor && <TbDots className={styles.dotIcon} />}
        </div>
        {comment.content && <p className={styles.content}>{comment.content}</p>}
        {comment.image && (
          <img src={comment.image} alt="" className={styles.image} />
        )}
        {comment.video && (
          <video src={comment.video} controls className={styles.image} />
        )}
      </div>
    </div>
  );
};

export default CommentItem;
