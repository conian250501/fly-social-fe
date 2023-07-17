import React from "react";
import styles from "./userRole.module.scss";
import { EUserRole } from "@/features/interface";
type Props = {
  role: EUserRole;
};

const UserRole = ({ role }: Props) => {
  return (
    <div
      className={`${styles.badge} ${
        role === EUserRole.Admin ? styles.admin : ""
      } ${role === EUserRole.User ? styles.user : ""}`}
    >
      {role}
    </div>
  );
};

export default UserRole;
