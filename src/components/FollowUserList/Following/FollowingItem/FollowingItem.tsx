/* eslint-disable react/display-name */
import { ETypeFollowUserList } from "@/components/interfaces";
import { PATHS } from "@/contanst/paths";
import { IUser } from "@/features/interface";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import Link from "next/link";
import React from "react";
import ButtonAction from "../../ButtonAction";
import styles from "./followingItem.module.scss";

type Props = {
  user: IUser;
  currentUserId: number;
};

const FollowerItem = React.memo(({ currentUserId, user }: Props) => {
  const { isMe } = useCheckIsMe(user.id);
  return (
    <li key={user.id} className={styles.userFollowItem}>
      <div className={styles.userInfo}>
        <Link
          href={`${PATHS.Profile}/${user.id}`}
          className="d-flex align-items-center justify-content-start gap-4"
        >
          <div className={styles.avatar}>
            <img
              src={user.avatar ? user.avatar : "/images/avatar-placeholder.png"}
              alt=""
            />
          </div>
          <div className={styles.info}>
            <h6 className={styles.name}>{user.name}</h6>
            <p className={styles.nickname}>@{user.nickname}</p>
          </div>
        </Link>
        {!isMe && (
          <ButtonAction
            currentUserId={currentUserId}
            user={user}
            type={ETypeFollowUserList.Following}
          />
        )}
      </div>
      <p className={styles.bio}>{user.bio}</p>
    </li>
  );
});

export default FollowerItem;
