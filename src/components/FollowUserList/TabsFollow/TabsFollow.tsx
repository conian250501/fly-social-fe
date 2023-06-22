import { ETypeFollowUserList } from "@/components/interfaces";
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./tabsFollow.module.scss";

type Props = {
  id: number;
};

const TabsFollow = ({ id }: Props) => {
  const path = usePathname();

  const [activePath, setActivePath] = useState<string>("");
  const [tabs, setTabs] = useState<
    { id: string; type: ETypeFollowUserList; link: string }[]
  >([
    {
      id: nanoid(),
      type: ETypeFollowUserList.Followers,
      link: `${PATHS.Profile}/${id}${PATHS.ProfileFollower}`,
    },
    {
      id: nanoid(),
      type: ETypeFollowUserList.Following,
      link: `${PATHS.Profile}/${id}${PATHS.ProfileFollowing}`,
    },
  ]);

  useEffect(() => {
    setActivePath(path);
  }, []);

  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <Link
          href={tab.link}
          className={`${styles.tabItem} ${
            activePath === tab.link ? styles.active : ""
          }`}
          key={tab.id}
        >
          {tab.type}
        </Link>
      ))}
    </div>
  );
};

export default TabsFollow;
