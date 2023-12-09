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

// mongoose hooks

// fire a function after saving doc to DB
userSchema.post('save',function(doc,next){
    console.log('User saved to DB : ',doc)
    // always call for next middleware in a middleware
    next();
})
// fire a function before a doc is saved in DB
userSchema.pre('save',function(next){
    console('user to be saved : ',this)
    next();
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;