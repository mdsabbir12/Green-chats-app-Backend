import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "../route/user.route.js";
import messageRoute from "../route/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// 👉 Handle preflight requests (OPTIONS)
app.options("*", cors());

app.use(
  cors({
    origin: [
      "http://localhost:4001",
      "https://green-chats-apps.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// MongoDB connect
try {
  await mongoose.connect(process.env.Mongodb_URL);
  console.log("✅ MongoDB connected");
} catch (error) {
  console.error("❌ MongoDB connection error:", error);
}

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Green Chats Backend is Live");
});

export default app;
