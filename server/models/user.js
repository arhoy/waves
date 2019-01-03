//------ USER MODEL ----------//
const mongoose = require('mongoose');

// require password encryption libs
const bcrypt = require('bcrypt');
const SALT_I = 10;
require('dotenv').config();

// require jwt lib
const jwt = require('jsonwebtoken');


// create schema
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique: 1
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    name:{
        type:String,
        required:true,
        minlength:1,
        maxlength: 100
    },
    lastname:{
        type:String,
        required:true,
        minlength:1,
        maxlength: 100
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
})

// encrypt the password ( before we save the document to our database.)
userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    }
    else{
        next();
    }
    
})

// compare password method
userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
}

// generate token method
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET) // user.id + password   #password is the server specified password, inside env file.
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

// statics and methods are the same thing.
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    jwt.verify(token,process.env.SECRET, function(err,decode){
        user.findOne({"_id":decode,"token":token}, function (err,user){
            if(err) return cb(err);
            cb(null,user); // run the callback with null as the error. user is the instance of the user model
        })
    })
}

// export schema
const User = mongoose.model('User',userSchema); // chosen db name, schema used.
module.exports = {User}