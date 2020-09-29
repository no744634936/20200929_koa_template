const router = require('koa-router')()
const userController =require("../controllers/UserController.js")

router.get("/api/signin",userController.signin)
router.post("/api/signup",userController.singup)


module.exports=router