/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import ModalError from "@/components/Modal/ModalError";
import FormSearchUser from "@/components/UserConnectList/components/FormSearchUser/FormSearchUser";
import { newConversation } from "@/features/conversation/conversationAction";
import { IError, IUser } from "@/features/interface";
import {
  getAllUserDontFollowing,
  getAllUsers,
} from "@/features/user/userAction";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineLoading } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import styles from "./formNewConversation.module.scss";
import { useRouter } from "next/navigation";
import { PATHS } from "@/contanst/paths";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const FormNewConversation = React.memo(({ isOpen, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [loadingNewConversation, setLoadingNewConversation] =
    useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [error, setError] = useState<IError | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [participantsActive, setParticipantsActive] = useState<IUser[]>([]);

  const debounceValue = useDebounce(searchValue, 500);

  const handleGetAllUsers = useCallback(async () => {
    try {
      setLoading(true);

      const res = await dispatch(
        getAllUsers({ page: 1, limit: 4, name: searchValue })
      ).unwrap();

      setUsers(res.users);
      setPage(res.page);
      setTotalPage(res.totalPage);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (currentUser) {
      handleGetAllUsers();
      setLastPage(false);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (page > 0 && page === totalPage) {
      setLastPage(true);
    }
  }, [page]);

  const handleLoadMore = async () => {
    try {
      setLoadingLoadMore(true);
      setPage(page + 1);

      const res = await dispatch(
        getAllUsers({ page: Number(page) + 1, limit: 4, name: searchValue })
      ).unwrap();

      setUsers([...users, ...res.users]);
      setLoadingLoadMore(false);
    } catch (error) {
      setLoadingLoadMore(false);
    }
  };

  const handleAddNewConversation = async () => {
    try {
      const participantIds = participantsActive.map((item) => item.id);
      setLoadingNewConversation(true);
      const conversation = await dispatch(
        newConversation({
          participantIds: participantIds,
        })
      ).unwrap();

      handleClose();
      router.push(`${PATHS.Messages}/${conversation.id}`);
    } catch (error) {
      setError(error as IError);
      setLoadingNewConversation(false);
    }
  };

  const handleSelectParticipant = (user: IUser) => {
    setParticipantsActive([...participantsActive, user]);
  };
  const handleRemoveParticipant = (user: IUser) => {
    setParticipantsActive(
      [...participantsActive].filter((item) => item.id !== user.id)
    );
  };
  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      scrollable={true}
      contentClassName={styles.modalContent}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center justify-content-start gap-3">
          <div className={styles.iconClose} onClick={handleClose}>
            <CgClose className={styles.icon} />
          </div>
          <h1 className={styles.heading}>New message</h1>
        </div>
        <button
          type="button"
          className={`${styles.btnNext} ${
            participantsActive.length <= 0 ? styles.disabled : ""
          }`}
          onClick={handleAddNewConversation}
          disabled={participantsActive.length <= 0 || loadingNewConversation}
        >
          {loadingNewConversation ? (
            <ProgressSpinner
              strokeWidth="4"
              style={{ width: 20, height: 20 }}
            />
          ) : (
            "Next"
          )}
        </button>
      </div>

      <div className={styles.userListWrapper}>
        <FormSearchUser
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <ul className={styles.participantList}>
          {participantsActive.map((item) => (
            <li key={item.id} className={styles.participantItem}>
              <div className="d-flex align-items-center justify-content-start gap-2">
                <div className={styles.avatar}>
                  <img
                    src={
                      item.avatar
                        ? item.avatar
                        : "/images/avatar-placeholder.png"
                    }
                    alt=""
                  />
                </div>
                <div className={styles.name}>{item.name}</div>
              </div>
              <div
                className={styles.iconRemoveParticipant}
                onClick={() => handleRemoveParticipant(item)}
              >
                <CgClose className={styles.icon} />
              </div>
            </li>
          ))}
        </ul>

        {loading ? (
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 pb-4">
            <Loading />
          </div>
        ) : (
          <div className={styles.userList}>
            {users.length <= 0 ? (
              <div className={styles.noneDataWrapper}>
                <img src="/images/birds.png" className={styles.banner} alt="" />
                <h1 className={styles.title}>
                  Name of user you want search correct?
                </h1>
              </div>
            ) : (
              users.map((user) => (
                <div
                  role="button"
                  className={`${styles.userItem} ${
                    participantsActive.includes(user) ? styles.active : ""
                  }`}
                  key={user.id}
                  onClick={() => {
                    if (participantsActive.includes(user)) {
                      handleRemoveParticipant(user);
                    } else {
                      handleSelectParticipant(user);
                    }
                  }}
                >
                  <div className="d-flex align-items-center justify-content-start gap-3 text-decoration-none">
                    <div className="position-relative">
                      <img
                        src={
                          user.avatar
                            ? user.avatar
                            : "/images/avatar-placeholder.png"
                        }
                        alt=""
                        className={styles.avatar}
                      />
                      {user.verified && (
                        <img
                          src="/icons/twitter-verified-badge.svg"
                          alt=""
                          className={styles.iconVerified}
                        />
                      )}
                    </div>
                    <div className={styles.info}>
                      <div className="d-flex align-items-center justify-content-start gap-2 position-relative">
                        <h4 className={styles.name}>{user.name}</h4>
                      </div>
                      {user.nickname && (
                        <p className={styles.nickname}>@{user.nickname}</p>
                      )}
                      {user.bio && <p className={styles.bio}>{user.bio}</p>}
                    </div>
                  </div>
                  {participantsActive.includes(user) && (
                    <div className={styles.iconCheck}>
                      <BsCheckLg className={styles.icon} />
                    </div>
                  )}
                </div>
              ))
            )}
            {!lastPage && users.length > 0 && (
              <button
                type="button"
                onClick={handleLoadMore}
                className={styles.btnLoadMore}
                disabled={loadingLoadMore}
              >
                {loadingLoadMore ? (
                  <AiOutlineLoading className={styles.iconLoading} />
                ) : (
                  "Show more"
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}
    </Modal>
  );
});

export default FormNewConversation;
