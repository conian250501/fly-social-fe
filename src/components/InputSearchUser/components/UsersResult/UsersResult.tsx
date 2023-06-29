/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import { IUser } from "@/features/interface";
import React, { FC } from "react";
import styles from "./usersResult.module.scss";
type Props = {
  users: IUser[];
  loading: boolean;
};

const UsersResult = React.memo(({ users, loading }: Props) => {
  const UserList: FC = () => {
    return (
      <div className={styles.userList}>
        {users.length <= 0 ? (
          <>
            <h4>Try searching for people or keywords </h4>
          </>
        ) : (
          users.map((user) => (
            <div className={styles.userItem} key={user.id}>
              {user.name}
            </div>
          ))
        )}
      </div>
    );
  };
  return (
    <div className={styles.wrapper}>{loading ? <Loading /> : <UserList />}</div>
  );
});

export default UsersResult;
