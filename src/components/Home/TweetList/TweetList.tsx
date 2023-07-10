/* eslint-disable @next/next/no-img-element */
import {
  ETweetStatus,
  IError,
  IPayloadTweet,
  ITweet,
} from "@/features/interface";
import {
  clearIsDeleted,
  deleteTweetSuccess,
} from "@/features/tweet/tweetSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { PATHS } from "@/contanst/paths";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";
import { GiWorld } from "react-icons/gi";
import Loading from "../../Loading";
import ButtonsAction from "../TabsTweetList/components/ButtonsAction";
import styles from "./tweetList.module.scss";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import { TbDots, TbGitBranchDeleted } from "react-icons/tb";
import { nanoid } from "@reduxjs/toolkit";
import { ETypeTweetSetting } from "@/components/interfaces";
import { RxUpdate } from "react-icons/rx";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import FormEditTweet from "@/components/TweetDetail/components/FormEditTweet";
import ActionModal from "@/components/shared/ActionModal";
import ModalError from "@/components/Modal/ModalError";
import { deleteTweet, update } from "@/features/tweet/tweetAction";
import TweetDetail from "@/components/Modal/TweetDetail";

type Props = { tweets: ITweet[] };

const TweetList = ({ tweets }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isDeleted } = useAppSelector((state: RootState) => state.tweet);
  const [tweetList, setTweetList] = useState<ITweet[]>(tweets);

  useEffect(() => {
    setTweetList(tweets);
  }, [tweets]);

  const handleCloseModalSuccessDeletedTweet = useCallback(() => {
    dispatch(clearIsDeleted());
  }, []);

  // ====== TWEET ITEM ======
  const TweetItem: FC<{ tweet: ITweet }> = ({ tweet }) => {
    const { isAuthor } = useCheckAuthor(Number(tweet?.user.id));

    const [openTweetSettings, setOpenTweetSettings] = useState<boolean>(false);
    const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [error, setError] = useState<IError | null>(null);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [openTweetDetail, setOpenTweetDetail] = useState<boolean>(false);

    const [tweetSettings, setTweetSettings] = useState<
      { id: string; type: ETypeTweetSetting; title: string; icon: ReactNode }[]
    >([
      // {
      //   id: nanoid(),
      //   type: ETypeTweetSetting.Update,
      //   title: "Update tweet",
      //   icon: <RxUpdate className={styles.icon} />,
      // },
      {
        id: nanoid(),
        type: ETypeTweetSetting.Delete,
        title: "Delete tweet",
        icon: <TbGitBranchDeleted className={styles.icon} />,
      },
    ]);

    useEffect(() => {
      const handleCloseSetting = () => {
        setOpenTweetSettings(false);
      };
      window.addEventListener("click", handleCloseSetting);
      return () => {
        window.removeEventListener("click", handleCloseSetting);
      };
    }, []);

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

    const handleDeleteTweet = async (tweetId: number) => {
      try {
        setLoadingDelete(true);
        await dispatch(
          update({
            id: tweetId,
            payload: { status: ETweetStatus.Archived } as IPayloadTweet,
          })
        ).unwrap();
        const newTweets = [...tweetList].filter(
          (tweet) => tweet.id !== tweetId
        );
        setTweetList(newTweets);

        setOpenConfirmDelete(false);
        setLoadingDelete(false);
        dispatch(deleteTweetSuccess());
      } catch (error) {
        setLoadingDelete(false);
        setError(error as IError);
      }
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
                } ${
                  item.type === ETypeTweetSetting.Delete ? styles.delete : ""
                }`}
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
            <div className="d-flex align-items-start justify-content-start gap-3">
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
          <div className={styles.tweetInfo}>
            <Link href={`${PATHS.Tweets}/${tweet.id}`}>
              {tweet.content && (
                <p className={styles.content}>{tweet.content}</p>
              )}
            </Link>
            <div onClick={() => setOpenTweetDetail(true)}>
              {tweet.image && (
                <img src={tweet.image} alt="" className={styles.image} />
              )}
            </div>
          </div>
          <ButtonsAction tweet={tweet} />
        </div>

        {/* ====== MODALS ====== */}
        <FormEditTweet
          open={openFormEdit}
          handleClose={() => setOpenFormEdit(false)}
          tweet={tweet}
        />

        <ActionModal
          show={openConfirmDelete}
          close={() => setOpenConfirmDelete(false)}
          imagePath="/images/modal-delete.svg"
          action={() => handleDeleteTweet(Number(tweet.id))}
          buttonText="Delete"
          title="Delete Tweet"
          confirmText="Are you sure delete this tweet?"
          loadingAction={loadingDelete}
          setLoadingAction={setLoadingDelete}
        />

        {error && (
          <ModalError
            isOpen={Boolean(error)}
            handleClose={() => setError(null)}
            message={error.message}
          />
        )}

        <TweetDetail
          tweet={tweet}
          isOpen={openTweetDetail}
          handleClose={() => setOpenTweetDetail(false)}
        />
      </div>
    );
  };

  // ====== TWEET LIST ======
  return (
    <div className={styles.tweetList}>
      {tweetList && tweetList.length <= 0 ? (
        <div>
          <h1 className={styles.noneText}>App does&apos;t anything tweet</h1>
        </div>
      ) : (
        <>
          {tweetList?.map((tweet) => (
            <TweetItem tweet={tweet} key={tweet.id} />
          ))}
        </>
      )}

      {/* ====== MODALS ====== */}
      <ModalSuccess
        isOpen={isDeleted}
        handleClose={handleCloseModalSuccessDeletedTweet}
        message={`Deleted tweet successfully`}
      />
    </div>
  );
};

export default TweetList;
