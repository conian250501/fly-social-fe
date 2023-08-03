/* eslint-disable react/display-name */
import { PATHS } from "@/contanst/paths";
import { logout } from "@/features/auth/authSlice";
import { IError } from "@/features/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem } from "primereact/menuitem";
import { Sidebar } from "primereact/sidebar";
import { SlideMenu } from "primereact/slidemenu";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import {
  BiArrowBack,
  BiBookmark,
  BiMessageSquare,
  BiNotification,
} from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GrFormNext } from "react-icons/gr";
import { RiHomeGearLine } from "react-icons/ri";
import { SiHey } from "react-icons/si";
import { IMenu } from "../interfaces";
import Loading from "../Loading";
import styles from "./sideBar.module.scss";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type Props = {};

const SideBar = React.memo((props: Props) => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (user) {
      setMenuList([
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
      setUserId(user.id);
    }
  }, [user]);

  const items: MenuItem[] = [
    {
      label: "Settings and Support",
      className: `${styles.menuSettingItem}`,
      icon: <GrFormNext className={styles.icon} />,
      items: [
        {
          label: "Settings and privacy",
          icon: <AiOutlineSetting className={styles.icon} />,
          className: `${styles.subMenuSettingItem}`,
          url: PATHS.Settings,
        },
        {
          label: "Logout",
          icon: <FiLogOut className={styles.icon} />,
          className: styles.subMenuSettingItem,
          url: PATHS.Logout,
        },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100 flex-column">
        <Loading />
        <p className={styles.textLoading}>Logging out</p>
      </div>
    );
  }

  return (
    <div className={`${styles.topBarWrapper} ${montserrat.className}`}>
      <div
        className={`${styles.topSection} ${!user ? styles.withoutUser : ""}`}
      >
        <Row>
          <Col>
            {user && (
              <img
                src={
                  user?.avatar ? user.avatar : "/images/avatar-placeholder.png"
                }
                alt=""
                className={styles.avatar}
                onClick={() => setOpenSideBar(true)}
              />
            )}
          </Col>
          <Col>
            <div className={styles.logo}>
              <img src="/images/logo-app.png" alt="" />
            </div>
          </Col>
          <Col> {user && <div className=""></div>}</Col>
        </Row>
      </div>
      <Sidebar
        visible={openSideBar}
        onHide={() => setOpenSideBar(false)}
        className={styles.sideBarWrapper}
      >
        <Link href={`${PATHS.Profile}/${user?.id}`} className={styles.userInfo}>
          <img
            src={user?.avatar ? user.avatar : "/images/avatar-placeholder.png"}
            alt=""
            className={styles.avatar}
          />
          <h4 className={styles.name}>{user?.name}</h4>
          {user?.nickname && (
            <p className={styles.nickname}>@{user.nickname}</p>
          )}
        </Link>

        <div className="d-flex align-items-center justify-content-start gap-3 mt-3">
          <Link
            href={`${PATHS.Profile}/${userId}/following`}
            className={styles.followItem}
          >
            <p className={styles.count}>{user?.followings.length}</p>
            <span>Following</span>
          </Link>
          <Link
            href={`${PATHS.Profile}/${userId}/followers`}
            className={styles.followItem}
          >
            <p className={styles.count}>{user?.followers.length} </p>
            <span>Follower</span>
          </Link>
        </div>

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
                  <div className={styles.menuIcon}>{menu.icon}</div>
                  <p className={styles.title}>{menu.title}</p>
                </Link>
              </li>
            ))}
        </ul>

        <SlideMenu
          model={items}
          menuWidth={400}
          className={styles.sideMenuWrapper}
          backLabel={""}
          backIcon={<BiArrowBack className={styles.iconBack} />}
        />
      </Sidebar>
    </div>
  );
});

export default SideBar;
