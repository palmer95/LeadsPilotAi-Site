// app/page.tsx
import Link from "next/link";
import Image from "next/image";

const CheckIcon = () => (
  <svg
    className="check-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Text Content */}
            <div className="hero-text-content">
              <div className="hero-badge">
                <span className="badge-pill">
                  <span className="badge-dot"></span>
                  AI sales assistant for service businesses
                </span>
              </div>
              <h1 className="hero-headline">
                Your best salesperson works 24/7.{" "}
                <span className="text-gradient">And it&apos;s an AI.</span>
              </h1>
              <p className="hero-subheadline">
                LeadsPilotAI is the premium AI sales assistant for elite service
                businesses. We turn your website traffic into qualified, booked
                appointments.
              </p>
              <div className="hero-cta-group">
                <Link href="/contact" className="btn btn-brand btn-lg">
                  Book a Demo
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link href="#features" className="btn btn-secondary btn-lg">
                  Explore Features
                </Link>
              </div>
              <div className="hero-microcopy">
                <span>✓ White-glove onboarding</span>
                <span>✓ Live on your site in under an hour</span>
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="hero-visual-content">
              <div className="product-mockup-wrapper">
                <iframe
                  className="loom-embed-iframe"
                  src="https://www.loom.com/embed/0386893ab3e34a43b5b4c1810fe6c4cb?sid=63dc46e8-2c3a-4f37-b626-3419d65ee43b&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  loading="lazy"
                  title="LeadsPilotAI product demo"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="problem-solution-section">
        <div className="container text-center">
          <div className="section-header">
            <span className="section-kicker">The Problem</span>
            <h2 className="section-title">
              Your contact form is a conversion killer
            </h2>
            <p className="section-subtitle">
              Every day, high-intent prospects visit your site, consider your
              services, and leave. Why? Because filling out a form and waiting
              for an email is slow, impersonal, and full of friction. Every hour
              you wait to respond, that lead gets colder. The solution? Meet
              Clyde.
            </p>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section id="features" className="showcase-section">
        <div className="container">
          {/* Showcase Item 1: Engage & Educate */}
          <div className="showcase-item">
            <div className="showcase-text">
              <span className="showcase-kicker">Engage & Educate</span>
              <h2 className="showcase-title">
                Answer every question, instantly
              </h2>
              <p className="showcase-description">
                Clyde is trained on your website content, turning it into an
                expert AI that can answer specific, complex questions about your
                services 24/7. It builds trust and educates your prospects
                before they even speak to a human.
              </p>
              <ul className="showcase-checklist">
                <li>
                  <CheckIcon />
                  <span>24/7/365 availability</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Handles complex, multi-part questions</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Reduces bounce rates and increases engagement</span>
                </li>
              </ul>
            </div>
            <div className="showcase-visual">
              <Image
                src="/qa.png"
                alt="LeadsPilotAI chatbot answering a customer question"
                width={500}
                height={400}
                className="product-mockup-image"
              />
            </div>
          </div>

          {/* Showcase Item 2: Qualify & Convert */}
          <div className="showcase-item reverse">
            <div className="showcase-visual">
              <Image
                src="/calendar.png"
                alt="LeadsPilotAI in-chat booking calendar"
                width={400}
                height={600}
                className="product-mockup-image"
                quality={100}
              />
            </div>
            <div className="showcase-text">
              <span className="showcase-kicker">Qualify & Convert</span>
              <h2 className="showcase-title">
                A frictionless path to booking
              </h2>
              <p className="showcase-description">
                Stop losing leads to cumbersome contact forms. When a prospect
                is ready, Clyde presents your real-time availability and books a
                qualified consultation directly into your Google Calendar.
              </p>
              <ul className="showcase-checklist">
                <li>
                  <CheckIcon />
                  <span>Direct Google Calendar integration</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Eliminates back-and-forth scheduling</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Converts high-intent visitors instantly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band-content">
            <h2 className="cta-band-title">
              Put your lead generation on autopilot
            </h2>
            <p className="cta-band-subtitle">
              See exactly how Clyde would work on your website. Book a live demo
              and we&apos;ll have you up and running in under an hour.
            </p>
            <div className="cta-band-actions">
              <Link href="/contact" className="btn btn-brand btn-lg">
                Book a Demo
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link href="/pricing" className="btn btn-secondary btn-lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
