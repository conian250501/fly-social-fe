/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import { PATHS } from "@/contanst/paths";
import { IUser } from "@/features/interface";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./usersResult.module.scss";
type Props = {
  users: IUser[];
  loading: boolean;
};

const UsersResult = React.memo(({ users, loading }: Props) => {
  const UserList: FC = () => {
    return (
      <div className={`${styles.userList}`}>
        {users.length <= 0 ? (
          <>
            <h4 className={styles.searchTextPlaceHolder}>
              Try searching for people or keywords{" "}
            </h4>
          </>
        ) : (
          users.map((user) => (
            <Link
              href={`${PATHS.Profile}/${user.id}`}
              className={styles.userItem}
              key={user.id}
            >
              <img
                src={
                  user.avatar ? user.avatar : "/images/avatar-placeholder.png"
                }
                alt=""
                className={styles.avatar}
              />
              <div className={styles.info}>
                <div className="d-flex align-items-center justify-content-start gap-2">
                  <h6 className={styles.name}>{user.name}</h6>
                  {user.verified && (
                    <img
                      src="/icons/twitter-verified-badge.svg"
                      alt=""
                      className={styles.iconVerified}
                    />
                  )}
                </div>
                {!user.nickname && (
                  <p className={styles.nickname}>@{user.nickname}asdasdasd</p>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    );
  };
  return (
    <div
      className={`${styles.wrapper}  ${
        users.length <= 0 ? styles.withoutUsers : ""
      }`}
    >
      {loading ? (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <Loading />
        </div>
      ) : (
        <UserList />
      )}
    </div>
  );
});

export default UsersResult;
