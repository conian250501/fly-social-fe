"use client";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import { getById } from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import UserList from "@/components/Home/UserList/UserList";
import Loading from "@/components/Loading/Loading";
import TweetDetail from "@/components/TweetDetail";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./page.module.scss";
import LayoutWithNews from "@/Layouts/LayoutWithNews";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <MainLayout>
      <LayoutWithNews>
        <TweetDetail id={Number(params.id)} />
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
