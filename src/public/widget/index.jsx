import React from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "../frontend/ChatWidget"; // adjust path as needed

// Immediately‐Invoked Function to mount into the host page
(function () {
  const container = document.createElement("div");
  container.id = "leads-pilot-chatbot-container";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<ChatWidget />);
})();
