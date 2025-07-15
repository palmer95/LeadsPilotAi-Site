// app/admin/layout.tsx
import "./admin.css"; // We'll create this new CSS file
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            LeadsPilotAI
          </Link>
        </div>
        <nav className="sidebar-nav">
          <Link href="/admin" className="nav-item active">
            {/* SVG Icon for Dashboard */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
            </svg>
            <span>Dashboard</span>
          </Link>
          {/* We can add more links here later, e.g., Settings, Billing */}
        </nav>
      </aside>
      <main className="admin-main-content">{children}</main>
    </div>
  );
}
