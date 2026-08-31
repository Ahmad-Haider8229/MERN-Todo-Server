const express = require("express")
const cors = require("cors")

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


app.get("/",(req,res) => {

res.send("Server ")
})

app.listen(8000,  (req,res) => {

console.log("Server is running ")

})

