const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public"), { maxAge: "1h" }));

// Health / keep-alive endpoint
app.get("/health", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ status: "ok", time: new Date().toISOString(), uptime: Math.floor(process.uptime()) });
});

app.listen(PORT, "0.0.0.0", () => console.log(`Nexora site running on port ${PORT}`));

// ---- Self ping every 2 minutes ----
// Render automatically sets RENDER_EXTERNAL_URL (your public URL).
// Agar na mile to Environment me SELF_URL = https://your-app.onrender.com daal dena.
const SELF_URL = (process.env.RENDER_EXTERNAL_URL || process.env.SELF_URL || "").replace(/\/$/, "");
const PING_EVERY_MS = 2 * 60 * 1000;

if (SELF_URL) {
  setInterval(async () => {
    try {
      const r = await fetch(`${SELF_URL}/health`, { cache: "no-store" });
      console.log(`[ping] ${new Date().toISOString()} -> ${r.status}`);
    } catch (e) {
      console.log(`[ping] failed: ${e.message}`);
    }
  }, PING_EVERY_MS);
  console.log(`Self-ping enabled: ${SELF_URL}/health every 2 min`);
} else {
  console.log("Self-ping off (RENDER_EXTERNAL_URL / SELF_URL not set)");
}
