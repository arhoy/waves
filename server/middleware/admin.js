
let admin = (req,res,next)=>{
    if(req.user.role === 0){
        console.log('user not allowed, please check login');
        return res.json({isAdmin:false,message:"Insufficient rights"});
    }
    next(); // user is admin, move to the next line of code.
}


module.exports = {admin}