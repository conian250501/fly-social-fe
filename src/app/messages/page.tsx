"use client";
import React from "react";
import styles from "./page.module.scss";
import { Col, Row } from "react-bootstrap";
import ConversationList from "./components/ConversationList";
import Conversation from "./components/Conversation";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.messagePage}>
      <Row className="g-0">
        <Col xs={12} sm={12} md={12} lg={5} className="p-0">
          <ConversationList />
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} className="p-0">
          <Conversation />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
