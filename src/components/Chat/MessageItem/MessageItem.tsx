import React from "react";
import styles from "./messageItem.module.scss";
import { IMessage } from "@/features/interface";
type Props = {
  message: IMessage;
};

const MessageItem = ({ message }: Props) => {
  return <div className={styles.wrapper}>MessageItem</div>;
};

export default MessageItem;
