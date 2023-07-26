"use client";

import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
