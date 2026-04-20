import express from "express"
import cors from "cors"

const app = express();

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }));


// routes
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/services.routes.js"
import ClientRoutes from "./routes/clients.routes.js"


// apis
app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/clients", ClientRoutes)


export default app