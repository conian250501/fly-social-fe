"use client";

import Header from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import styles from "./mainLayout.module.scss";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading/Loading";
import { Col, Container, Row } from "react-bootstrap";
type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated]);
  return (
    <>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
          <Loading />
        </div>
      ) : (
        <div className={styles.mainLayout}>
          <div className={styles.container}>
            <Row className="w-100">
              <Col xs={0} sm={0} md={2} lg={3} className={styles.colHeader}>
                <Header />
              </Col>
              <Col xs={12} sm={12} md={10} lg={6}>
                {children}
              </Col>
              <Col xs={0} sm={0} md={9} lg={3}>
                <div className={styles.userListWrapper}>user list</div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayout;
