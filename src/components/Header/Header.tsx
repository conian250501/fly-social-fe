/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { BiBookmark, BiMessageSquare, BiNotification } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiMinimize } from "react-icons/fi";
import { GiSpikyWing } from "react-icons/gi";
import { RiHomeGearLine } from "react-icons/ri";
import { SiHey } from "react-icons/si";
import { IMenu } from "../interfaces/header.interface";
import styles from "./header.module.scss";
import { OverlayTrigger, Popover } from "react-bootstrap";

type Props = {};

const Header = React.memo(function Header(props: Props) {
  const router = useRouter();
  const path = usePathname();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [openMenuUserInfo, setOpenMenuUserInfo] = useState<boolean>(false);

  const [menuList, setMenuList] = useState<IMenu[]>([
    {
      id: nanoid(),
      title: "Home",
      icon: <RiHomeGearLine className={styles.icon} />,
      link: PATHS.Home,
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
      title: "Connect",
      icon: <SiHey className={styles.icon} />,
      link: PATHS.Connect,
    },
    {
      id: nanoid(),
      title: "Bookmarks",
      icon: <BiBookmark className={styles.icon} />,
      link: PATHS.Bookmarks,
    },
    {
      id: nanoid(),
      title: "Profile",
      icon: <FaRegUser className={styles.icon} />,
      link: PATHS.Profile,
    },
  ]);

  useEffect(() => {
    function handleClose() {
      setOpenMenuUserInfo(false);
    }
    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push(PATHS.Auth);
  };

  const HeaderMobile: FC = () => {
    return (
      <React.Fragment>
        {user ? (
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
        ) : (
          <div className={styles.authLinkList}>
            <div className={styles.content}>
              <h4 className={styles.title}>Don’t miss what’s happening</h4>
              <p className={styles.description}>
                People on Twitter are the first to know.
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-end gap-3">
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
        <li className={`${styles.menuItem} `}>
          <Link
            href={menuList[1].link}
            className={`${styles.menuItemLink} ${
              path.startsWith(menuList[1].link) && styles.active
            }`}
          >
            <div className={styles.menuIcon}>
              {path.startsWith(menuList[1].link) ? (
                <div className={styles.btnActive}></div>
              ) : null}
              {menuList[1].icon}
            </div>
            <p className={styles.title}>{menuList[1].title}</p>
          </Link>
        </li>
      </ul>
    );
  };

  const UserInfo: FC = () => {
    return (
      <React.Fragment>
        {user && (
          <div
            className={styles.userInfo}
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuUserInfo(!openMenuUserInfo);
            }}
          >
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
                <h1 className={styles.name}>{user.name}</h1>
                <p className={styles.nickname}>
                  {user.nickname ? user.nickname : "N/A"}
                </p>
              </div>
            </div>
            <div className={styles.iconDot}>
              <BsThreeDots className={styles.icon} />
            </div>

            <ul
              className={`${styles.menuUserInfoList} ${
                openMenuUserInfo ? styles.open : styles.hidden
              }`}
            >
              <li
                className={styles.menuUserInfoItem}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
              >
                <span className="text-danger">Logout</span> @{user.name}
              </li>
              <div className={styles.triangle}></div>
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  };
  return (
    <div>
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
