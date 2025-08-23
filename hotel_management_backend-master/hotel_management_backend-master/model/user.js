const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema  =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type: String,
        required : true,
        max:255,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    role:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('users', userSchema);