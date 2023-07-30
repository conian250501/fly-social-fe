"use client";
import React from "react";
import styles from "./page.module.scss";
import ConversationEmpty from "./components/ConversationEmpty";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.messagePage}>
      <ConversationEmpty />
    </div>
  );
};

export default Page;
