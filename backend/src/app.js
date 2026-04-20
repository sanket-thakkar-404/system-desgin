import express from "express"
import cors from "cors"
import config from "./config/dotenv.config.js";

const app = express();

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }));



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date(),
  });
});

// routes
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/services.routes.js"
import ClientRoutes from "./routes/clients.routes.js"



// apis
app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/clients", ClientRoutes)



export default app