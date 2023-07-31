import React from "react";
import styles from "./chat.module.scss";
import { IMessage } from "@/features/interface";
import MessageItem from "../MessageItem/MessageItem";
type Props = {
  messages: IMessage[];
};

const MessageList = ({ messages }: Props) => {
  return (
    <div className={styles.wrapper}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
