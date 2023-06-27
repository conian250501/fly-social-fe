"use client";
import FormNewTweet from "@/components/Home/FromNewTweet/FormNewTweet";
import TabsTweetList from "@/components/Home/TabsTweetList";
import SideBar from "@/components/SideBar";
import TweetListHomePage from "@/components/TweetListHomePage";
import GuestLayout from "@/Layouts/GuestLayout/GuestLayout";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import styles from "./main.module.scss";

const Page = () => {
  return (
    <GuestLayout>
      <LayoutWithNews>
        <SideBar />
        <h1 className={styles.heading}>Home</h1>
        <TabsTweetList />
        <FormNewTweet />
        <TweetListHomePage />
      </LayoutWithNews>
    </GuestLayout>
  );
};

export default Page;
