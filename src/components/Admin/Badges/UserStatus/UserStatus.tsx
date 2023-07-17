import React from "react";
import styles from "./userStatus.module.scss";
import { EUserStatus } from "@/features/interface";
type Props = {
  status: EUserStatus;
};

const UserStatus = ({ status }: Props) => {
  return (
    <div
      className={`${styles.badge} ${
        status === EUserStatus.Active ? styles.active : ""
      } ${status === EUserStatus.InActive ? styles.inactive : ""}`}
    >
      {status}
    </div>
  );
};

export default UserStatus;
