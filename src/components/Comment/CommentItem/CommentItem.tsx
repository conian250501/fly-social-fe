/* eslint-disable @next/next/no-img-element */
import {
  deleteComment,
  getAllByTweet,
} from "@/app/features/comment/commentAction";
import { IComment, IError } from "@/app/features/interface";
import { useAppDispatch } from "@/app/redux/hooks";
import { ETypeCommentSetting } from "@/components/interfaces";
import ModalError from "@/components/Modal/ModalError";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import ActionModal from "@/components/shared/ActionModal";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import React, { FC, ReactNode, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { RxUpdate } from "react-icons/rx";
import { TbDots, TbGitBranchDeleted } from "react-icons/tb";
import ButtonsAction from "../ButtonsAction";
import FormEditComment from "../FormEditComment";
import styles from "./commentItem.module.scss";
type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  const { isAuthor } = useCheckAuthor(comment.user.id);
  const dispatch = useAppDispatch();

  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [menuSettings, setMenuSettings] = useState<
    { id: string; type: ETypeCommentSetting; title: string; icon: ReactNode }[]
  >([
    {
      id: nanoid(),
      type: ETypeCommentSetting.Update,
      title: "Update tweet",
      icon: <RxUpdate className={styles.icon} />,
    },
    {
      id: nanoid(),
      type: ETypeCommentSetting.Delete,
      title: "Delete tweet",
      icon: <TbGitBranchDeleted className={styles.icon} />,
    },
  ]);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const handleActionSetting = (
    e: React.MouseEvent<HTMLLIElement>,
    type: ETypeCommentSetting
  ) => {
    e.stopPropagation();
    if (type === ETypeCommentSetting.Update) {
      setOpenFormEdit(true);
      return;
    }
    if (type === ETypeCommentSetting.Delete) {
      setOpenConfirmDelete(true);
      return;
    }
  };

  const handleDeleteComment = async () => {
    try {
      setLoadingDelete(true);
      await dispatch(deleteComment(comment.id)).unwrap();
      await dispatch(getAllByTweet(comment.tweet.id)).unwrap();
      setLoadingDelete(false);
      setOpenConfirmDelete(false);
      setDeleteSuccess(true);
    } catch (error) {
      setLoadingDelete(false);
      setError(error as IError);
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

  if (deleteSuccess) {
    return (
      <ModalSuccess
        isOpen={deleteSuccess}
        handleClose={() => setDeleteSuccess(false)}
        message="Updated tweet successfully"
      />
    );
  }

  const MenuSettings: FC = () => {
    return (
      <React.Fragment>
        <ul className={styles.menuSettingList}>
          {menuSettings.map((item) => (
            <li
              key={item.id}
              className={`${styles.menuSettingItem} ${
                item.type === ETypeCommentSetting.Update ? styles.update : ""
              } ${
                item.type === ETypeCommentSetting.Delete ? styles.delete : ""
              }`}
              onClick={(e) => handleActionSetting(e, item.type)}
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
    <div key={comment.id} className={styles.commentItem}>
      <div className={styles.avatarAuthor}>
        <img
          src={
            comment.user.avatar
              ? comment.user.avatar
              : "/images/avatar-placeholder.png"
          }
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.commentInfo}>
        <div className={styles.authorInfo}>
          <div className="d-flex align-items-center justify-content-start gap-2">
            <h5 className={styles.name}>{comment.user.name}</h5>
            {comment.user.nickname && (
              <p className={styles.nickname}>{comment.user.nickname}</p>
            )}
            <p className={styles.createdAt}>
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
          {isAuthor && (
            <OverlayTrigger
              trigger="focus"
              placement="left"
              overlay={
                <Popover className={styles.popover}>
                  <MenuSettings />
                </Popover>
              }
            >
              <button className={styles.btnDot}>
                <TbDots className={styles.dotIcon} />
              </button>
            </OverlayTrigger>
          )}
        </div>
        {comment.content && <p className={styles.content}>{comment.content}</p>}
        {comment.image && (
          <img src={comment.image} alt="" className={styles.image} />
        )}
        {comment.video && (
          <video src={comment.video} controls className={styles.image} />
        )}
        <ButtonsAction comment={comment} />
      </div>

      <FormEditComment
        open={openFormEdit}
        comment={comment}
        handleClose={() => setOpenFormEdit(false)}
      />

      <ActionModal
        show={openConfirmDelete}
        close={() => setOpenConfirmDelete(false)}
        imagePath="/images/modal-delete.svg"
        action={handleDeleteComment}
        buttonText="Delete"
        title="Delete Comment"
        confirmText="Are you sure delete this comment?"
        loadingAction={loadingDelete}
        setLoadingAction={setLoadingDelete}
      />
    </div>
  );
};

export default CommentItem;
