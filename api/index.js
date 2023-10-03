const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer=require("nodemailer");

const jwt = require("jsonwebtoken")

const app = express();
const port=8000;

const cors=require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




mongoose.connect("mongodb+srv://dineshdino:dino@cluster0.mhjroa1.mongodb.net/",{
    useNewUrlParser: true,
    
}).then(()=>{
    console.log("connnected to mongoDB")
}).catch((err)=>{
    console.log("error connecting to mongoDB",err);
});

app.listen(port,()=>{
    console.log("server is running on port 8000")
});

const User = require("./models/user")





//


const generateSecretKey = () =>{
    const secretkey = crypto.randomBytes(32).toString("hex");
    return secretkey;
}


const secretkey = generateSecretKey();








//endpoint of the application

app.post("/login",async(req,res)=>{
    try{
        console.log(req.body)
        const {UserName: username, Password: password }=req.body;
        console.log(username);
        console.log(password)
       //check user exist 
       const user = await User.findOne({username});
       console.log(user)
       if(!user){
        return res.status(401).json({message:'invalid doctor id or password !'});
       }

       //check user password
      if(user.password !== password){
        return res.status(402).json({Message:"ivalid password !"});
        
       }
       console.log(res)
      
        //generate a token
        const token = jwt.sign({userId:user._id},secretkey)
          res.status(200).json(token)
    }catch(error){
        console.log("error logging user",error);
        res.status(500).json({Message:"Login failed"})
    }
})
const axios = require('axios')

const test1Press = async () => {
  try
  {
    await axios.post('http://192.168.29.185:8000/login', {timeout: 2000})
    console.log("post call passed")
  }
  catch (err)
  {
    console.log("post call failed")
  }
}