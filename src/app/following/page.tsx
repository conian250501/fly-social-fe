"use client";
import TabsTweetList from "@/components/Home/TabsTweetList";
import TweetListFollowing from "@/components/Home/TweetListFollowing";
import SideBar from "@/components/SideBar";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <MainLayout>
      <LayoutWithNews>
        <SideBar />
        <h1 className={styles.heading}>Following</h1>
        <TabsTweetList />
        <TweetListFollowing />
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
