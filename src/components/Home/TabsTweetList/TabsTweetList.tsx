/* eslint-disable react/display-name */
import React, { useState } from "react";
import styles from "./tabsTweetList.module.scss";
import { ETypeTabTweetList, ITabTweetList } from "@/components/interfaces";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import ButtonsAction from "./components/ButtonsAction";
import { PATHS } from "@/contanst/paths";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
      <div className={styles.tabList}>
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
