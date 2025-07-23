// app/admin/analytics/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext"; // Assuming AuthContext is in app/context

type Stats = {
  leadCount: number;
  conversationCount: number;
  appointmentsBooked: number;
};

type Conversation = {
  _id: string;
  messages: { user: string; bot: string }[];
};

export default function AnalyticsPage() {
  const { token, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      // Redirect logic if you have it
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://leadspilotai.onrender.com/api/admin/analytics/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch analytics data");
        const data = await res.json();
        setStats(data.stats);
        setConversations(data.recentConversations);
      } catch (err) {
        console.error("could not load: ", err);
        setError("Could not load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, authLoading]);

  if (loading || authLoading)
    return <div className="loading-state">Loading Analytics...</div>;
  if (error) return <div className="loading-state">{error}</div>;

  return (
    <div className="admin-analytics-page">
      <header className="dashboard-header">
        <h1>Analytics</h1>
        <p>
          Measure your AI assistant&apos;s impact and review recent
          conversations.
        </p>
      </header>

      {stats && (
        <div className="stat-cards-grid">
          <div className="stat-card">
            <h4>Total Conversations</h4>
            <p className="stat-value">{stats.conversationCount}</p>
          </div>
          <div className="stat-card">
            <h4>Leads Captured</h4>
            <p className="stat-value">{stats.leadCount}</p>
          </div>
          <div className="stat-card">
            <h4>Appointments Booked</h4>
            <p className="stat-value">{stats.appointmentsBooked}</p>
            <p className="stat-note">Feature coming soon</p>
          </div>
        </div>
      )}

      <div className="leads-table-container">
        <h2 className="table-title">Recent Conversations</h2>
        <div className="conversation-list">
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <div key={conv._id} className="conversation-item">
                {conv.messages.slice(0, 4).map((msg, index) => (
                  <p
                    key={index}
                    className={msg.user ? "user-message" : "bot-message"}
                  >
                    <strong>{msg.user ? "User:" : "Clyde:"}</strong>{" "}
                    {msg.bot || msg.user}
                  </p>
                ))}
                {conv.messages.length > 4 && (
                  <p className="more-messages">...</p>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">No conversations recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
