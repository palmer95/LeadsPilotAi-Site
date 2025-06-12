// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [leadCount, setLeadCount] = useState<number | null>(null);
  //const [faqCount, setFaqCount] = useState<number | null>(null);
  const [calendarConnected, setCalendarConnected] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // If unauthorized, redirect to login
  useEffect(() => {
    (async () => {
      try {
        // 1) Fetch leads count
        const leadsRes = await fetch(
          "https://leadspilotai.onrender.com/api/admin/data/leads",
          {
            credentials: "include",
          }
        );
        if (leadsRes.status === 401) throw new Error("unauth");
        const leadsData = await leadsRes.json();
        setLeadCount(leadsData.length);

        // 2) Fetch FAQs count
        // const faqsRes = await fetch(
        //   "https://leadspilotai.onrender.com/api/admin/faqs",
        //   {
        //     credentials: "include",
        //   }
        // );
        // const faqsData = await faqsRes.json();
        //setFaqCount(faqsData.length);

        // TODO: calendar status integration
        //3) Fetch calendar status
        const calRes = await fetch(
          "https://leadspilotai.onrender.com/api/admin/calendar",
          {
            credentials: "include",
          }
        );
        const calData = await calRes.json();
        setCalendarConnected(calData.connected);

        setLoading(false);
      } catch (err) {
        console.error(err);
        // if any 401 or network error, redirect to login
        router.push("/admin/login");
      }
    })();
  }, [router]);

  const startCalendarOauth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found, please log in");
        return;
      }
      const res = await fetch(
        "https://leadspilotai.onrender.com/api/admin/calendar/oauth-start",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.redirected) {
        window.location.href = res.url; // Follow the OAuth redirect
      } else {
        const data = await res.json();
        console.error("OAuth start failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              //href="https://leadspilotai.onrender.com/api/admin/calendar/oauth-start"
              className="text-blue-600 underline text-sm mt-2 inline-block"
            >
              Connect Google Calendar →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
