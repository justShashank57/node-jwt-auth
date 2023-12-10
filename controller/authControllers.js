const {mongoose} = require('mongoose');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

// error handler function
const handleError = (err)=>{
    //   console.log(err.message, err.code);
      let errors = {email:'',password:''};

    //   duplicate mail error
    if(err.code === 11000){
        errors.email = 'This email is already registered.';
        return errors;
    }
      
    //   validating errors
      if(err.message.includes('user validation failed')){
          Object.values(err.errors).forEach(({properties})=>{
                errors[properties.path] = properties.message;
          })
      }
      return errors;
}
//payload secret options
const maxAge = 3*24*60*60;
const createTokens = (id)=>{
      return jwt.sign({id},'shashank secret',{
             expiresIn:maxAge
      })
}

module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}

module.exports.signup_post =async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await userModel.create({email,password});
        const token = createTokens(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({user:user._id});
    }
    catch(error){
         const errors = handleError(error)
        //  console.log(errors);
         res.status(400).json(errors);
    }
}


module.exports.login_post = (req,res)=>{
    console.log(req.body);
    res.send('Log in');
}