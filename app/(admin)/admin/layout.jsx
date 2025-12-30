"use client";
import "@/app/globals.css";
import AdminLayout from "@/components/components-jsx/admin/AdminLayout";

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>; // ONLY THIS
}
