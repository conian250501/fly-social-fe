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

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <MainLayout>
      <Row className={styles.pageContainer}>
        <Col xs={12} sm={12} md={12} lg={12} xl={7}>
          <TweetDetail id={Number(params.id)} />
        </Col>
        <Col xs={12} sm={12} md={5} lg={5}>
          <UserList />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Page;
