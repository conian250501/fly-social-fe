"use client";
import TabsTweetList from "@/components/Home/TabsTweetList";
import TweetListHomePage from "@/components/TweetListHomePage";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import styles from "./main.module.scss";

const Page = () => {
  return (
    <GuestLayout>
      <LayoutWithNews>
        <h1 className={styles.heading}>Home</h1>
        <TabsTweetList />
        <TweetListHomePage />
      </LayoutWithNews>
    </GuestLayout>
  );
};

export default Page;
