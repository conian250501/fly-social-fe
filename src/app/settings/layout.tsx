"use client";

import SettingLinks from "@/components/SettingLinks";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import ProfileLayout from "@/Layouts/ProfileLayout";
import { Col, Row } from "react-bootstrap";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <LayoutWithNews>{children}</LayoutWithNews>
    </MainLayout>
  );
}
