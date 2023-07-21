"use client";
import { Col, Row } from "react-bootstrap";
import InfoApp from "./components/InfoApp/InfoApp";
import StatisticApp from "./components/StatisticApp/StatisticApp";
import TableUsers from "../../../components/Admin/TableUsers/TableUsers";
import styles from "./page.module.scss";
import { ETypePageForTableUser } from "@/components/Admin/interface";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.dashboardPage}>
      <Row className={styles.topSection}>
        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <InfoApp />
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} xl={4}>
          <StatisticApp />
        </Col>
      </Row>
      <TableUsers typePage={ETypePageForTableUser.DashboardPage} />
    </div>
  );
};

export default Page;
