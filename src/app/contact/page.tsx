// app/contact/page.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";

// We declare the function on the window type for TypeScript
declare global {
  interface Window {
    openLeadsPilotWidget?: () => void;
  }
}

export default function ContactPage() {
  useEffect(() => {
    // Set a timer to open the widget after 2 seconds (2000 milliseconds)
    const timer = setTimeout(() => {
      // Check if the widget and its function are available on the window object
      if (window.openLeadsPilotWidget) {
        window.openLeadsPilotWidget();
      }
    }, 3500); // 2-second delay

    // Cleanup: If the user navigates away before 2 seconds, clear the timer
    return () => clearTimeout(timer);
  }, []); // The empty array ensures this runs only once when the page loads

  return (
    <main>
      <section className="contact-hero-section">
        <div className="container text-center">
          <div className="contact-content-wrapper">
            <h1 className="contact-headline">Talk to Us. Instantly.</h1>
            <p className="contact-subheadline">
              The best way to reach us is through our AI assistant, Clyde.
              He&apos;s opening up to greet you now...
            </p>
            {/* The old CTA is removed to focus attention on the auto-opening widget */}
            <div className="contact-failsafe">
              <p>
                If the chat widget doesn&apos;t open, you can click the bubble
                in the corner or reach us directly at{" "}
                <a href="mailto:hello@leadspilotai.com">
                  hello@leadspilotai.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
