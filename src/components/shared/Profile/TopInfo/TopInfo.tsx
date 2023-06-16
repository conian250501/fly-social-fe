/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/app/features/interface";
import { PATHS } from "@/contanst/paths";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "react-bootstrap";
import styles from "./topInfo.module.scss";
type Props = {
  user: IUser | null;
};

const TopInfo = ({ user }: Props) => {
  const { isMe } = useCheckIsMe(Number(user?.id));

  const ButtonAction: FC = () => {
    return (
      <React.Fragment>
        <div className={styles.btnWrapper}>
          {isMe ? (
            <button
              type="button"
              className={`${styles.btn} ${styles.editProfile}`}
            >
              Edit profile
            </button>
          ) : (
            <button type="button" className={`${styles.btn} ${styles.follow}`}>
              Following
            </button>
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
        <ButtonAction />
      </div>

      <div className={styles.generalInfo}>
        <h1 className={styles.name}>{user?.name}</h1>
        {!user?.nickname && (
          <p className={styles.nickname}>{user?.nickname}asdads</p>
        )}
        {!user?.bio && (
          <p className={styles.bio}>
            {user?.bio}Consultant. Sharing coding tips. I help devs grow.
            Teaching software dev: http://pluralsight.com Helping teams switch
            to React: http://reactjsconsulting.coms
          </p>
        )}

        <div className="d-flex align-items-center justify-content-start gap-4">
          <Link href={PATHS.ProfileFollowing} className={styles.countFollow}>
            <span>123</span> Following
          </Link>
          <Link href={PATHS.ProfileFollowing} className={styles.countFollow}>
            <span>123</span> Followers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
