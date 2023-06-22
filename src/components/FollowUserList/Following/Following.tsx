import ModalError from "@/components/Modal/ModalError";
import { followUser, unFollowUser } from "@/features/follow/followAction";
import { IError, IUser } from "@/features/interface";
import {
  getAllUserFollowers,
  getAllUserFollowing,
} from "@/features/user/userAction";
import { useCheckFollowed } from "@/hooks/useCheckFollowed";
import { useAppDispatch } from "@/redux/hooks";
import React, { FC, useEffect, useState } from "react";
import styles from "./following.module.scss";
import FollowingItem from "./FollowingItem";

type Props = {
  users: IUser[];
  currentUserId: number;
};

const Following = ({ users, currentUserId }: Props) => {
  return (
    <ul className={styles.userFollowList}>
      {users.length <= 0 ? (
        <div className={styles.noneDataWrapper}>
          <img src="/images/birds.png" className={styles.banner} alt="" />
          <h1 className={styles.title}>Looking for following?</h1>
          <p className={styles.description}>
            When someone follows this account, they’ll show up here. Tweeting
            and interacting with others helps boost followers.
          </p>
        </div>
      ) : (
        users.map((user) => (
          <FollowingItem
            key={user.id}
            currentUserId={currentUserId}
            user={user}
          />
        ))
      )}
    </ul>
  );
};

export default Following;
