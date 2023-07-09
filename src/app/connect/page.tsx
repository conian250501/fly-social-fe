"use client";
import BackLink from "@/components/shared/BackLink";
import UserConnectList from "@/components/UserConnectList";
import MainLayout from "@/Layouts/MainLayout";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <MainLayout>
      <div className={styles.connectPage}>
        <BackLink title="Connect" />
        <UserConnectList />
      </div>
    </MainLayout>
  );
};

export default Page;
