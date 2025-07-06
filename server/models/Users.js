const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String, unique:true
    },
    age:Number
})
const UserModel=mongoose.model("users",UserSchema);  //write collection name set in DB
module.exports=UserModel;
