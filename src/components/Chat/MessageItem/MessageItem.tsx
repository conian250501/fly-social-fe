import React, { useState } from "react";
import styles from "./messageItem.module.scss";
import { IMessage } from "@/features/interface";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import moment from "moment";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
type Props = {
  message: IMessage;
};

const MessageItem = ({ message }: Props) => {
  const { isMe } = useCheckIsMe(message.author.id);
  const [openDateSend, setOpenDateSend] = useState<boolean>(false);

  const handleShowDateSend = () => {
    setOpenDateSend(!openDateSend);
  };

  const MessageOfAuthor: React.FC = () => {
    return (
      <div className={styles.messageItemWrapper}>
        <div className={styles.content} onClick={handleShowDateSend}>
          {message.content}
        </div>

        <p className={`${styles.createdAt} ${openDateSend ? styles.show : ""}`}>
          Sent {moment(message.createdAt).fromNow()}
        </p>
      </div>
    );
  };

  const MessageOfParticipant: React.FC = () => {
    return (
      <div className={`${styles.messageItemWrapper} ${styles.participant}`}>
        <Link
          href={`${PATHS.Profile}/${message.author.id}`}
          className={styles.authorInfo}
        >
          <img
            src={
              message.author.avatar
                ? message.author.avatar
                : "/images/avatar-placeholder.png"
            }
            alt=""
            className={styles.avatar}
          />
        </Link>
        <div className={styles.contentWrapper} onClick={handleShowDateSend}>
          <div className={styles.content}>{message.content}</div>
          <p
            className={`${styles.createdAt} ${openDateSend ? styles.show : ""}`}
          >
            Sent {moment(message.createdAt).fromNow()}
          </p>
        </div>
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
