const mongoose = require("mongoose")

const bussinessSchema = mongoose.Schema({
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
    business_category : {
        type: Array,
        required : false
      },
    business_name : {
        type : String,
        required : false
    },
    business_address : {
        type : String,
        required : false
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
const BussinessCat = mongoose.model("bussinessCategory", bussinessSchema);
module.exports = BussinessCat