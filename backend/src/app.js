import express from "express";
import cors from "cors";
import config from "./config/dotenv.config.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// 🔥 fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));

// 🔥 correct static path
app.use(express.static(path.join(__dirname, "../public")));


// ================= HEALTH =================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date(),
  });
});

// ================= ROUTES =================
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/services.routes.js";
import ClientRoutes from "./routes/clients.routes.js";


// ================= APIS =================
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/clients", ClientRoutes);

// ================= SPA FALLBACK =================
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;