// app/setup/page.tsx
import { Suspense } from "react";
import SetupForm from "./setupform";
import "./setup.css"; // We will create this new CSS file

export default function SetupPage() {
  return (
    // Suspense is great for handling components that rely on client-side hooks like useSearchParams
    <Suspense fallback={<div className="loading-state">Loading...</div>}>
      <SetupForm />
    </Suspense>
  );
}
