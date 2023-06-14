"use client";
import UserList from "@/components/Home/UserList/UserList";
import BackLink from "@/components/shared/Profile/BackLink";
import TabsProfile from "@/components/shared/Profile/TabsProfile";
import TopInfo from "@/components/shared/Profile/TopInfo";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { IUser } from "../features/interface";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import styles from "./page.module.scss";

type Props = {};

const Page = (props: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return (
    <MainLayout>
      <LayoutWithNews>
        <BackLink user={user} />
        <TopInfo user={user} />
        <TabsProfile />
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
