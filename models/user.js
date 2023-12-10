const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// mongoose hooks

// fire a function before a doc is saved in DB
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    console.log('user to be saved : ',this)
    next();
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;