const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth");
const todos = require("./routes/todo");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Server is running",
    status: "OK"
  });
});

app.use("/auth", authRoutes);
app.use("/todo", todos);

// Error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// ✅ Connect to database
connectDB();

// ============================================
// ✅ CRITICAL FIX: Export for Vercel
// ============================================
module.exports = app;

// ============================================
// Only listen locally, NOT on Vercel
// ============================================
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}