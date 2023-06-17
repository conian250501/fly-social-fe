import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
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
  const { user } = useAppSelector((state: RootState) => state.user);

  const path = usePathname();
  console.log({ path });
  const [tabs, setTabs] = useState<ITabProfile[]>([
    {
      id: nanoid(),
      type: ETypeTabProfile.Tweets,
      link: `${PATHS.Profile}/${user?.id}`,
    },
    {
      id: nanoid(),
      type: ETypeTabProfile.Likes,
      link: `${PATHS.Profile}/${user?.id}${PATHS.ProfileTweetsLike}`,
    },
    {
      id: nanoid(),
      type: ETypeTabProfile.Saved,
      link: `${PATHS.Profile}/${user?.id}${PATHS.ProfileTweetsSaved}`,
    },
  ]);
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <Link
          href={tab.link}
          className={`${styles.tabItem} ${
            path === tab.link ? styles.active : ""
          }`}
          key={tab.id}
        >
          {tab.type}
        </Link>
      ))}
    </div>
  );
};

export default TabsProfile;
