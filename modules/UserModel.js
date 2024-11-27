const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    role:{
        type : String,
        default:"User"
    },
    businessCategory : {
        type: Array,
        required : true
        
      },
    businessName : {
        type : String,
        required : true
      
    },
    businessAddress : {
        type : String,
        required : true
       
    }
})
const user = mongoose.model("user", userSchema);
module.exports = user