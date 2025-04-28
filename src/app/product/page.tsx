// app/product/page.tsx
"use client";
import Link from "next/link";

export default function ProductPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">What Your AI Sales Agent Can Do</h1>
          <p className="hero-text">
            Clyde, powered by LeadsPilotAI, is trained on your website, branded
            to match your business, and equipped with smart AI to convert
            visitors into customers—24/7.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="benefits">
        <h2 className="section-title">Key Features</h2>
        <div className="product-features">
          {[
            {
              title: "Instant Q&A",
              desc: "Answers customer questions using your website content, instantly and accurately.",
            },
            {
              title: "Lead Capture",
              desc: "Collects emails and inquiries so you never miss a potential client.",
            },
            {
              title: "Booking Triggers",
              desc: "Notifies your team or starts bookings when someone’s ready to buy.",
            },
          ].map((item, i) => (
            <div key={i} className="product-feature-card">
              <h3 className="benefit-title">{item.title}</h3>
              <p className="benefit-text">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="how-it-works-grid">
          {[
            {
              emoji: "📄",
              label: "Ingest",
              desc: "We scan your website to learn your services, tone, and branding.",
            },
            {
              emoji: "🧠",
              label: "Train",
              desc: "We embed your content and add smart AI to handle any question.",
            },
            {
              emoji: "🚀",
              label: "Launch",
              desc: "Clyde goes live on your site, selling and supporting 24/7.",
            },
          ].map((step, i) => (
            <div key={i} className="how-it-works-card">
              <div className="how-it-works-icon">{step.emoji}</div>
              <h4 className="how-it-works-title">{step.label}</h4>
              <p className="how-it-works-text">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-title">Ready to Get Clyde Live?</h2>
        <p className="cta-text">
          Transform your website into a 24/7 sales machine with Clyde.
        </p>
        <div className="hero-cta">
          <Link href="/pricing">
            <button className="btn-primary">View Pricing</button>
          </Link>
          <Link href="/contact">
            <button className="btn-secondary">Request a Demo</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
