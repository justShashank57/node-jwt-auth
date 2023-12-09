const mongoose = require('mongoose');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter an email.'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email.']
    },
    password:{
        type:String,
        required:[true,'Please enter Password.'],
        minlength:[6,'Minimum Password length is 6 characters.']
    }
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;