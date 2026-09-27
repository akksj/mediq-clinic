import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import appointmentRoutes from "./routes/appointments.js";
import queueRoutes from "./routes/queue.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "mediq-clinic" });
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/queue", queueRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const port = Number(process.env.PORT || 5000);

connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`MediQ API on :${port}`));
  })
  .catch((error) => {
    console.error("Failed to start", error);
    process.exit(1);
  });
