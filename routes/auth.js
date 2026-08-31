const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/auth")
const verify = require("../middlewares/auth")

const router = express.Router()



router.post("/register", async (req, res) => {
    try {


        const { fullname, email, password } = req.body
        const user = await Users.findOne({ email })
        if (user) {
            return res.status(401).json({ message: "Email already in use", isError: true })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const uid = Math.random().toString()
        const newUserData = { uid, fullname, email, password: hashedpassword }
        const newUser = new Users(newUserData)
        await newUser.save()
        const token = jwt.sign( {uid} , "ahmad", { expiresIn: "1d" })
         
        res.status(201).json({ message: "created", user: newUser, token })
       
        
    }
    catch (error) {

        console.error(error)

    }
})






router.post("/login", async (req, res) => {

    const { email, password } = req.body
    const user = await Users.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: "Email already in use", isError: true })
    }

    const match = await bcrypt.compare(password, user.password)
    if (match) {
        const { uid } = user
        const token = jwt.sign({ uid }, "ahmad", { expiresIn: "7d" })
        res.status(200).json({ message: "login", token, user })

    }
    else {
        res.status(401).json({ message: "invalied credentials", isError: true })
    }

})








router.get("/user", verify, async (req, res) => {

    try {
        const { uid } = req
        const user = await Users.findOne({ uid }).select("-password").exec()
        if (!user) {
            return res.status(401).json({ message: "Email already in use", isError: true, user })
        } else {

            res.status(200).json({ message: "User found", user })
        }
    } catch (error) {

        console.error(error)

    }

})

module.exports = router 