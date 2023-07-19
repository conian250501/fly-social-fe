"use client";

import AdminLayout from "@/Layouts/AdminLayout/AdminLayout";

export default function ManageUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
