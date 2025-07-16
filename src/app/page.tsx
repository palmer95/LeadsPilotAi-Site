// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Text Content */}
            <div className="hero-text-content">
              <h1 className="hero-headline">
                Your Best Salesperson Works 24/7. And it&apos;s an AI.
              </h1>
              <p className="hero-subheadline">
                LeadsPilotAI is the premium AI sales assistant for elite service
                businesses. We turn your website traffic into qualified, booked
                appointments.
              </p>
              <div className="hero-cta-group">
                <Link href="/contact" passHref>
                  <button className="btn btn-primary">Book a Demo</button>
                </Link>
                <Link href="#features" passHref>
                  <button className="btn btn-secondary">
                    Explore Features
                  </button>
                </Link>
              </div>
              {/* <div className="social-proof">
                <p className="social-proof-title">
                  TRUSTED BY HIGH-GROWTH FIRMS
                </p>
                <div className="social-proof-logos">
                  {/* Replace these with <img> tags of your client logos later 
              <span>Virtour Media</span>
              <span>Client Two</span>
                  <span>Client Three</span> 
                </div>
              </div> */}
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="hero-visual-content">
              <div className="product-mockup-wrapper">
                <Image
                  src="/calendar.png" // Using the generated image as a placeholder
                  alt="LeadsPilotAI chatbot interface"
                  width={400}
                  height={815}
                  className="product-mockup-image"
                  priority
                />
              </div>
            </div>
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
                Answer Every Question, Instantly
              </h2>
              <p className="showcase-description">
                Clyde is trained on your website content, turning it into an
                expert AI that can answer specific, complex questions about your
                services 24/7. It builds trust and educates your prospects
                before they even speak to a human.
              </p>
              <ul className="showcase-checklist">
                <li>✅ 24/7/365 availability</li>
                <li>✅ Handles complex, multi-part questions</li>
                <li>✅ Reduces bounce rates and increases engagement</li>
              </ul>
            </div>
            <div className="showcase-visual">
              <div className="product-mockup-simple">
                {/* Replace with an image of the bot answering a question */}
                <Image
                  src="/qa.png"
                  alt="LeadsPilotAI chatbot answering a customer question"
                  width={500}
                  height={400}
                  className="product-mockup-image"
                />
              </div>
            </div>
          </div>

          {/* Showcase Item 2: Qualify & Convert */}
          <div className="showcase-item reverse">
            <div className="showcase-text">
              <span className="showcase-kicker">Qualify & Convert</span>
              <h2 className="showcase-title">A Frictionless Path to Booking</h2>
              <p className="showcase-description">
                Stop losing leads to cumbersome contact forms and email tag.
                When a prospect is ready, Clyde presents your real-time
                availability and books a qualified consultation directly into
                your Google Calendar.
              </p>
              <ul className="showcase-checklist">
                <li>✅ Direct Google Calendar integration</li>
                <li>✅ Eliminates back-and-forth scheduling</li>
                <li>✅ Converts high-intent visitors instantly</li>
              </ul>
            </div>
            <div className="showcase-visual">
              <div className="product-mockup-simple">
                {/* Use the great calendar mockup image here */}
                <Image
                  src="/calendar.png" // The local mockup image
                  alt="LeadsPilotAI in-chat booking calendar"
                  width={400}
                  height={600}
                  className="product-mockup-image"
                />
              </div>
            </div>
          </div>

          {/* Showcase Item 3: Integrate & Analyze */}

          {/* 
          uncomment after admin dashboard up and working
          <div className="showcase-item">
            <div className="showcase-text">
              <span className="showcase-kicker">Integrate & Analyze</span>
              <h2 className="showcase-title">A Seamless Part of Your Brand</h2>
              <p className="showcase-description">
                Clyde is designed to feel like a native part of your website,
                not a clunky third-party widget. Customize the look, feel, and
                voice to perfectly match your brand, and gain valuable insights
                from customer conversations.
              </p>
              <ul className="showcase-checklist">
                <li>✅ Fully customizable branding and colors</li>
                <li>
                  ✅ Review conversation logs to understand your customers
                </li>
                <li>✅ Simple, one-line script installation</li>
              </ul>
            </div>
            <div className="showcase-visual">
              <div className="product-mockup-simple">
                <Image
                  src="/admin.png"
                  alt="LeadsPilotAI admin dashboard showing customization options"
                  width={500}
                  height={400}
                  className="product-mockup-image"
                />
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
