"use client";

import React from "react";
import styles from "./page.module.scss";
import TableUsers from "@/components/Admin/TableUsers";
import { ETypePageForTableUser } from "@/components/Admin/interface";
import BackLink from "@/components/shared/BackLink/BackLink";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.manageUsersPage}>
      <BackLink
        title="Manage users"
        customClassNameContainer={styles.backLink}
      />
      <TableUsers
        typePage={ETypePageForTableUser.ManageUsersPage}
        customClassNameTableWrapper={styles.tableWrapper}
      />
    </div>
  );
};

export default Page;
