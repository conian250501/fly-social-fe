"use client";

import MainLayout from "@/Layouts/MainLayout";
import { Col, Row } from "react-bootstrap";
import ConversationList from "./components/ConversationList/ConversationList";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
