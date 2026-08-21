import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

// Wraps every admin page with the recurring sidebar + topbar chrome.
// Usage: <AdminLayout title="Institutions">...page content...</AdminLayout>
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="app">
      <AdminSidebar />
      <main className="main">
        <div className="page-content">
          <section className="view active">{children}</section>
        </div>
      </main>
    </div>
  );
}
