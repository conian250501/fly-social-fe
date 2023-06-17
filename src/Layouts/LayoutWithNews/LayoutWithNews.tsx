import UserList from "@/components/Home/UserList/UserList";
import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./layoutWithNews.module.scss";
type Props = {
  children: React.ReactNode;
};

const LayoutWithNews = ({ children }: Props) => {
  return (
    <Row className={styles.mainPage}>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={7}
        className={`${styles.colWrapper} p-0`}
      >
        {children}
      </Col>
      <Col xs={12} sm={12} md={5} lg={5}>
        <UserList />
      </Col>
    </Row>
  );
};

export default LayoutWithNews;
