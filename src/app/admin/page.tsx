// app/admin/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  _id: string;
  name: string;
  email: string;
  interested_package: string;
  created_at: string;
};

type SortKey = keyof Lead;
type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg className="sort-icon sort-icon-inactive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
      </svg>
    );
  }
  return dir === "asc" ? (
    <svg className="sort-icon sort-icon-active" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  ) : (
    <svg className="sort-icon sort-icon-active" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

function PackageBadge({ pkg }: { pkg: string }) {
  if (!pkg || pkg === "N/A")
    return <span className="badge badge-neutral">N/A</span>;
  const lower = pkg.toLowerCase();
  const cls =
    lower.includes("enterprise") || lower.includes("premium")
      ? "badge-purple"
      : lower.includes("pro") || lower.includes("growth")
      ? "badge-blue"
      : lower.includes("basic") || lower.includes("starter")
      ? "badge-gray"
      : "badge-blue";
  return <span className={`badge ${cls}`}>{pkg}</span>;
}

function exportCSV(leads: Lead[]) {
  const headers = ["Name", "Email", "Interested In", "Date Captured"];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.interested_package || "N/A",
    new Date(l.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => `"${v}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [calendarConnected, setCalendarConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const headers = { Authorization: `Bearer ${token}` };

        const [verifyRes, leadsRes, calRes] = await Promise.all([
          fetch("https://leadspilotai.onrender.com/api/admin/verify-token", { headers }),
          fetch("https://leadspilotai.onrender.com/api/admin/data/leads", { headers }),
          fetch("https://leadspilotai.onrender.com/api/admin/calendar/", { headers }),
        ]);

        if (!verifyRes.ok || !leadsRes.ok || !calRes.ok) {
          if (!verifyRes.ok) console.error("Verify token failed:", verifyRes.status);
          if (!leadsRes.ok) console.error("Leads fetch failed:", leadsRes.status);
          if (!calRes.ok) console.error("Calendar fetch failed:", calRes.status);
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

  const newThisWeek = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return leads.filter((l) => new Date(l.created_at) > cutoff).length;
  }, [leads]);

  const filteredSortedLeads = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = q
      ? leads.filter(
          (l) =>
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            (l.interested_package || "").toLowerCase().includes(q)
        )
      : leads;

    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [leads, search, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const startCalendarOauth = () => {
    const token = localStorage.getItem("authToken");
    if (!token || oauthLoading) return;
    setOauthLoading(true);
    const oauthUrl = `https://leadspilotai.onrender.com/api/admin/calendar/oauth-start?token=${encodeURIComponent(token)}`;
    window.location.href = oauthUrl;
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        Loading Dashboard...
      </div>
    );
  }

  const sortableCols: { key: SortKey; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "interested_package", label: "Interested In" },
    { key: "created_at", label: "Date Captured" },
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, {userName.split("@")[0]}</h1>
          <p>Here&apos;s a snapshot of your AI assistant&apos;s performance.</p>
        </div>
      </header>

      {/* STAT CARDS */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-card-icon stat-icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h4>Total Leads</h4>
            <p className="stat-value">{leads.length}</p>
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
            <h4>New This Week</h4>
            <p className="stat-value">{newThisWeek}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className={`stat-card-icon ${calendarConnected ? "stat-icon-green" : "stat-icon-red"}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h4>Calendar</h4>
            <div className="stat-value-flex">
              <span className={`status-dot ${calendarConnected ? "connected" : "disconnected"}`} />
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
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-icon-purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
            </svg>
          </div>
          <div>
            <h4>Appointments Booked</h4>
            <p className="stat-value">--</p>
            <p className="stat-note">Coming soon</p>
          </div>
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="leads-table-container">
        <div className="table-header-row">
          <div>
            <h2 className="table-title">Leads</h2>
            <p className="table-subtitle">
              {filteredSortedLeads.length} of {leads.length} records
            </p>
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
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="export-button" onClick={() => exportCSV(filteredSortedLeads)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {sortableCols.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={`sortable-th ${sortKey === key ? "th-active" : ""}`}
                  >
                    <span className="th-inner">
                      {label}
                      <SortIcon active={sortKey === key} dir={sortDir} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSortedLeads.length > 0 ? (
                filteredSortedLeads.map((lead) => (
                  <tr key={lead._id} className="lead-row">
                    <td data-label="Name">{lead.name}</td>
                    <td data-label="Email">
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </td>
                    <td data-label="Interested In">
                      <PackageBadge pkg={lead.interested_package} />
                    </td>
                    <td data-label="Date Captured">
                      {new Date(lead.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    {search ? "No leads match your search." : "No leads captured yet."}
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
