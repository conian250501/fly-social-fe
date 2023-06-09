/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import styles from "./userInfo.module.scss";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { PATHS } from "@/contanst/paths";
type Props = {};

const UserInfo = React.memo((props: Props) => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [openMenuUserInfo, setOpenMenuUserInfo] = useState<boolean>(false);

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
                  user?.avatar ? user.avatar : "/images/avatar-placeholder.png"
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
});

export default UserInfo;
