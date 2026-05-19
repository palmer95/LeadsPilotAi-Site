"use client";
import { useState, useEffect, useMemo } from "react";

const API = "https://leadspilotai.onrender.com";

type Message = { user: string; bot: string; timestamp: string | null };
type Conversation = {
  _id: string;
  session_id: string;
  messageCount: number;
  lastActive: string | null;
  messages: Message[];
};
type Question = { question: string; timestamp: string | null };
type Gap = { question: string; botResponse: string; timestamp: string | null };
type Stats = {
  conversationCount: number;
  messageCount: number;
  leadCount: number;
  gapCount: number;
};

function formatDate(ts: string | null) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(ts: string | null) {
  if (!ts) return "";
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedConv, setExpandedConv] = useState<string | null>(null);
  const [convSearch, setConvSearch] = useState("");
  const [addingGapIdx, setAddingGapIdx] = useState<number | null>(null);
  const [gapAnswer, setGapAnswer] = useState("");
  const [gapSubmitting, setGapSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API}/api/admin/analytics/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setStats(data.stats);
        setConversations(data.recentConversations);
        setAllQuestions(data.allQuestions);
        setGaps(data.knowledgeGaps);
      } catch (err) {
        console.error(err);
        setError("Could not load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredConversations = useMemo(() => {
    if (!convSearch.trim()) return conversations;
    const q = convSearch.toLowerCase();
    return conversations.filter((c) =>
      c.messages.some(
        (m) =>
          m.user.toLowerCase().includes(q) || m.bot.toLowerCase().includes(q)
      )
    );
  }, [conversations, convSearch]);

  const handleAddToTraining = async (gap: Gap, idx: number) => {
    if (!gapAnswer.trim()) return;
    setGapSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API}/api/admin/training/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: gap.question, answer: gapAnswer }),
      });
      if (!res.ok) throw new Error();
      setGaps((prev) => prev.filter((_, i) => i !== idx));
      setAddingGapIdx(null);
      setGapAnswer("");
      setSuccessMsg("Answer saved to training data. Clyde will use it on the next deploy.");
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setGapSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        Loading Analytics...
      </div>
    );
  }

  if (error) return <div className="loading-state">{error}</div>;

  const visibleQuestions = showAllQuestions
    ? [...allQuestions].reverse()
    : [...allQuestions].reverse().slice(0, 20);

  return (
    <div className="admin-analytics-page">
      <header className="dashboard-header">
        <div>
          <h1>Analytics</h1>
          <p>What visitors are asking and where your AI needs more training.</p>
        </div>
      </header>

      {/* ── STAT CARDS ── */}
      {stats && (
        <div className="stat-cards-grid">
          <div className="stat-card">
            <div className="stat-card-icon stat-icon-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h4>Conversations</h4>
              <p className="stat-value">{stats.conversationCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon stat-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div>
              <h4>Messages Sent</h4>
              <p className="stat-value">{stats.messageCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon stat-icon-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h4>Leads Captured</h4>
              <p className="stat-value">{stats.leadCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className={`stat-card-icon ${stats.gapCount > 0 ? "stat-icon-red" : "stat-icon-green"}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h4>Knowledge Gaps</h4>
              <p className="stat-value">{stats.gapCount}</p>
              {stats.gapCount > 0 && (
                <p className="stat-note">Questions Clyde couldn&apos;t answer</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── KNOWLEDGE GAPS ── */}
      {gaps.length > 0 && (
        <div className="leads-table-container">
          <div className="table-header-row">
            <div>
              <h2 className="table-title">Knowledge Gaps</h2>
              <p className="table-subtitle">
                Clyde couldn&apos;t answer these — write the correct answer to fix them instantly.
              </p>
            </div>
          </div>

          {successMsg && (
            <p style={{ color: "var(--accent-green, #16a34a)", padding: "0 0 1rem", fontWeight: 500 }}>
              ✓ {successMsg}
            </p>
          )}

          <div className="conversation-list">
            {gaps.map((gap, idx) => (
              <div key={idx} className="conversation-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, marginBottom: "0.3rem" }}>{gap.question}</p>
                    <p className="bot-message" style={{ fontSize: "0.83rem", color: "#888", marginBottom: "0.25rem" }}>
                      Clyde said: &ldquo;{gap.botResponse.slice(0, 140)}{gap.botResponse.length > 140 ? "…" : ""}&rdquo;
                    </p>
                    {gap.timestamp && (
                      <p style={{ fontSize: "0.75rem", color: "#bbb" }}>{formatDate(gap.timestamp)}</p>
                    )}
                  </div>
                  <button
                    className="export-button"
                    style={{ flexShrink: 0 }}
                    onClick={() => {
                      setAddingGapIdx(addingGapIdx === idx ? null : idx);
                      setGapAnswer("");
                    }}
                  >
                    {addingGapIdx === idx ? "Cancel" : "+ Add Answer"}
                  </button>
                </div>

                {addingGapIdx === idx && (
                  <div style={{ marginTop: "0.9rem", paddingTop: "0.9rem", borderTop: "1px solid #eee" }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                      What should Clyde say?
                    </p>
                    <textarea
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        fontSize: "0.9rem",
                        resize: "vertical",
                        fontFamily: "inherit",
                      }}
                      value={gapAnswer}
                      onChange={(e) => setGapAnswer(e.target.value)}
                      placeholder="Write the answer Clyde should give next time this is asked…"
                    />
                    <button
                      className="login-button"
                      style={{ marginTop: "0.5rem", width: "auto", padding: "0.5rem 1.25rem" }}
                      disabled={!gapAnswer.trim() || gapSubmitting}
                      onClick={() => handleAddToTraining(gap, idx)}
                    >
                      {gapSubmitting ? "Saving…" : "Save to Training Data"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONVERSATION BROWSER ── */}
      <div className="leads-table-container">
        <div className="table-header-row">
          <div>
            <h2 className="table-title">Recent Conversations</h2>
            <p className="table-subtitle">{conversations.length} sessions — click any to read the full chat</p>
          </div>
          <div className="table-actions">
            <div className="search-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search chats…"
                value={convSearch}
                onChange={(e) => setConvSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="conversation-list">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div key={conv._id} className="conversation-item">
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  onClick={() => setExpandedConv(expandedConv === conv._id ? null : conv._id)}
                >
                  <div>
                    <p style={{ fontWeight: 600 }}>
                      {conv.messageCount} message{conv.messageCount !== 1 ? "s" : ""}
                      {conv.lastActive && (
                        <span style={{ fontWeight: 400, color: "#888", fontSize: "0.85rem", marginLeft: "0.75rem" }}>
                          {formatDateTime(conv.lastActive)}
                        </span>
                      )}
                    </p>
                    {conv.messages[0]?.user && (
                      <p style={{ fontSize: "0.85rem", color: "#555", marginTop: "0.2rem" }}>
                        &ldquo;{conv.messages[0].user.slice(0, 90)}{conv.messages[0].user.length > 90 ? "…" : ""}&rdquo;
                      </p>
                    )}
                  </div>
                  <span style={{ color: "#aaa", fontSize: "0.75rem" }}>
                    {expandedConv === conv._id ? "▲ collapse" : "▼ expand"}
                  </span>
                </div>

                {expandedConv === conv._id && (
                  <div style={{ marginTop: "0.9rem", paddingTop: "0.9rem", borderTop: "1px solid #eee" }}>
                    {conv.messages.map((msg, i) => (
                      <div key={i} style={{ marginBottom: "0.6rem" }}>
                        {msg.user && (
                          <p className="user-message">
                            <strong>User: </strong>{msg.user}
                          </p>
                        )}
                        {msg.bot && (
                          <p className="bot-message">
                            <strong>Clyde: </strong>{msg.bot}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              {convSearch ? "No conversations match your search." : "No conversations recorded yet."}
            </div>
          )}
        </div>
      </div>

      {/* ── ALL QUESTIONS ── */}
      {allQuestions.length > 0 && (
        <div className="leads-table-container">
          <div className="table-header-row">
            <div>
              <h2 className="table-title">All Questions Asked</h2>
              <p className="table-subtitle">
                Every question visitors have asked — use this to spot content gaps on your website and add training data.
              </p>
            </div>
            <span style={{ fontSize: "0.85rem", color: "#888" }}>{allQuestions.length} total</span>
          </div>

          <div className="conversation-list">
            {visibleQuestions.map((q, i) => (
              <div key={i} className="conversation-item" style={{ padding: "0.6rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0 }}>{q.question}</p>
                  {q.timestamp && (
                    <span style={{ fontSize: "0.75rem", color: "#bbb", flexShrink: 0, marginLeft: "1rem" }}>
                      {formatDate(q.timestamp)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {allQuestions.length > 20 && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <button
                className="export-button"
                onClick={() => setShowAllQuestions(!showAllQuestions)}
              >
                {showAllQuestions ? "Show Less" : `Show All ${allQuestions.length} Questions`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
