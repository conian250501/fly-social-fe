import React, { useState } from "react";
import styles from "./settingsUser.module.scss";
import { nanoid } from "@reduxjs/toolkit";
import { PATHS } from "@/contanst/paths";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  RiHomeFill,
  RiHomeLine,
  RiNotification4Fill,
  RiNotification4Line,
} from "react-icons/ri";
import { MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoImages, IoImagesOutline, IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
type Props = {};

const SettingsUser = (props: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const path = usePathname();

  const [settings, setSettings] = useState<
    {
      id: string;
      title: string;
      icon: React.ReactNode;
      iconActive: React.ReactNode;
      link: string;
    }[]
  >([
    {
      id: nanoid(),
      title: "Dashboard",
      icon: <RiHomeLine className={styles.icon} />,
      iconActive: <RiHomeFill className={`${styles.icon} ${styles.active}`} />,
      link: PATHS.AdminDashboard,
    },
    {
      id: nanoid(),
      title: "Manage users",
      icon: <MdOutlineManageAccounts className={styles.icon} />,
      iconActive: (
        <MdManageAccounts className={`${styles.icon} ${styles.active}`} />
      ),
      link: PATHS.AdminManageUsers,
    },
    {
      id: nanoid(),
      title: "Manage tweets",
      icon: <IoImagesOutline className={styles.icon} />,
      iconActive: <IoImages className={`${styles.icon} ${styles.active}`} />,
      link: PATHS.AdminManageTweets,
    },
    {
      id: nanoid(),
      title: "Notifications",
      icon: <RiNotification4Line className={styles.icon} />,
      iconActive: (
        <RiNotification4Fill className={`${styles.icon} ${styles.active}`} />
      ),
      link: PATHS.AdminNotifications,
    },
    {
      id: nanoid(),
      title: "Profile",
      icon: <FaRegUser className={styles.icon} />,
      iconActive: <FaUser className={`${styles.icon} ${styles.active}`} />,
      link: `${PATHS.AdminProfile}/${user?.id}`,
    },
    {
      id: nanoid(),
      title: "Logout",
      icon: <IoLogOutOutline className={styles.icon} />,
      iconActive: <IoLogOut className={`${styles.icon} ${styles.active}`} />,
      link: PATHS.Logout,
    },
  ]);
  return (
    <div className={styles.settingsList}>
      {settings.map((setting) => (
        <div className={styles.settingItem} key={setting.id}>
          <Link href={`${setting.link}`} className={styles.settingLink}>
            {path === setting.link ? (
              <>{setting.iconActive}</>
            ) : (
              <>{setting.icon}</>
            )}
            <p
              className={`${styles.title}  ${
                path === setting.link ? styles.active : ""
              }`}
            >
              {setting.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SettingsUser;
