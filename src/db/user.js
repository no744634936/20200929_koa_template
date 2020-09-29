const mongoose=require("./db.js")



let userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:30,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:30,
    },
    userName:{
        type:String,
        trim:true,
        unique:true,
        index:true,  //把username在数据库里做index
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    hash_password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"admin",
    },
    avatar:{
        type:String,
    },
    contactNumber:{type:String},
    profilePicture:{type:String},

},{timestamps:true}) //{ timestamps: true } will add the createdAt and updatedAt timestamps to the whole schema.`



//为什么要写这个，在哪里使用呢？还不知道，先留着
userSchema.methods={
    authenticated:(password)=>{
        return docrypto(password)===this.hash_password; //比较密码return true 或false
    }
}

//4,定义数据库模型，将数据库中的users表 与 userSchema 对应起来
//如果数据库里不存在google_users 就新建一个。
let Users=mongoose.model("users",userSchema);

module.exports=Users;