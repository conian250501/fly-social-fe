"use client";

import AdminLayout from "@/Layouts/AdminLayout";

export default function ManageTweetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
