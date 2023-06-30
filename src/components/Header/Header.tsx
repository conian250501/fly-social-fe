/* eslint-disable @next/next/no-img-element */
import { PATHS } from "@/contanst/paths";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { BiBookmark, BiMessageSquare, BiNotification } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { RiHomeGearLine } from "react-icons/ri";
import { SiHey } from "react-icons/si";
import { IMenu } from "../interfaces/header.interface";
import ButtonNewTweet from "./components/ButtonNewTweet";
import ButtonNewTweetMobile from "./components/ButtonNewTweetMobile/ButtonNewTweetMobile";
import UserInfo from "./components/UserInfo/UserInfo";
import styles from "./header.module.scss";

type Props = {};

const Header = React.memo(function Header(props: Props) {
  const router = useRouter();
  const path = usePathname();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [menuList, setMenuList] = useState<IMenu[]>([
    {
      id: nanoid(),
      title: "Home",
      icon: <RiHomeGearLine className={styles.icon} />,
      link: PATHS.Home,
    },
  ]);

  const [menuMobileList, setMenuMobileList] = useState<IMenu[]>([]);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      setMenuList([
        ...menuList,
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
          link: `${PATHS.Profile}/${user.id}${PATHS.ProfileTweetsSaved}`,
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
          link: `${PATHS.Profile}/${user.id}`,
        },
      ]);

      setMenuMobileList([
        {
          id: nanoid(),
          title: "Home",
          icon: <RiHomeGearLine className={styles.icon} />,
          link: PATHS.Home,
        },
        {
          id: nanoid(),
          title: "Connect",
          icon: <SiHey className={styles.icon} />,
          link: PATHS.Connect,
        },
        {
          id: nanoid(),
          title: "Bookmarks",
          icon: <BiBookmark className={styles.icon} />,
          link: `${PATHS.Profile}/${user?.id}${PATHS.ProfileTweetsSaved}`,
        },
        {
          id: nanoid(),
          title: "Profile",
          icon: <FaRegUser className={styles.icon} />,
          link: `${PATHS.Profile}/${user?.id}`,
        },
      ]);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const HeaderMobile: FC = () => {
    return (
      <React.Fragment>
        {isAuthenticated ? (
          <header className={`${styles.headerMobile}`}>
            <ul className={styles.menuList}>
              {menuMobileList.length > 0 &&
                menuMobileList.map((menu) => (
                  <li key={menu.id} className={`${styles.menuItem} `}>
                    <Link
                      href={menu.link}
                      className={`${styles.menuItemLink} ${
                        path === menu.link && styles.active
                      }`}
                    >
                      <div className={styles.menuIcon}>
                        {path === menu.link ? (
                          <div className={styles.btnActive}></div>
                        ) : null}
                        {menu.icon}
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
            <ButtonNewTweetMobile />
          </header>
        ) : (
          <div className={styles.authLinkList}>
            <div className={styles.content}>
              <h4 className={styles.title}>Don’t miss what’s happening</h4>
              <p className={styles.description}>
                People on Twitter are the first to know.
              </p>
            </div>
            <div className={styles.authBtnList}>
              <Link
                href={PATHS.LoginPage}
                className={`${styles.link} ${styles.login}`}
              >
                Login
              </Link>
              <Link
                href={PATHS.SignUpPage}
                className={`${styles.link} ${styles.signUp}`}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  const MenuListLoginYet: FC = () => {
    return (
      <ul className={styles.menuList}>
        {menuList.length > 0 && (
          <li className={`${styles.menuItem} `}>
            <Link
              href={menuList[0].link}
              className={`${styles.menuItemLink} ${
                path.startsWith(menuList[0].link) && styles.active
              }`}
            >
              <div className={styles.menuIcon}>
                {path.startsWith(menuList[0].link) ? (
                  <div className={styles.btnActive}></div>
                ) : null}
                {menuList[0].icon}
              </div>
              <p className={styles.title}>{menuList[0].title}</p>
            </Link>
          </li>
        )}
      </ul>
    );
  };
  return (
    <div className="d-flex align-items-center justify-content-start w-100">
      {/* ======= HEADER MOBILE ======= */}
      <HeaderMobile />
      {/* ====== HEADER DESKTOP ====== */}
      <header className={styles.header}>
        <div className="w-100">
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>
              <img src="/images/logo-twitter.png" alt="logo" />
            </div>
          </div>
          {user ? (
            <ul className={styles.menuList}>
              {menuList.length > 0 &&
                menuList.map((menu) => (
                  <li key={menu.id} className={`${styles.menuItem} `}>
                    <Link
                      href={menu.link}
                      className={`${styles.menuItemLink} ${
                        path === menu.link && styles.active
                      }`}
                    >
                      <div className={styles.menuIcon}>
                        {path === menu.link ? (
                          <div className={styles.btnActive}></div>
                        ) : null}
                        {menu.icon}
                      </div>
                      <p className={styles.title}>{menu.title}</p>
                    </Link>
                  </li>
                ))}
              <ButtonNewTweet />
            </ul>
          ) : (
            <MenuListLoginYet />
          )}
        </div>

        <UserInfo />
      </header>
    </div>
  );
});

export default Header;
