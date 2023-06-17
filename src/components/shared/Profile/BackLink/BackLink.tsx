/* eslint-disable react/display-name */
import { IUser } from "@/app/features/interface";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./backLink.module.scss";

type Props = {
  user: IUser | null;
};

const BackLink = React.memo(({ user }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div onClick={() => router.back()} className={styles.iconArrow}>
        <BsArrowLeft className={styles.icon} />
      </div>
      <div className={styles.userInfo}>
        <h1 className={styles.name}>{user?.name}</h1>
        <div className={styles.countTweet}>{user?.tweets.length} Tweets</div>
      </div>
    </div>
  );
});

export default BackLink;
