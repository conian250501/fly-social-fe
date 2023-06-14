import {
  ETypeTabProfile,
  ITabProfile,
} from "@/components/interfaces/tabsProfile.interface";
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./tabsProfile.module.scss";
type Props = {};

const TabsProfile = (props: Props) => {
  const path = usePathname();
  const [tabs, setTabs] = useState<ITabProfile[]>([
    {
      id: nanoid(),
      type: ETypeTabProfile.Tweets,
      link: PATHS.Profile,
    },
    {
      id: nanoid(),
      type: ETypeTabProfile.Likes,
      link: PATHS.ProfileTweetsLike,
    },
    {
      id: nanoid(),
      type: ETypeTabProfile.Saved,
      link: PATHS.ProfileTweetsSaved,
    },
  ]);
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <div
          className={`${styles.tabItem} ${
            path.startsWith(tab.link) ? styles.active : ""
          }`}
          key={tab.id}
        >
          <Link href={tab.link} className={styles.tabLink}>
            {tab.type}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TabsProfile;
