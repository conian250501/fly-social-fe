"use client";

import MainLayout from "@/Layouts/MainLayout";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
