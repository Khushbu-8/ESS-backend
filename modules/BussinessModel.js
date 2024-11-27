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
        required : true
      },
    business_name : {
        type : String,
        required : false
    },
    business_address : {
        type : String,
        required : false
    }
})
const BussinessCat = mongoose.model("bussinessCategory", bussinessSchema);
module.exports = BussinessCat