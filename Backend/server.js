import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import problemRoutes from "./routes/problemRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://coding-journal-vv.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// ✅ OPTIONAL: handle preflight requests for all routes
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Coding Journal API is running.");
});

app.use("/api/users", userRoutes);
app.use("/api/problems", problemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
