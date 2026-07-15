// components/Logo.tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="LeadsPilotAI home">
      <img
        src="/logo-header.png"
        alt="LeadsPilotAI"
        className="logo-image"
      />
    </Link>
  );
}
