const mongoose = require('mongoose');
const express = require("express")
require('dotenv').config();
const dns = require("dns")
dns.setDefaultResultOrder('ipv4first');
dns.setServers(["1.1.1.1", "8.8.8.8"])
const app = express()
let isconnected = false
const connectDB = async () => {

await mongoose.connect("mongodb+srv://ahmadhaider4772_db_user:dFBKRZ6uepFobZpx@cluster0.zyguhhf.mongodb.net/?appName=Cluster0").then(()=>{

console.log("Connected")
isconnected = true
}).catch((error)=>{
console.log(error)
console.log("Not connected")
});


}


app.use((req,res,next) => {
    if(isconnected){
        connectDB()
    }
    next()
})

module.exports = {connectDB}