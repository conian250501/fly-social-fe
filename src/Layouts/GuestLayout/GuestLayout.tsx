import React, { ReactNode } from "react";
import styles from "./guestLayout.module.scss";
import { Col, Row } from "react-bootstrap";
import Header from "@/components/Header";
type Props = {
  children: ReactNode;
};

const GuestLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Row className={styles.guestLayoutWrapper}>
        <Col xs={0} sm={0} md={2} lg={3} className={styles.colHeader}>
          <Header />
        </Col>
        <Col xs={12} sm={12} md={10} lg={9}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default GuestLayout;
