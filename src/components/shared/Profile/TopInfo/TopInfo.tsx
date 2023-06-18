/* eslint-disable @next/next/no-img-element */
import { followUser, unFollowUser } from "@/app/features/follow/followAction";
import { IError, IUser } from "@/app/features/interface";
import { useAppDispatch } from "@/app/redux/hooks";
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

const TopInfo = ({ user }: Props) => {
  const { isMe } = useCheckIsMe(Number(user?.id));
  const { isFollowed: _isFollowed } = useCheckFollowed(Number(user?.id));

  const dispatch = useAppDispatch();

  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    setIsFollowed(_isFollowed);
  }, []);

  console.log({ _isFollowed });

  const handleFollow = async () => {
    try {
      setLoadingFollow(true);
      await dispatch(followUser(Number(user?.id))).unwrap();
      setLoadingFollow(false);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  const handleUnFollow = async () => {
    try {
      setLoadingFollow(true);
      await dispatch(unFollowUser(Number(user?.id))).unwrap();

      setLoadingFollow(false);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  if (error) {
    return (
      <ModalError
        isOpen={Boolean(error)}
        handleClose={() => setError(null)}
        message={error.message}
      />
    );
  }

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
                  className={`${styles.btn} ${styles.follow}`}
                  onClick={handleUnFollow}
                  disabled={loadingFollow}
                >
                  Un Follow
                </button>
              ) : (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.follow}`}
                  onClick={handleFollow}
                  disabled={loadingFollow}
                >
                  Following
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
            <span>123</span> Following
          </Link>
          <Link href={PATHS.ProfileFollowing} className={styles.countFollow}>
            <span>123</span> Followers
          </Link>
        </div>
      </div>

      <FormEditProfile
        isOpen={openFormEdit}
        handleClose={() => setOpenFormEdit(false)}
        user={user as IUser}
      />
    </div>
  );
};

export default TopInfo;
