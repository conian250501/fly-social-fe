/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { followUser, unFollowUser } from "@/app/features/follow/followAction";
import { IError, IUser } from "@/app/features/interface";
import {
  getAllUserFollowers,
  getAllUserFollowing,
  getUserById,
} from "@/app/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import FormEditProfile from "@/components/Modal/FormEditProfile";
import ModalError from "@/components/Modal/ModalError";
import { PATHS } from "@/contanst/paths";
import { useCheckFollowed } from "@/hooks/useCheckFollowed";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import styles from "./topInfo.module.scss";

type Props = {
  user: IUser | null;
};

const TopInfo = React.memo(({ user }: Props) => {
  const { isMe } = useCheckIsMe(Number(user?.id));

  const dispatch = useAppDispatch();
  const { usersFollower, usersFollowing } = useAppSelector(
    (state: RootState) => state.user
  );
  const { isFollowed: _isFollowed } = useCheckFollowed(usersFollower);

  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    setIsFollowed(_isFollowed);
  }, [_isFollowed]);

  const handleFollow = async () => {
    try {
      setLoadingFollow(true);

      await dispatch(followUser(Number(user?.id))).unwrap();
      await dispatch(getAllUserFollowers(Number(user?.id))).unwrap();
      await dispatch(getAllUserFollowing(Number(user?.id))).unwrap();

      setLoadingFollow(false);
      setIsFollowed(true);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  const handleUnFollow = async () => {
    try {
      setLoadingFollow(true);

      await dispatch(unFollowUser(Number(user?.id))).unwrap();
      await dispatch(getAllUserFollowers(Number(user?.id))).unwrap();
      await dispatch(getAllUserFollowing(Number(user?.id))).unwrap();

      setIsFollowed(false);
      setLoadingFollow(false);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  const ButtonsAction: FC = () => {
    return (
      <React.Fragment>
        <div className={styles.btnWrapper}>
          {isMe ? (
            <button
              type="button"
              className={`${styles.btn} ${styles.editProfile}`}
              onClick={() => setOpenFormEdit(true)}
            >
              Edit profile
            </button>
          ) : (
            <>
              {isFollowed ? (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.unFollow}`}
                  onClick={handleUnFollow}
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
                  onClick={handleFollow}
                  disabled={loadingFollow}
                >
                  {loadingFollow ? "..." : "Follow"}
                </button>
              )}
            </>
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.coverImage}>
        {user?.cover ? (
          <img src={user?.cover} alt="cover-image" />
        ) : (
          <div className={styles.placeholderCover}></div>
        )}
      </div>
      <div className={styles.actionInfo}>
        <div className={styles.avatar}>
          <img
            src={user?.avatar ? user?.avatar : "/images/avatar-placeholder.png"}
            alt=""
          />
        </div>
        <ButtonsAction />
      </div>

      <div className={styles.generalInfo}>
        <h1 className={styles.name}>{user?.name}</h1>
        {user?.nickname && <p className={styles.nickname}>@{user?.nickname}</p>}
        {user?.bio && <p className={styles.bio}>{user?.bio}</p>}

        <div className="d-flex align-items-center justify-content-start gap-3 mb-4">
          {user?.address && (
            <div className={styles.address}>
              <MdOutlineLocationOn className={styles.icon} />
              <p className={styles.text}>{user.address}</p>
            </div>
          )}
          {user?.website && (
            <div className={styles.website}>
              <AiOutlineLink className={styles.icon} />
              <a
                href={`https://${user.website}`}
                target="_blank"
                className={styles.text}
              >
                {user.website}
              </a>
            </div>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-start gap-4">
          <Link href={PATHS.ProfileFollowing} className={styles.countFollow}>
            <span>{usersFollowing.length}</span> Following
          </Link>
          <Link href={PATHS.ProfileFollowing} className={styles.countFollow}>
            <span>{usersFollower.length}</span> Followers
          </Link>
        </div>
      </div>

      <FormEditProfile
        isOpen={openFormEdit}
        handleClose={() => setOpenFormEdit(false)}
        user={user as IUser}
      />

      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}
    </div>
  );
});

export default TopInfo;
