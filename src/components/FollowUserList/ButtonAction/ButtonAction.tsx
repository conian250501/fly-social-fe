import { ETypeFollowUserList } from "@/components/interfaces";
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
import styles from "./buttonAction.module.scss";

const ButtonAction: FC<{
  user: IUser;
  currentUserId: number;
  type: ETypeFollowUserList;
}> = ({ currentUserId, user, type }) => {
  const dispatch = useAppDispatch();

  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);

  const followers: IUser[] = [];

  for (const follower of user.followers) {
    followers.push(follower.user);
  }
  const { isFollowed: _isFollowed } = useCheckFollowed(followers);

  useEffect(() => {
    setIsFollowed(_isFollowed);
  }, [_isFollowed]);

  const handleFollow = async (userId: number) => {
    try {
      setLoadingFollow(true);

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

      await dispatch(unFollowUser(Number(userId))).unwrap();

      setIsFollowed(false);
      setLoadingFollow(false);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

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
      {/* ====== MODALS ====== */}
      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}
    </React.Fragment>
  );
};
export default ButtonAction;
