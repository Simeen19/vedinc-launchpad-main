import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(helmet());

// Allow requests from frontend (Hostinger) and localhost for dev
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:8080",
    "https://vedinc.co.in",
    "https://www.vedinc.co.in",
    "https://vedinc-launchpad-main.onrender.com",
].filter(Boolean) as string[];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200,
        message: "Too many requests, please try again later.",
    })
);

app.use(express.json());

// 👇 IMPORTANT
app.use("/api/users", userRoutes);

// existing routes
app.use("/api", routes);

// optional: serve uploaded images
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

export default app;