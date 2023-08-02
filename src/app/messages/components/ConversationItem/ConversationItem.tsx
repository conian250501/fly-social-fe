import React, { useEffect, useState } from "react";
import styles from "./conversationItem.module.scss";
import { IConversation, IUser } from "@/features/interface";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
import { usePathname } from "next/navigation";
type Props = {
  conversation: IConversation;
};

const ConversationItem = ({ conversation }: Props) => {
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  const path = usePathname();
  const conversationActive = path.split("/").pop();

  const participant = conversation.participants.filter(
    (item) => item.id !== Number(currentUser?.id)
  );

  return (
    <Link
      href={`${PATHS.Messages}/${conversation.id}`}
      role="button"
      className={`${styles.userItem} ${
        Number(conversationActive) === conversation.id ? styles.active : ""
      }`}
      key={conversation.id}
    >
      <div className="d-flex align-items-center justify-content-start gap-3 text-decoration-none">
        <div className="position-relative">
          <img
            src={
              participant[0].avatar
                ? participant[0].avatar
                : "/images/avatar-placeholder.png"
            }
            alt=""
            className={styles.avatar}
          />
          {participant[0].verified && (
            <img
              src="/icons/twitter-verified-badge.svg"
              alt=""
              className={styles.iconVerified}
            />
          )}
        </div>
        <div className={styles.info}>
          <div className="d-flex align-items-center justify-content-start gap-2 position-relative">
            <h4 className={styles.name}>{participant[0].name}</h4>
          </div>
          {conversation.participants.filter(
            (item) => item.id !== currentUser?.id
          )[0].nickname && (
            <p className={styles.nickname}>@{participant[0].nickname}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;
