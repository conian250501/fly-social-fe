/* eslint-disable @next/next/no-img-element */
import { IError, ITweet } from "@/app/features/interface";
import { PATHS } from "@/contanst/paths";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { TbDots } from "react-icons/tb";
import styles from "./tweetDetail.module.scss";
import ButtonsAction from "../Home/TabsTweetList/components/ButtonsAction";
import moment from "moment";
import FormComment from "../Comment/FormComment";
import CommentList from "../Comment/CommentList";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { RxUpdate } from "react-icons/rx";
import { TbGitBranchDeleted } from "react-icons/tb";
import { ETypeTweetSetting } from "../interfaces";
import FormEditTweet from "./components/FormEditTweet/FormEditTweet";
import ActionModal from "../shared/ActionModal/ActionModal";
import { GiWorld } from "react-icons/gi";
import { FaUserSecret } from "react-icons/fa";
import { useAppDispatch } from "@/app/redux/hooks";
import { deleteTweet } from "@/app/features/tweet/tweetAction";
import ModalError from "../Modal/ModalError/ModalError";
import { useRouter } from "next/navigation";
import { deleteTweetSuccess } from "@/app/features/tweet/tweetSlice";
import { ETypeFormEditTweet } from "../interfaces/formEditTweet.interface";

type Props = { tweet: ITweet | null };

const TweetDetail = ({ tweet }: Props) => {
  const { isAuthor } = useCheckAuthor(Number(tweet?.user.id));
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [openTweetSettings, setOpenTweetSettings] = useState<boolean>(false);
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

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

  useEffect(() => {
    async function handleCloseTweetSettings() {
      setOpenTweetSettings(false);
    }
    window.addEventListener("click", handleCloseTweetSettings);

    return () => {
      window.removeEventListener("click", handleCloseTweetSettings);
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

  const handleDeleteTweet = async () => {
    try {
      setLoadingDelete(true);
      await dispatch(deleteTweet(Number(tweet?.id))).unwrap();
      router.push(PATHS.Home);
      setLoadingDelete(false);
      dispatch(deleteTweetSuccess());
    } catch (error) {
      setLoadingDelete(false);
      setError(error as IError);
    }
  };

  const handleBackPage = () => {
    router.back();
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

  if (!tweet)
    return (
      <div>
        <h1>Tweet doest exist</h1>
      </div>
    );
  return (
    <div className={styles.tweetDetailContainer}>
      <div onClick={handleBackPage} className={styles.backLink}>
        <div className={styles.iconBack}>
          <BsArrowLeft className={styles.icon} />
        </div>
        Tweet
      </div>
      <div className={styles.userInfo}>
        <div className="d-flex align-items-center justify-content-start gap-3">
          <img
            src={
              tweet.user.avatar
                ? tweet.user.avatar
                : "/images/avatar-placeholder.png"
            }
            alt=""
            className={styles.avatar}
          />
          <div className={styles.info}>
            <h6 className={styles.name}>{tweet.user.name}</h6>
            <p className={styles.nickname}>
              {tweet.user.nickname ? tweet.user.nickname : ""}
            </p>
          </div>
          <div className={styles.dateCreated}>
            {moment(tweet.createdAt).fromNow()}
          </div>
          <div className={styles.audienceIcon}>
            {tweet.isPrivate ? (
              <FaUserSecret className={styles.icon} />
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

      {/* CONTENT */}
      {tweet.content && <p className={styles.content}>{tweet.content}</p>}

      {/* IMAGE */}
      {tweet.image && (
        <img src={tweet.image} className={styles.image} alt="tweet-image" />
      )}
      <div className={`${styles.lineDivide}`}></div>

      {/* BUTTON ACTION */}
      <ButtonsAction tweet={tweet} />

      <div className={styles.lineDivide}></div>

      {/* FORM COMMENT */}
      <div className="mt-3 mb-3">
        <FormComment tweet={tweet} />
      </div>
      <div className={`${styles.lineDivide}`}></div>

      {/* COMMENT LIST */}
      <div className="mt-4">
        <CommentList tweet={tweet} />
      </div>

      {/* ====== MODALS ====== */}
      <FormEditTweet
        open={openFormEdit}
        handleClose={() => setOpenFormEdit(false)}
        tweet={tweet}
        type={ETypeFormEditTweet.TweetDetail}
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

export default TweetDetail;
