"use client";
import UserConnectList from "@/components/UserConnectList";
import MainLayout from "@/Layouts/MainLayout";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <MainLayout>
      <div className={styles.connectPage}>
        123
        <UserConnectList />
      </div>
    </MainLayout>
  );
};

export default Page;
