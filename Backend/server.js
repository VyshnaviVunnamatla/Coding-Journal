import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(express.json({ limit: "1mb" }));

await connectDB();

app.get("/", (req, res) => res.send("API running"));
app.use("/api", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
