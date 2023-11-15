const mongoose = require("mongoose");
const Drug = new mongoose.Schema({
    drugname:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    },
    agegroup:{
        type:String,
        required:true,
    },
    dosage:{
        type:Number,
        required:true,
    },
    fataldosage:{
        type:Number,
        required:true,
    },
    
    
})
const Drugs = mongoose.model("drug",Drug);
module.exports = Drugs;