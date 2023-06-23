"use client";

import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import ProfileLayout from "@/Layouts/ProfileLayout";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  return (
    <MainLayout>
      <LayoutWithNews>
        <ProfileLayout id={Number(params.id)}>{children}</ProfileLayout>
      </LayoutWithNews>
    </MainLayout>
  );
}
