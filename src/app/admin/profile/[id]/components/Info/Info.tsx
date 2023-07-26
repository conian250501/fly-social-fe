/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import styles from "./info.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import NoneData from "@/components/shared/NoneData";
import Loading from "@/components/Loading/Loading";
import { getUserById } from "@/features/admin/user/userAction";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { CgUserlane } from "react-icons/cg";

type Props = {
  id: number;
};

const Info = React.memo(({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.adminUser);

  const [loading, setLoading] = useState<boolean>(true);
  const [linkList, setLinkList] = useState<
    { id: string; title: string; url: string; icon: React.ReactNode }[]
  >([
    {
      id: nanoid(),
      title: "Notifications",
      url: `${PATHS.AdminNotifications}`,
      icon: <RiNotificationBadgeFill className={styles.icon} />,
    },
    {
      id: nanoid(),
      title: "Edit",
      url: `${PATHS.AdminManageUserEdit}/${id}`,
      icon: <CgUserlane className={styles.icon} />,
    },
  ]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        await dispatch(getUserById(id)).unwrap();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, []);

  console.log({ user });

  if (!user && !loading) {
    return (
      <NoneData
        title="User doesn't exist"
        customClassNameContainer={styles.noneData}
      />
    );
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.avatar}>
        <img
          src={user?.avatar ? user.avatar : "/images/avatar-placeholder.png"}
          alt=""
        />
        {user?.verified && (
          <img
            src="/icons/twitter-verified-badge.svg"
            alt=""
            className={styles.iconVerified}
          />
        )}
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{user?.name}</h1>
        <p className={styles.role}>{user?.role}</p>
      </div>
      <div className={styles.btnLinkList}>
        {linkList.map((link) => (
          <Link key={link.id} href={link.url} className={styles.btnLinkItem}>
            {link.icon}
            {link.title}
          </Link>
        ))}
      </div>
      <div className={styles.donut}></div>
    </div>
  );
});

export default Info;
