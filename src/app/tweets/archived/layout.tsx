"use client";

import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";

export default function TweetsArchivedLayout({
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
