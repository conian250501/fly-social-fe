import { IError, ITweet } from "@/app/features/interface";
import { deleteTweet } from "@/app/features/tweet/tweetAction";
import { deleteTweetSuccess } from "@/app/features/tweet/tweetSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import ButtonsAction from "@/components/Home/TabsTweetList/components/ButtonsAction";
import { ETypeTweetSetting } from "@/components/interfaces";
import { ETypeFormEditTweet } from "@/components/interfaces/formEditTweet.interface";
import ModalError from "@/components/Modal/ModalError";
import ActionModal from "@/components/shared/ActionModal";
import FormEditTweet from "@/components/TweetDetail/components/FormEditTweet";
import { PATHS } from "@/contanst/paths";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { TbDots, TbGitBranchDeleted } from "react-icons/tb";
import styles from "./tweetItem.module.scss";
type Props = {
  tweet: ITweet;
};

const TweetItem = ({ tweet }: Props) => {
  const { isAuthor } = useCheckAuthor(Number(tweet?.user.id));
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    async function handleCloseTweetSettings() {
      setOpenTweetSettings(false);
    }
    window.addEventListener("click", handleCloseTweetSettings);

    return () => {
      window.removeEventListener("click", handleCloseTweetSettings);
    };
  }, []);

  const handleMoveDetailPage = (tweetId: number) => {
    router.push(`${PATHS.Tweets}/${tweetId}`);
  };

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

  const handleDeleteTweet = async () => {
    try {
      setLoadingDelete(true);
      await dispatch(deleteTweet(Number(tweet?.id))).unwrap();
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
    <div className={styles.tweetItem}>
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
        <div className="d-flex align-items-center justify-content-between">
          <Link
            href={`${PATHS.Profile}/${tweet.user.id}`}
            className={styles.authorInfo}
          >
            <h5 className={styles.name}>{tweet.user.name}</h5>
            {tweet.user.nickname && (
              <p className={styles.nickname}>{tweet.user.nickname}</p>
            )}
            <p className={styles.createdAt}>
              {moment(tweet.createdAt).fromNow()}
            </p>
          </Link>
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

      {/* ====== MODALS ====== */}
      <FormEditTweet
        open={openFormEdit}
        handleClose={() => setOpenFormEdit(false)}
        tweet={tweet}
        type={ETypeFormEditTweet.TweetListProfilePage}
      />

      <ActionModal
        show={openConfirmDelete}
        close={() => setOpenConfirmDelete(false)}
        imagePath="/images/modal-delete.svg"
        action={handleDeleteTweet}
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
    </div>
  );
};

export default TweetItem;
