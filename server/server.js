// init express
const express = require('express');
const app = express();

// helper libraries
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// register middleware set up
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose set up
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise; // Legacy code for mongoose v4 
mongoose.connect(process.env.DATABASE);



// MODELS
const {User} = require('./models/user');
const {Brand} = require('./models/brand');
const {Wood} = require('./models/wood');
const {Product} = require('./models/product');
// Middlewares
const {auth} = require('./middleware/auth');
const {admin} = require('./middleware/admin');


//===========================
//         PROXY
//===========================

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
 
    next();
});

//===========================
//         PRODUCTS
//===========================

// By Arrival: articles?sortBy=createdAt&order=desc&limit=4
// By Sold: articles?sortBy=sold&order=desc&limit=4

app.get('/api/product/articles',(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product
        .find()
        .populate('brand').populate('wood')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec( (err,articles)=>{
            if(err) return res.status(400).send('could not GET articles',err);
            res.send(articles);
        })
})


// using body parser lib to grab url params.
// ie. /api/product/article?id=ABC,DEF,sdfsd@type=single
app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id; // define items here for when type is not array.

    if(type === "array"){
        // grab all the ids from the url params and store them in an items array.
        // items array will be converted for mongo using map method.
        let ids = req.query.id.split(',');
        // we need to redefine and reassign the items again, because this time the type is array.
        items = [];
        items = ids.map(item=> {
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.find({'_id':{$in:items}}).
            populate('brand').   // populate method allows as to bring in the other data objects. brand / wood.
            populate('wood').   //  ie. inside productSchema product.js file
            exec((err,docs)=>{
                return res.status(200).send(docs);
            })
})

app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);
    product.save( (err,doc)=>{
        if(err) return res.json({success:false,err,message:"not able to save server.js"});
        res.status(200).json({
            success:true,
            article:doc
        })
    })
})

//===========================
//          WOODS
//===========================

app.post('/api/product/wood',auth,admin,(req,res)=>{
    const wood = new Wood(req.body);
    wood.save( (err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            wood:doc
        })
    })
})

app.get('/api/product/woods',(req,res)=>{
    Wood.find({},(err,woods)=>{
        if(err) return res.status(400).send('insufficient rights');
        res.status(200).send(woods);
    })
})

//===========================
//          BRANDS
//===========================
// ADDING A BRAND
// should only be able to update brand if they are auth and admin. Chain middlewares.
app.post('/api/product/brand',auth,admin,(req,res)=>{
        const brand = new Brand(req.body); // create new instance of model Brand.
        // update or save
        brand.save( (err,doc)=>{
            if(err) return res.json({success:false,err});
            res.status(200).json({
                success:true,
                brand:doc
            })
        })
})
// GETTING ALL BRAND
app.get('/api/product/brands',(req,res)=>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
})


//===========================
//          USERS
//===========================

// grab all users
app.get('/api/users/grab_all_users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users);
    })
})

// auth route
app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false:true,
        isAuth: true,
        email: req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

// register route
app.post('/api/users/register',(req,res)=>{
   const user = new User(req.body);
   // update or save
   user.save( (err,doc)=>{
        if(err) return res.json({success:"false"})
        // status 200: http request from client was successfull.
        // res.json and res.send essentially do the same thing.
        res.json({
            success:true
        })
   })
})
// login route
app.post('/api/users/login',(req,res)=>{
    // find the email
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false, message: 'Auth failed, email not found!'})

        // check password
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess: false, message: "Password is not a match"});

                // generate a token
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('w_auth',user.token).status(200).json({
                        loginSuccess:true
                    })
                })
        })
        
    })
})

// logout route
app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log(`Waves App Listening on Port ${port}`));
