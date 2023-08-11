/* eslint-disable react/display-name */
import InputSearchUser from "@/components/InputSearchUser";
import Loading from "@/components/Loading";
import ModalError from "@/components/Modal/ModalError";
import { PATHS } from "@/contanst/paths";
import { followUser } from "@/features/follow/followAction";
import { IError, IUser } from "@/features/interface";
import { getAllUserDontFollowing } from "@/features/user/userAction";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import ButtonAction from "../FollowUserList/ButtonAction";
import FormSearchUser from "./components/FormSearchUser";
import styles from "./userConnectList.module.scss";
type Props = {};

const UserList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { page: page, totalPage } = useAppSelector(
    (state: RootState) => state.user
  );

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const res = await dispatch(
          getAllUserDontFollowing({
            userId: Number(currentUser?.id),
            filter: { page: 1, limit: 4, name: searchValue },
          })
        ).unwrap();

        setUsers(res.users);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    if (currentUser) {
      getData();
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
      const res = await dispatch(
        getAllUserDontFollowing({
          userId: Number(currentUser?.id),
          filter: { page: Number(page) + 1, limit: 4 },
        })
      ).unwrap();

      setUsers([...users, ...res.users]);
      setLoadingLoadMore(false);
    } catch (error) {
      setLoadingLoadMore(false);
    }
  };

  return (
    <div>
      <div className={styles.userListWrapper}>
        <h1 className={styles.heading}>Suggested for you</h1>
        <FormSearchUser
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
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
                <div className={styles.userItem} key={user.id}>
                  <Link
                    href={`${PATHS.Profile}/${user.id}`}
                    className="d-flex align-items-center  justify-content-start gap-3 text-decoration-none"
                  >
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
                  </Link>
                  <ButtonAction
                    user={user}
                    currentUserId={Number(currentUser?.id)}
                  />
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
    </div>
  );
};

export default UserList;
