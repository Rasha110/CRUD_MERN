const express=require("express")

const cors=require("cors")
const UserModel=require("./models/Users")

const app=express()

app.use(cors())
app.use(express.json());//this is for whenever we pass data from frontend
//  to backend it will force data in json format
require('dotenv').config();
const mongoose = require('mongoose');

// Use the URL from the .env file
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.get("/",(req,res)=>{
    UserModel.find({}).then(users=>res.json(users)).catch(err=>res.json(err));
})

app.get("/getUser/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id}).then(users=>res.json(users)).catch(err=>res.json(err));
})
app.put("/updateUser/:id",(req,res)=>{
     const id=req.params.id;
      UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age}).then(users=>res.json(users)).catch(err=>res.json(err));
})
app.post("/createUser",(req,res)=>{
UserModel.create(req.body).then(users=>res.json(users)).catch(err=>res.json(err))
})
app.delete("/deleteUser/:id",(req,res)=>{
     const id=req.params.id;
     UserModel.findByIdAndDelete({_id:id})
     .then(res=>res.json(res)).catch(err=>res.json(err))
})
app.listen(3001,()=> console.log("server is running"))