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

type Props = {
  users: IUser[];
};

const Following = ({ users }: Props) => {
  const dispatch = useAppDispatch();

  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(true);
  const [userActive, setUserActive] = useState<number>(0);
  const [error, setError] = useState<IError | null>(null);

  const handleFollow = async (userId: number) => {
    try {
      setLoadingFollow(true);

      setUserActive(userId);
      await dispatch(followUser(Number(userId))).unwrap();
      setLoadingFollow(false);
      setIsFollowed(true);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  const handleUnFollow = async (userId: number) => {
    try {
      setLoadingFollow(true);

      setUserActive(userId);
      await dispatch(unFollowUser(Number(userId))).unwrap();

      setIsFollowed(false);

      setLoadingFollow(false);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  const ButtonAction: FC<{ user: IUser }> = ({ user }) => {
    return (
      <React.Fragment>
        <div className={styles.btnWrapper}>
          {isFollowed ? (
            <button
              type="button"
              className={`${styles.btn} ${styles.unFollow}`}
              onClick={() => handleUnFollow(user.id)}
              disabled={loadingFollow}
            >
              <p className={styles.textFollowing}>
                {loadingFollow ? "..." : "Following"}
              </p>
              <p className={styles.textUnFollow}>Unfollow</p>
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles.follow}`}
              onClick={() => handleFollow(user.id)}
              disabled={loadingFollow}
            >
              {loadingFollow ? "..." : "Follow"}
            </button>
          )}
        </div>
      </React.Fragment>
    );
  };
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
          <li key={user.id} className={styles.userFollowItem}>
            <div className={styles.userInfo}>
              <div className="d-flex align-items-center justify-content-start gap-4">
                <div className={styles.avatar}>
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : "/images/avatar-placeholder.png"
                    }
                    alt=""
                  />
                </div>
                <div className={styles.info}>
                  <h6 className={styles.name}>{user.name}</h6>
                  <p className={styles.nickname}>@{user.nickname}</p>
                </div>
              </div>
              <ButtonAction user={user} />
            </div>
            <p className={styles.bio}>{user.bio}</p>
          </li>
        ))
      )}

      {/* ====== MODALS ====== */}
      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}
    </ul>
  );
};

export default Following;
