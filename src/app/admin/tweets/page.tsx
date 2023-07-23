"use client";
import React from "react";
import styles from "./page.module.scss";
import BackLink from "@/components/shared/BackLink";
import TableTweets from "@/components/Admin/TableTweets";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.adminTweetPage}>
      <BackLink
        title="Manage Tweets"
        customClassNameContainer={styles.backLink}
      />

      <TableTweets />
    </div>
  );
};

export default Page;
