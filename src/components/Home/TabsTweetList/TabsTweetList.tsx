/* eslint-disable react/display-name */
import { ETypeTabTweetList, ITabTweetList } from "@/components/interfaces";
import { PATHS } from "@/contanst/paths";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./tabsTweetList.module.scss";

type Props = {};

const TabsTweetList = React.memo(({}: Props) => {
  const path = usePathname();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [tabs, setTabs] = useState<ITabTweetList[]>([
    {
      id: nanoid(),
      type: ETypeTabTweetList.ForYou,
      link: PATHS.Home,
    },
    {
      id: nanoid(),
      type: ETypeTabTweetList.Following,
      link: PATHS.Following,
    },
  ]);

  if (!user) {
    return (
      <div className={`${styles.tabList} ${styles.withoutUser}`}>
        <div className={`${styles.tabItem} ${styles.active}`}>For you</div>
      </div>
    );
  }
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <Link
          href={tab.link}
          key={tab.id}
          className={`${styles.tabItem} ${
            path === tab.link ? styles.active : ""
          }`}
        >
          {tab.type}
        </Link>
      ))}
    </div>
  );
});

export default TabsTweetList;
