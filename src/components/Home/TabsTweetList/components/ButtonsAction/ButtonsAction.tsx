/* eslint-disable react/display-name */
import React from "react";
import styles from "./buttonsAction.module.scss";
import { ITweet } from "@/app/features/interface";
import { AiOutlineHeart } from "react-icons/ai";
import { BiBookmark, BiHeart, BiMessageSquare } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
type Props = {
  tweet: ITweet;
};

const ButtonsAction = React.memo(({ tweet }: Props) => {
  return (
    <div className={styles.btnList}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-4">
          <div className={styles.btnItem}>
            <div className={styles.iconItem}>
              <BiHeart className={`${styles.icon} ${styles.heart}`} />
            </div>
            <span>123</span>
          </div>
          <div className={styles.btnItem}>
            <Link
              href={`${PATHS.Tweets}/${tweet.id}`}
              className={styles.iconItem}
            >
              <BiMessageSquare className={`${styles.icon} ${styles.comment}`} />
            </Link>
            <span>123</span>
          </div>
        </div>
        <div className={styles.btnItem}>
          <div className={styles.iconItem}>
            <BiBookmark className={`${styles.icon} ${styles.save}`} />
          </div>
          <span>123</span>
        </div>
      </div>
    </div>
  );
});

export default ButtonsAction;
