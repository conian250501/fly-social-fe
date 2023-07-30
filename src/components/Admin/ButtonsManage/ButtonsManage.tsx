/* eslint-disable react/display-name */
import React, { FC, useState } from "react";
import styles from "./buttonsManage.module.scss";
import Link from "next/link";
import ActionModal from "@/components/shared/ActionModal/ActionModal";
import FormEditProfile from "@/components/Modal/FormEditProfile/FormEditProfile";
import {
  EUserStatus,
  IPayloadEditProfile,
  ITweet,
  IUser,
} from "@/features/interface";
import FormEditTweet from "@/components/TweetDetail/components/FormEditTweet/FormEditTweet";
import { useAppDispatch } from "@/redux/hooks";
import {
  archiveUser,
  getUserById,
  updateUser,
} from "@/features/admin/user/userAction";
import { archiveTweet } from "@/features/tweet/tweetAction";
import { useRouter } from "next/navigation";
import { PATHS } from "@/contanst/paths";
import ModalSuccess from "@/components/Modal/ModalSuccess/ModalSuccess";
import { archiveUserSuccess } from "@/features/admin/user/userSlice";
type Props = {
  link: string;
  user: IUser | null;
  tweet: ITweet | null;
  type: "User" | "Tweet";
};

const ButtonsManage = React.memo(({ link, user, tweet, type }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [openConfirmInActive, setOpenConfirmInActive] =
    useState<boolean>(false);
  const [openConfirmActive, setOpenConfirmActive] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingInActive, setLoadingInActive] = useState<boolean>(false);
  const [loadingActive, setLoadingActive] = useState<boolean>(false);

  const handleDeleteUser = async () => {
    try {
      setLoadingDelete(true);
      switch (type) {
        case "User":
          await dispatch(archiveUser(Number(user?.id))).unwrap();
          router.push(PATHS.AdminManageUsers);
          dispatch(archiveUserSuccess());
          break;
        case "Tweet":
          await dispatch(archiveTweet(Number(tweet?.id))).unwrap();
          router.push(PATHS.AdminManageTweets);
          dispatch(archiveUserSuccess());
          break;
        default:
          break;
      }
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  const handleInActiveUser = async () => {
    try {
      setLoadingInActive(true);

      await dispatch(
        updateUser({
          id: Number(user?.id),
          payload: {
            status: EUserStatus.InActive,
          } as IPayloadEditProfile,
        })
      ).unwrap();

      await dispatch(getUserById(Number(user?.id))).unwrap();

      setOpenConfirmInActive(false);
      setLoadingInActive(false);
    } catch (error) {
      setLoadingInActive(false);
    }
  };

  const handleActiveUser = async () => {
    try {
      setLoadingActive(true);

      await dispatch(
        updateUser({
          id: Number(user?.id),
          payload: {
            status: EUserStatus.Active,
          } as IPayloadEditProfile,
        })
      ).unwrap();
      await dispatch(getUserById(Number(user?.id))).unwrap();

      setOpenConfirmActive(false);
      setLoadingActive(false);
    } catch (error) {
      setLoadingActive(false);
    }
  };

  const ButtonActiveUser: FC = () => {
    return (
      <>
        {user?.status === EUserStatus.Active ? (
          <button
            type="button"
            className={`${styles.btnItem} ${styles.inactive}`}
            onClick={() => setOpenConfirmInActive(true)}
          >
            Inactive
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.btnItem} ${styles.active}`}
            onClick={() => setOpenConfirmActive(true)}
          >
            Active
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.btnList}>
      <button
        type="button"
        className={`${styles.btnItem} ${styles.delete}`}
        onClick={() => setOpenConfirmDelete(true)}
      >
        Delete
      </button>

      {type === "User" && <ButtonActiveUser />}

      <Link href={link} className={`${styles.btnItem} ${styles.edit}`}>
        Edit
      </Link>

      <ActionModal
        show={openConfirmDelete}
        close={() => setOpenConfirmDelete(false)}
        imagePath="/images/modal-delete.svg"
        action={() => handleDeleteUser()}
        buttonText="Archive"
        title={`Archive ${type}`}
        confirmText={`Are you sure delete this ${type}?`}
        loadingAction={loadingDelete}
        setLoadingAction={setLoadingDelete}
      />

      <ActionModal
        show={openConfirmInActive}
        close={() => setOpenConfirmInActive(false)}
        imagePath="/images/modal-delete.svg"
        action={() => handleInActiveUser()}
        buttonText="InActive"
        title={`InActive ${type}`}
        confirmText={`Are you sure inactive this ${type}?`}
        loadingAction={loadingInActive}
        setLoadingAction={setLoadingInActive}
      />

      <ActionModal
        show={openConfirmActive}
        close={() => setOpenConfirmActive(false)}
        imagePath="/images/modal-delete.svg"
        action={() => handleActiveUser()}
        buttonText="Active"
        title={`Active ${type}`}
        confirmText={`Are you sure active this ${type}?`}
        loadingAction={loadingActive}
        setLoadingAction={setLoadingActive}
      />
    </div>
  );
});

export default ButtonsManage;
