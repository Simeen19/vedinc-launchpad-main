import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(helmet());

// Allow requests from Vercel frontend, Render, and localhost
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                process.env.FRONTEND_URL,
                "http://localhost:8080",
                "https://vedinc-launchpad-main.onrender.com",
            ].filter(Boolean);

            // Allow requests with no origin (server-to-server, Postman, etc.)
            if (!origin) return callback(null, true);
            // Allow Vercel preview URLs (*.vercel.app)
            if (origin.endsWith(".vercel.app")) return callback(null, true);
            // Allow explicitly listed origins
            if (allowedOrigins.includes(origin)) return callback(null, true);

            callback(new Error("Not allowed by CORS"));
        },
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