const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const logRoutes = require("./routes/logRoutes");

dotenv.config();
connectDB();

const app = express();

// CORS middleware — only ONE TIME
app.use(
  cors({
    origin: "http://localhost:5173",   // Vite frontend
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

// Auth Route Example
app.post("/api/auth/login", async (req, res) => {
  return res.json({
    success: true,
    token: "jwt-token-yaha-aayega",
    user: { name: "Aman", email: req.body.email },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
