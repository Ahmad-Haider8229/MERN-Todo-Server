const express = require("express")
const cors = require("cors")
require('dotenv').config();
const app = express()
const {connectDB} = require("./config/db")
const authRoutes = require("./routes/auth");
const todos = require("./routes/todo")


app.use(express.json())
app.use(cors())
app.use("/auth", authRoutes);
app.use("/todo", todos);
app.use(express.urlencoded({ extended: true }));
connectDB()

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Server running on port:', PORT);
console.log('Environment:', process.env.NODE_ENV);

app.get("/",(req,res) => {

res.send("Server ")
})


