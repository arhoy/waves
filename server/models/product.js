//------ Product MODEL ----------//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:1,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        maxlength:10000
    },
    price:{
        type:Number,
        required:true,
        maxlength: 255
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    shipping:{
        required:true,
        type:Boolean
    },
    available:{
        required:true,
        type:Boolean
    },
    wood:{
        type: Schema.Types.ObjectId,
        ref:'Wood',
        required:true
    },
    frets:{
        type:Number,
        required:true
       
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    publish:{
        type:Boolean,
        required:true
    },
    images:{
        type:Array,
        default:[]
    }
},{timestamps:true});
// time stamp auto generated when entering new product.

const Product = mongoose.model('Product',productSchema);
module.exports = {Product};