/* eslint-disable react/display-name */
import { IUser } from "@/app/features/interface";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import {
  ETypeTabProfile,
  ITabProfile,
} from "@/components/interfaces/tabsProfile.interface";
import { PATHS } from "@/contanst/paths";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./tabsProfile.module.scss";
type Props = {
  userId: number;
};

const TabsProfile = React.memo(({ userId }: Props) => {
  const path = usePathname();

  const { isMe } = useCheckIsMe(userId);

  const [tabsPrivate, setTabsPrivate] = useState<ITabProfile[]>([
    {
      id: nanoid(),
      type: ETypeTabProfile.Tweets,
      link: `${PATHS.Profile}/${userId}`,
    },
    {
      id: nanoid(),
      type: ETypeTabProfile.Likes,
      link: `${PATHS.Profile}/${userId}${PATHS.ProfileTweetsLike}`,
    },
    {
      id: nanoid(),
      type: ETypeTabProfile.Saved,
      link: `${PATHS.Profile}/${userId}${PATHS.ProfileTweetsSaved}`,
    },
  ]);
  const [tabsPublic, setTabsPublic] = useState<ITabProfile[]>([
    {
      id: nanoid(),
      type: ETypeTabProfile.Tweets,
      link: `${PATHS.Profile}/${userId}`,
    },
  ]);

  return (
    <div className={styles.tabList}>
      {isMe
        ? tabsPrivate.map((tab) => (
            <Link
              href={tab.link}
              className={`${styles.tabItem} ${
                path == tab.link ? styles.active : ""
              }`}
              key={tab.id}
            >
              {tab.type}
            </Link>
          ))
        : tabsPublic.map((tab) => (
            <Link
              href={tab.link}
              className={`${styles.tabItem} ${
                path == tab.link ? styles.active : ""
              }`}
              key={tab.id}
            >
              {tab.type}
            </Link>
          ))}
    </div>
  );
});

export default TabsProfile;
