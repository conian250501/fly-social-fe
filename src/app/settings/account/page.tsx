"use client";
import BackLink from "@/components/shared/BackLink";
import { PATHS } from "@/contanst/paths";
import { IUser } from "@/features/interface";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import InfoList from "./components/InfoList";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return (
    <div className={styles.accountSettingPage}>
      <div className="d-flex align-items-center justify-content-between">
        <BackLink title="Account information" />
        <Link href={PATHS.EditProfile} className={styles.btnChange}>
          Manage
        </Link>
      </div>
      <InfoList user={user as IUser} />
    </div>
  );
};

export default Page;
