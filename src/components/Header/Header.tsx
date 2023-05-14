import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiBookmark, BiMessageSquare, BiNotification } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiMinimize } from "react-icons/fi";
import { GiSpikyWing } from "react-icons/gi";
import { RiHomeGearLine } from "react-icons/ri";
import { SiHey } from "react-icons/si";
import { IMenu } from "../interfaces/header.interface";
import styles from "./header.module.scss";

type Props = {};

const Header = React.memo(function Header(props: Props) {
  const path = usePathname();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [menuList, setMenuList] = useState<IMenu[]>([
    {
      id: nanoid(),
      title: "Home",
      icon: <RiHomeGearLine className={styles.icon} />,
      link: PATHS.Home,
    },
    {
      id: nanoid(),
      title: "Explore",
      icon: <FiMinimize className={styles.icon} />,
      link: PATHS.Explore,
    },
    {
      id: nanoid(),
      title: "Notifications",
      icon: <BiNotification className={styles.icon} />,
      link: PATHS.Notifications,
    },
    {
      id: nanoid(),
      title: "Messages",
      icon: <BiMessageSquare className={styles.icon} />,
      link: PATHS.Messages,
    },
    {
      id: nanoid(),
      title: "Bookmarks",
      icon: <BiBookmark className={styles.icon} />,
      link: PATHS.Bookmarks,
    },
    {
      id: nanoid(),
      title: "Connect",
      icon: <SiHey className={styles.icon} />,
      link: PATHS.Connect,
    },
    {
      id: nanoid(),
      title: "Profile",
      icon: <FaRegUser className={styles.icon} />,
      link: PATHS.Profile,
    },
  ]);

  const [menuMobileList, setMenuMobileList] = useState<IMenu[]>([
    {
      id: nanoid(),
      title: "Home",
      icon: <RiHomeGearLine className={styles.icon} />,
      link: PATHS.Home,
    },
    {
      id: nanoid(),
      title: "Explore",
      icon: <FiMinimize className={styles.icon} />,
      link: PATHS.Explore,
    },
    {
      id: nanoid(),
      title: "Connect",
      icon: <SiHey className={styles.icon} />,
      link: PATHS.Profile,
    },
    {
      id: nanoid(),
      title: "Profile",
      icon: <FaRegUser className={styles.icon} />,
      link: PATHS.Profile,
    },
  ]);
  return (
    <>
      {/* ======= HEADER MOBILE ======= */}
      <header className={`${styles.headerMobile}`}>
        <ul className={styles.menuList}>
          {menuMobileList.map((menu) => (
            <li key={menu.id} className={`${styles.menuItem} `}>
              <Link
                href={menu.link}
                className={`${styles.menuItemLink} ${
                  path.startsWith(menu.link) && styles.active
                }`}
              >
                <div className={styles.menuIcon}>
                  {path.startsWith(menu.link) ? (
                    <div className={styles.btnActive}></div>
                  ) : null}
                  {menu.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </header>

      {/* ====== HEADER DESKTOP ====== */}
      <header className={styles.header}>
        <div className="w-100">
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>
              <img src="/images/logo-twitter.png" alt="" />
            </div>
          </div>
          <ul className={styles.menuList}>
            {menuList.map((menu) => (
              <li key={menu.id} className={`${styles.menuItem} `}>
                <Link
                  href={menu.link}
                  className={`${styles.menuItemLink} ${
                    path.startsWith(menu.link) && styles.active
                  }`}
                >
                  <div className={styles.menuIcon}>
                    {path.startsWith(menu.link) ? (
                      <div className={styles.btnActive}></div>
                    ) : null}
                    {menu.icon}
                  </div>
                  <p className={styles.title}>{menu.title}</p>
                </Link>
              </li>
            ))}
            <button type="button" className={styles.btnAddTweet}>
              <GiSpikyWing className={styles.icon} />
              <span>Tweet</span>
            </button>
          </ul>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.info}>
            <div className={styles.avatar}>
              <img
                src={
                  user?.avatar
                    ? user.avatar
                    : "/images/avatar-placeholder-man.png"
                }
                alt=""
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.name}>Minh Tai</h1>
              <p className={styles.nickname}>@conian</p>
            </div>
          </div>
          <div className={styles.iconDot}>
            <BsThreeDots className={styles.icon} />
          </div>
        </div>
      </header>
    </>
  );
});

export default Header;
