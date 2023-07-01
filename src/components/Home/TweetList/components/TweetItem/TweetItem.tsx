/* eslint-disable react/display-name */
import { ITweet } from "@/features/interface";
import React, { FC, ReactNode, useState } from "react";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import { TbDots, TbGitBranchDeleted } from "react-icons/tb";
import { nanoid } from "@reduxjs/toolkit";
import { ETypeTweetSetting } from "@/components/interfaces";
import { RxUpdate } from "react-icons/rx";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import moment from "moment";
import Link from "next/link";
import { FiLock } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import Loading from "@/components/Loading";
import styles from "./tweetItem.module.scss";
import { PATHS } from "@/contanst/paths";
import { useRouter } from "next/router";
import ButtonsAction from "@/components/Home/TabsTweetList/components/ButtonsAction";

type Props = {
  tweet: ITweet;
};

const TweetItem = React.memo(({ tweet }: Props) => {
  const router = useRouter();
  const { isAuthor } = useCheckAuthor(Number(tweet?.user.id));

  const [openTweetSettings, setOpenTweetSettings] = useState<boolean>(false);
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  const [tweetSettings, setTweetSettings] = useState<
    { id: string; type: ETypeTweetSetting; title: string; icon: ReactNode }[]
  >([
    {
      id: nanoid(),
      type: ETypeTweetSetting.Update,
      title: "Update tweet",
      icon: <RxUpdate className={styles.icon} />,
    },
    {
      id: nanoid(),
      type: ETypeTweetSetting.Delete,
      title: "Delete tweet",
      icon: <TbGitBranchDeleted className={styles.icon} />,
    },
  ]);

  const handleActionTweetSetting = (
    e: React.MouseEvent<HTMLLIElement>,
    type: ETypeTweetSetting
  ) => {
    e.stopPropagation();
    if (type === ETypeTweetSetting.Update) {
      setOpenFormEdit(true);
      return;
    }
    if (type === ETypeTweetSetting.Delete) {
      setOpenConfirmDelete(true);
      return;
    }
  };

  const handleMoveDetailPage = (tweetId: number) => {
    router.push(`${PATHS.Tweets}/${tweetId}`);
  };

  const MenuSettingTweet: FC = () => {
    return (
      <React.Fragment>
        <ul className={styles.tweetSettingList}>
          {tweetSettings.map((item) => (
            <li
              key={item.id}
              className={`${styles.tweetSettingItem} ${
                item.type === ETypeTweetSetting.Update ? styles.update : ""
              } ${item.type === ETypeTweetSetting.Delete ? styles.delete : ""}`}
              onClick={(e) => handleActionTweetSetting(e, item.type)}
            >
              <div className={styles.settingIcon}>{item.icon}</div>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  };
  return (
    <div key={tweet.id} className={styles.tweetItem}>
      <Link
        href={`${PATHS.Profile}/${tweet.user.id}`}
        className={styles.avatarAuthor}
      >
        <img
          src={
            tweet.user.avatar
              ? tweet.user.avatar
              : "/images/avatar-placeholder.png"
          }
          alt=""
          className={styles.image}
        />
      </Link>
      <div className={styles.tweetInfoWrapper}>
        <div className={styles.authorInfo}>
          <div className="d-flex align-items-center justify-content-start gap-2">
            <Link href={`${PATHS.Profile}/${tweet.user.id}`}>
              <div className="d-flex align-items-center justify-content-start gap-2">
                <h4 className={styles.name}>{tweet.user.name}</h4>
                {tweet.user.verified && (
                  <img
                    src="/icons/twitter-verified-badge.svg"
                    alt=""
                    className={styles.iconVerified}
                  />
                )}
              </div>
              {tweet.user.nickname && (
                <p className={styles.nickname}>{tweet.user.nickname}</p>
              )}
            </Link>
            <p className={styles.createdAt}>
              {moment(tweet.createdAt).fromNow()}
            </p>
            <div className={styles.audienceIcon}>
              {tweet.isPrivate ? (
                <FiLock className={styles.icon} />
              ) : (
                <GiWorld className={styles.icon} />
              )}
            </div>
          </div>

          <div className="position-relative">
            {isAuthor && (
              <TbDots
                className={styles.dotIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenTweetSettings(!openTweetSettings);
                }}
              />
            )}
            {openTweetSettings && <MenuSettingTweet />}
          </div>
        </div>
        <div
          className={styles.tweetInfo}
          onClick={() => handleMoveDetailPage(tweet.id)}
        >
          {tweet.content && <p className={styles.content}>{tweet.content}</p>}
          <Link href={`${PATHS.Tweets}/${tweet.id}`}>
            {tweet.image && (
              <img src={tweet.image} alt="" className={styles.image} />
            )}
          </Link>
        </div>
        <ButtonsAction tweet={tweet} />
      </div>
    </div>
  );
});

export default TweetItem;
