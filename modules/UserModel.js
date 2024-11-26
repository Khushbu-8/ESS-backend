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
        
      },
    businessName : {
        type : String,
      
    },
    businessAddress : {
        type : String,
       
    },
    send_request :{
        type : String,
        default:null
    },
    received_request:{
        type : String,
        default:null
    }
})
const user = mongoose.model("user", userSchema);
module.exports = user