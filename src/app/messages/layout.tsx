"use client";

import MainLayout from "@/Layouts/MainLayout";
import { Col, Row } from "react-bootstrap";
import ConversationList from "./components/ConversationList/ConversationList";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <Row className="g-0">
        <Col xs={12} sm={12} md={12} lg={5} className="p-0">
          <ConversationList />
        </Col>
        <Col xs={7} sm={7} md={7} lg={7} className="p-0">
          {children}
        </Col>
      </Row>
    </MainLayout>
  );
}
