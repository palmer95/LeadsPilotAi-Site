(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://your-chatbot-frontend-url.com"; // Update after deploy
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "12px";
  iframe.allow = "clipboard-write;";

  document.body.appendChild(iframe);
})();
