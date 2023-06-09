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
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default GuestLayout;
