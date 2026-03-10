"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
// Allow requests from frontend (Hostinger) and localhost for dev
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:8080",
    "https://vedinc.co.in",
    "https://www.vedinc.co.in",
    "https://vedinc-launchpad-main.onrender.com",
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests, please try again later.",
}));
app.use(express_1.default.json());
// 👇 IMPORTANT
app.use("/api/users", user_routes_1.default);
// existing routes
app.use("/api", routes_1.default);
// optional: serve uploaded images
app.use("/uploads", express_1.default.static("uploads"));
app.use(error_middleware_1.errorHandler);
exports.default = app;
