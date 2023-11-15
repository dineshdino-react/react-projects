const mongoose = require("mongoose");
const Register = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    patientId:{
      type:String,
      required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    treatmentType:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    bloodGroup:{
        type:String,
        required:true,
    },
    weight:{    
        type:Number,
        required:true,
    },
    height:{
        type:Number,
        required:true,

    },
    doctorID: {
        type: String,
        required:true,
        ref: 'Doctor', // Reference to the doctor who added the patient
      },
    
})
const register = mongoose.model("register",Register);
module.exports = register;