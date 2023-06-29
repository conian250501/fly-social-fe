/* eslint-disable react/display-name */
import InputSearchUser from "@/components/InputSearchUser";
import Loading from "@/components/Loading";
import { PATHS } from "@/contanst/paths";
import { IUser } from "@/features/interface";
import { getAllUserDontFollowing } from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
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

  return (
    <div>
      <InputSearchUser />
      <div className={styles.userListWrapper}>
        <h1 className={styles.heading}>Who to follow</h1>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 pb-4">
            <Loading />
          </div>
        ) : (
          <div className={styles.userList}>
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
                    <h4 className={styles.name}>{user.name}</h4>
                    {user.nickname && (
                      <p className={styles.nickname}>@{user.nickname}</p>
                    )}
                  </div>
                </Link>
                <button type="button" className={styles.btnFollow}>
                  Follow
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
          </div>
        )}
      </div>
    </div>
  );
});

export default UserList;
