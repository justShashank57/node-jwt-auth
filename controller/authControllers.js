const {mongoose} = require('mongoose');
const userModel = require('../models/user');

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
         console.log(error);
         res.status(400).send('Error, user cannot be created!');
    }
}


module.exports.login_post = (req,res)=>{
    console.log(req.body);
    res.send('Log in');
}