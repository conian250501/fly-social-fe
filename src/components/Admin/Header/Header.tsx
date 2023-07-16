/* eslint-disable react/display-name */
import { PATHS } from "@/contanst/paths";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useRef, useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoImages, IoImagesOutline } from "react-icons/io5";
import { MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
import {
  RiHomeFill,
  RiHomeLine,
  RiNotification4Fill,
  RiNotification4Line,
} from "react-icons/ri";
import styles from "./header.module.scss";
import SettingsUser from "./SettingsUser/SettingsUser";

type Props = {};

const Header = React.memo((props: Props) => {
  const path = usePathname();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const settingsRef = useRef<OverlayPanel>(null);

  const [menuList, setMenuList] = useState<
    { id: string; title: string; link: string }[]
  >([
    {
      id: nanoid(),
      title: "Dashboard",
      link: PATHS.AdminDashboard,
    },
    {
      id: nanoid(),
      title: "Users",
      link: PATHS.AdminManageUsers,
    },
    {
      id: nanoid(),
      title: "Tweets",
      link: PATHS.AdminManageTweets,
    },
  ]);

  const [menuListMobile, setMenuListMobile] = useState<
    {
      id: string;
      icon: React.ReactNode;
      iconActive: React.ReactNode;
      link: string;
    }[]
  >([
    {
      id: nanoid(),
      icon: <RiHomeLine className={styles.icon} />,
      iconActive: <RiHomeFill className={`${styles.icon} ${styles.active}`} />,
      link: PATHS.AdminDashboard,
    },
    {
      id: nanoid(),
      icon: <MdOutlineManageAccounts className={styles.icon} />,
      iconActive: (
        <MdManageAccounts className={`${styles.icon} ${styles.active}`} />
      ),
      link: PATHS.AdminManageUsers,
    },
    {
      id: nanoid(),
      icon: <IoImagesOutline className={styles.icon} />,
      iconActive: <IoImages className={`${styles.icon} ${styles.active}`} />,
      link: PATHS.AdminManageTweets,
    },
    {
      id: nanoid(),
      icon: <RiNotification4Line className={styles.icon} />,
      iconActive: (
        <RiNotification4Fill className={`${styles.icon} ${styles.active}`} />
      ),
      link: PATHS.AdminNotifications,
    },
    {
      id: nanoid(),
      icon: <FaRegUser className={styles.icon} />,
      iconActive: <FaUser className={`${styles.icon} ${styles.active}`} />,
      link: `${PATHS.AdminProfile}/${user?.id}`,
    },
  ]);
  return (
    <header className={styles.adminHeader}>
      <Link href={PATHS.AdminDashboard} className={styles.logoWrapper}>
        <img src="/images/logo-app.png" alt="" className={styles.logo} />
        <h3 className={styles.appName}>Fly Social</h3>
        <p className={styles.role}>{user?.role}</p>
      </Link>
      <div className={styles.colRight}>
        <ul className={styles.menuList}>
          {menuList.map((menu) => (
            <li className={`${styles.menuItem}`} key={menu.id}>
              <Link
                className={`${styles.menuLink} ${
                  path === menu.link ? styles.active : ""
                }`}
                href={menu.link}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.notification}>
          <IoMdNotifications className={styles.icon} />
        </div>
        <div
          className={styles.avatar}
          role="button"
          onClick={(e) => settingsRef?.current?.toggle(e)}
        >
          <img
            src={user?.avatar ? user.avatar : "/images/avatar-placeholder.png"}
            alt=""
          />
        </div>

        <OverlayPanel ref={settingsRef}>
          <SettingsUser />
        </OverlayPanel>
      </div>

      <div className={styles.menuListMobile}>
        {menuListMobile.map((menu) => (
          <li className={`${styles.menuItem}`} key={menu.id}>
            <Link className={`${styles.menuLink}`} href={menu.link}>
              {path === menu.link ? <> {menu.iconActive}</> : <>{menu.icon}</>}
            </Link>
          </li>
        ))}
      </div>
    </header>
  );
});

export default Header;
