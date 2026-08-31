const mongoose = require("mongoose")
const {Schema} = mongoose

const schema = new Schema ({

uid: {type:String, required: true},
id: {type:String, required: true},
title: {type:String, required: true, trim:true },
description: {type:String, required: true, trim:true},
status: {type:Boolean, required: true,default:false },


},{
    timestamps:true,
})

const Todo = mongoose.model("Todos", schema)
module.exports = Todo


