import React from "react";
import styles from "./commentList.module.scss";
import { ITweet } from "@/app/features/interface";
type Props = {
  tweet: ITweet;
};

const CommentList = ({ tweet }: Props) => {
  return <div>CommentList</div>;
};

export default CommentList;
