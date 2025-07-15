// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define a type for our lead data for better code quality
type Lead = {
  _id: string;
  name: string;
  email: string;
  interested_package: string;
  created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [calendarConnected, setCalendarConnected] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all data in parallel for better performance
        const [verifyRes, leadsRes, calRes] = await Promise.all([
          fetch("https://leadspilotai.onrender.com/api/admin/verify-token", {
            headers,
          }),
          fetch("https://leadspilotai.onrender.com/api/admin/data/leads", {
            headers,
          }),
          fetch("https://leadspilotai.onrender.com/api/admin/calendar/", {
            headers,
          }),
        ]);

        if (!verifyRes.ok || !leadsRes.ok || !calRes.ok) {
          // Log specific errors if possible
          if (!verifyRes.ok)
            console.error("Verify token failed:", verifyRes.status);
          if (!leadsRes.ok)
            console.error("Leads fetch failed:", leadsRes.status);
          if (!calRes.ok)
            console.error("Calendar fetch failed:", calRes.status);
          throw new Error("Failed to fetch all dashboard data");
        }

        const verifyData = await verifyRes.json();
        if (!verifyData.logged_in) throw new Error("Not logged in");
        setUserName(verifyData.email || "Admin");

        const leadsData = await leadsRes.json();
        setLeads(leadsData);

        const calData = await calRes.json();
        setCalendarConnected(calData.connected);
      } catch (err) {
        console.error("Dashboard error:", err);
        localStorage.removeItem("authToken");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const startCalendarOauth = () => {
    const token = localStorage.getItem("authToken");
    if (!token || oauthLoading) return;
    setOauthLoading(true);
    const oauthUrl = `https://leadspilotai.onrender.com/api/admin/calendar/oauth-start?token=${encodeURIComponent(
      token
    )}`;
    window.location.href = oauthUrl;
  };

  if (loading) {
    return <div className="loading-state">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {userName.split("@")[0]}</h1>
        <p>Here&apos;s a snapshot of your AI assistant&apos;s performance.</p>
      </header>

      {/* STAT CARDS */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <h4>Total Leads Captured</h4>
          <p className="stat-value">{leads.length}</p>
        </div>
        <div className="stat-card">
          <h4>Calendar Status</h4>
          <div className="stat-value-flex">
            <span
              className={`status-dot ${
                calendarConnected ? "connected" : "disconnected"
              }`}
            ></span>
            <p>{calendarConnected ? "Connected" : "Not Connected"}</p>
          </div>
          {!calendarConnected && (
            <button
              onClick={startCalendarOauth}
              disabled={oauthLoading}
              className="connect-button"
            >
              {oauthLoading ? "Redirecting..." : "Connect Google Calendar"}
            </button>
          )}
        </div>
        <div className="stat-card">
          <h4>Appointments Booked</h4>
          <p className="stat-value">--</p>
          <p className="stat-note">Feature coming soon</p>
        </div>
      </div>

      {/* LEADS TABLE (MINI-CRM) */}
      <div className="leads-table-container">
        <h2 className="table-title">Recent Leads</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Interested In</th>
                <th>Date Captured</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.slice(0, 10).map(
                  (
                    lead // Show top 10 recent leads
                  ) => (
                    <tr key={lead._id}>
                      <td>{lead.name}</td>
                      <td>
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </td>
                      <td>{lead.interested_package || "N/A"}</td>
                      <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    No leads captured yet. Your first leads will appear here!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
