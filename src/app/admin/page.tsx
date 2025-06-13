"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [calendarConnected, setCalendarConnected] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        // Verify token
        const verifyRes = await fetch(
          "https://leadspilotai.onrender.com/api/admin/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!verifyRes.ok) {
          throw new Error("Unauthorized");
        }
        const verifyData = await verifyRes.json();
        if (!verifyData.logged_in) {
          throw new Error("Not logged in");
        }

        // Fetch leads count
        const leadsRes = await fetch(
          "https://leadspilotai.onrender.com/api/admin/data/leads",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!leadsRes.ok) {
          throw new Error("Failed to fetch leads");
        }
        const leadsData = await leadsRes.json();
        setLeadCount(leadsData.length);

        // Fetch calendar status
        const calRes = await fetch(
          "https://leadspilotai.onrender.com/api/admin/calendar/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!calRes.ok) {
          throw new Error("Failed to fetch calendar status");
        }
        const calData = await calRes.json();
        setCalendarConnected(calData.connected);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        localStorage.removeItem("authToken");
        router.push("/admin/login");
      }
    })();
  }, [router]);

  const startCalendarOauth = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found, please log in");
      alert("Please log in to connect your calendar");
      router.push("/admin/login");
      return;
    }
    // Directly navigate to oauth-start with token in query param
    const oauthUrl = `https://leadspilotai.onrender.com/api/admin/calendar/oauth-start?token=${encodeURIComponent(
      token
    )}`;
    window.location.href = oauthUrl;
  };

  if (loading) {
    return (
      <div className="section-text text-center mt-20">Loading dashboard…</div>
    );
  }

  return (
    <section className="benefits p-6">
      <h1 className="section-title mb-4">Admin Dashboard</h1>
      <div className="benefits-grid">
        <div className="benefit-card">
          <h2 className="benefit-title">Leads Captured</h2>
          <p className="benefit-text text-2xl">{leadCount}</p>
        </div>
        <div className="benefit-card">
          <h2 className="benefit-title">Calendar Connected</h2>
          <p
            className={`benefit-text text-2xl ${
              calendarConnected ? "text-green-600" : "text-red-600"
            }`}
          >
            {calendarConnected ? "Yes" : "No"}
          </p>
          {!calendarConnected && (
            <button
              onClick={startCalendarOauth}
              disabled={loading}
              className={`text-blue-600 underline text-sm mt-2 inline-block ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Connecting..." : "Connect Google Calendar →"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
