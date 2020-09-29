const userModel =require("../models/userModel.js")
const { email_exist, register_failed_info } = require("../myTool/errInfo.js")
const{Success,Error}= require("../myTool/apiResultFormat.js")


class UserController{
    singup=async (ctx,next)=>{
        let {firstName,lastName,hash_password,email}=ctx.request.body;
        let find_result=await userModel.find_one_by_email(email)
        if(find_result){   //不要写成 if(find_result.length>0) js中object没有length属性
            ctx.body=new Error(email_exist)
            return
        }
        try {
            let newUser=await userModel.create_user(firstName,lastName,hash_password,email)
            ctx.body=new Success()
        } catch (error) {
            console.error(error.message,error.stack);
            ctx.body=new Error(register_failed_info)
            //应该要这样写，ctx.body=new Error(error.message) 将具体的错误信息传给前端。
        }
    }
    signin=async (ctx,next)=>{

    }
}

module.exports=new UserController();