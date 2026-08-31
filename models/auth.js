const mongoose = require("mongoose")
const {Schema} = mongoose

const schema = new Schema ({

uid: {type:String, required: true, unique:true},
fullname: {type:String, required: true, trim:true },
email: {type:String, required: true, unique:true,trim:true},
password: {type:String, required: true,trim:true },


},{
    timestamps:true,
})

const Users = mongoose.model("Users", schema)
module.exports = Users


