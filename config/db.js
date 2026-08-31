const mongoose = require('mongoose');
const dns = require("dns")
dns.setDefaultResultOrder('ipv4first');
dns.setServers(["1.1.1.1", "8.8.8.8"])
const connectDB = () => {

mongoose.connect('mongodb+srv://ahmadhaider4772_db_user:dFBKRZ6uepFobZpx@cluster0.zyguhhf.mongodb.net/?appName=Cluster0').then(()=>{

console.log("Connected")

}).catch((error)=>{
console.log(error)
console.log("Not connected")
});



}

module.exports = {connectDB}