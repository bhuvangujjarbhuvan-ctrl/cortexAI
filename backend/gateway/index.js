import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const port = process.env.PORT;
const app = express();

// CORS — allow any localhost port with credentials
app.use(cors({
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true,
}));

// Proxy /auth → auth service (http-proxy-middleware handles body streaming correctly)
app.use("/auth", createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },  // /auth/google → /google on auth service
    on: {
        error: (err, req, res) => {
            console.error("Proxy error:", err.message);
            res.status(502).json({ message: "Auth service unavailable" });
        }
    }
}));

app.get("/", (req, res) => {
    res.json({ message: "hello from gateway" });
});

app.listen(port, () => {
    console.log(`gateway started at ${port}`);
});