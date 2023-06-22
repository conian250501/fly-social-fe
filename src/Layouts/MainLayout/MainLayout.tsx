"use client";

import Header from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import styles from "./mainLayout.module.scss";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading/Loading";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/features/auth/authAction";
type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        await dispatch(getUser()).unwrap();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
          <Loading />
        </div>
      ) : (
        <div className={styles.mainLayout}>
          <div className={styles.container}>
            <Header />
            <div className={styles.children}> {children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
