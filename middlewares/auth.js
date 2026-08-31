const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {

const authHeader = req.headers.authorization
const token = authHeader?.split(" ")[1]

if(!token){return res.status(401).json({message:"unauthorized"})}
jwt.verify(token, "ahmad", async (error, result) => {
if(!error){

   req.uid = result.uid 
   next()
}else{

    console.log(error)
    res.status(401).json({message:"unAuthorized"})
}

})
}

module.exports = verify