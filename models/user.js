const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;