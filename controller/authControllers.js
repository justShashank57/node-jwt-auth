module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}

module.exports.signup_post = (req,res)=>{
    res.send('Log in');
}


module.exports.login_post = (req,res)=>{
    res.send('sign up');
}