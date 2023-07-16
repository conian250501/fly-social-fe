"use client";
import React from "react";
import styles from "./page.module.scss";
import { Col, Row } from "react-bootstrap";
import InfoApp from "./components/InfoApp/InfoApp";
import StatisticApp from "./components/StatisticApp/StatisticApp";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.dashboardPage}>
      <Row>
        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <InfoApp />
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} xl={4}>
          <StatisticApp />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
