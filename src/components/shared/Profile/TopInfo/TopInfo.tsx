/* eslint-disable @next/next/no-img-element */
import { IUser } from "@/app/features/interface";
import FormEditProfile from "@/components/Modal/FormEditProfile";
import { PATHS } from "@/contanst/paths";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import styles from "./topInfo.module.scss";

type Props = {
  user: IUser | null;
};

const TopInfo = ({ user }: Props) => {
  const { isMe } = useCheckIsMe(Number(user?.id));
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);

  const ButtonAction: FC = () => {
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
