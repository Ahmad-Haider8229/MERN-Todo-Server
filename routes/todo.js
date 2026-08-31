const express = require("express")
const Users = require("../models/auth")
const Todo = require("../models/todo")
const verify = require("../middlewares/auth")

const router = express.Router()

router.post("/create", verify, async (req, res) => {
    const { title, description, status } = req.body
    const { uid } = req
    const id = Math.random().toString()
    const  todoData = {uid,id,title,description,status}
    const newTodo = new Todo(todoData)
    await newTodo.save()

      res.status(201).json({ message: "Todo added", todo:newTodo ,  })
})


router.get("/fetch", verify, async (req, res) => {
    
    const { uid } = req
   
    const todos = await Todo.find({uid})

      res.status(200).json({ message: "Todos fetched", todo:todos   })
})



router.get("/single/:id", verify, async (req, res) => {
    
    const { uid } = req
   const {id} = req.params
    const todo = await Todo.findOne({uid, id})

      res.status(200).json({ message: "Todo fetched", todos:todo   })
})



router.patch("/update", verify, async (req, res) => {
    
    const { uid } = req
   
   const {title, description, id, } = req.body
   const updateTodo = {title, description,} 
    const todo = await Todo.findOneAndUpdate({uid, id},updateTodo,{new:true})

      res.status(200).json({ message: "Todo updated", todos:todo   })
})


router.patch("/updateStatus", verify, async (req, res) => {
    
    const { uid } = req
   
   const {status, id} = req.body
   const updateTodo = {status } 
    const todo = await Todo.findOneAndUpdate({uid, id},updateTodo,{new:true})

      res.status(200).json({ message: "Todo updated", todos:todo   })
})




router.delete("/delete/:id", verify, async (req, res) => {
    
    const { uid } = req
   
   const { id} = req.params
    
    const todo = await Todo.findOneAndDelete({uid, id})

      res.status(200).json({ message: "Todo deleted", todos:todo   })
})


module.exports = router 