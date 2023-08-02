import React from "react";
import styles from "./messageItem.module.scss";
import { IMessage } from "@/features/interface";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
type Props = {
  message: IMessage;
};

const MessageItem = ({ message }: Props) => {
  const { isMe } = useCheckIsMe(message.author.id);

  const MessageOfAuthor: React.FC = () => {
    return (
      <div className={styles.messageItemWrapper}>
        <div className={styles.content}>{message.content}</div>
      </div>
    );
  };

  const MessageOfParticipant: React.FC = () => {
    return (
      <div className={`${styles.messageItemWrapper} ${styles.participant}`}>
        <div className={styles.authorInfo}>
          <img
            src={
              message.author.avatar
                ? message.author.avatar
                : "/images/avatar-placeholder.png"
            }
            alt=""
            className={styles.avatar}
          />
        </div>
        <div className={styles.content}>{message.content}</div>
      </div>
    );
  };
  return (
    <div className={styles.wrapper}>
      {isMe ? <MessageOfAuthor /> : <MessageOfParticipant />}
    </div>
  );
};

export default MessageItem;
