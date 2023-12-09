const {mongoose} = require('mongoose');
const userModel = require('../models/user');

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
        res.status(201).json(user);
    }
    catch(error){
         const errors = handleError(error)
         res.status(400).json(errors);
    }
}


module.exports.login_post = (req,res)=>{
    console.log(req.body);
    res.send('Log in');
}