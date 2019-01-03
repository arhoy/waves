const {User} = require('./../models/user');


let auth = (req,res,next)=>{
    let token = req.cookies.w_auth; // name of our cookie.
    // create find by Token method.
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth:false,
            error:true
        });
        // attach the user and token to the req object. auth request will now have access to user object and token.
        req.token = token;
        req.user = user;
        next(); //call next to ensure process continues. This is due to the way the auth route is set up, ie. this is a middleware.
            // loop to the next line of code, which is the callback function inside auth route in server.js.
    })
}


module.exports = {auth};