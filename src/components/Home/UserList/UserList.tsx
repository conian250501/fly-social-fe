/* eslint-disable react/display-name */
import InputSearchUser from "@/components/InputSearchUser";
import Loading from "@/components/Loading";
import ModalError from "@/components/Modal/ModalError";
import { PATHS } from "@/contanst/paths";
import { followUser } from "@/features/follow/followAction";
import { IError, IUser } from "@/features/interface";
import { getAllUserDontFollowing } from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import PrivacyList from "./components/PrivacyList";
import styles from "./userList.module.scss";
type Props = {};

const UserList = React.memo((props: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { page: page, totalPage } = useAppSelector(
    (state: RootState) => state.user
  );

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [userFollowActive, setUserFollowActive] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const res = await dispatch(
        getAllUserDontFollowing({
          userId: Number(user?.id),
          filter: { page: 1, limit: 4 },
        })
      ).unwrap();

      setUsers(res.users);

      setLoading(false);
    }

    if (user) {
      getData();
    }
  }, [dispatch]);

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
          userId: Number(user?.id),
          filter: { page: Number(page) + 1, limit: 4 },
        })
      ).unwrap();

      setUsers([...users, ...res.users]);
      setLoadingLoadMore(false);
    } catch (error) {
      setLoadingLoadMore(false);
    }
  };

  const handleFollow = async (userId: number) => {
    try {
      setLoadingFollow(true);
      setUserFollowActive(userId);

      await dispatch(followUser(Number(userId))).unwrap();

      const newUsers = users.filter((user) => user.id !== userId);
      setUsers(newUsers);

      setLoadingFollow(false);
    } catch (error) {
      setError(error as IError);
      setLoadingFollow(false);
    }
  };

  return (
    <div>
      <div className={styles.userListWrapper}>
        {user && <InputSearchUser />}
        {loading ? (
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 pb-4">
            <Loading />
          </div>
        ) : (
          <div className={styles.userList}>
            <h1 className={styles.heading}>Who to follow</h1>
            {!user ? (
              <h1 className={styles.textWithoutUser}>
                <Link href={PATHS.LoginPage}>Login</Link> to find more friend
              </h1>
            ) : (
              <>
                {users.map((user) => (
                  <div className={styles.userItem} key={user.id}>
                    <Link
                      href={`${PATHS.Profile}/${user.id}`}
                      className="d-flex align-items-center justify-content-start gap-3 text-decoration-none"
                    >
                      <img
                        src={
                          user.avatar
                            ? user.avatar
                            : "/images/avatar-placeholder.png"
                        }
                        alt=""
                        className={styles.avatar}
                      />
                      <div className={styles.info}>
                        <div className="d-flex align-items-center justify-content-start gap-2">
                          <h4 className={styles.name}>{user.name}</h4>
                          {!user.verified && (
                            <img
                              src="/icons/twitter-verified-badge.svg"
                              alt=""
                              className={styles.iconVerified}
                            />
                          )}
                        </div>
                        {user.nickname && (
                          <p className={styles.nickname}>@{user.nickname}</p>
                        )}
                      </div>
                    </Link>
                    <button
                      type="button"
                      className={styles.btnFollow}
                      disabled={loadingFollow}
                      onClick={() => handleFollow(user.id)}
                    >
                      {loadingFollow && userFollowActive === user.id ? (
                        <AiOutlineLoading className={styles.iconLoading} />
                      ) : (
                        "Follow"
                      )}
                    </button>
                  </div>
                ))}
                {!lastPage && (
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
              </>
            )}
          </div>
        )}
        <PrivacyList />
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
});

export default UserList;
