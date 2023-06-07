import React, { useState } from "react";
import styles from "./tabsTweetList.module.scss";
import { ETypeTabTweetList, ITabTweetList } from "@/components/interfaces";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  activeTab: ETypeTabTweetList;
  changeActiveTab: React.Dispatch<React.SetStateAction<ETypeTabTweetList>>;
};

const TabsTweetList = ({ activeTab, changeActiveTab }: Props) => {
  const [tabs, setTabs] = useState<ITabTweetList[]>([
    {
      id: nanoid(),
      type: ETypeTabTweetList.ForYou,
    },
    {
      id: nanoid(),
      type: ETypeTabTweetList.Following,
    },
  ]);
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tabItem} ${
            activeTab === tab.type ? styles.active : ""
          }`}
          onClick={() => changeActiveTab(tab.type)}
        >
          {tab.type}
        </div>
      ))}
    </div>
  );
};

export default TabsTweetList;
