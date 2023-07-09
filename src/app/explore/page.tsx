"use client";
import BackLink from "@/components/shared/BackLink";
import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import TweetList from "./components/TweetList";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <MainLayout>
      <div className={styles.explorePage}>
        <BackLink title="Explore tweets" />
        <TweetList />
      </div>
    </MainLayout>
  );
};

export default Page;
