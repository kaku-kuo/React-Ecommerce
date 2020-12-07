const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


const Product = require("../models/Product");


// @route    GET api/products
// @desc     List different products
// @access   Public
router.get('/', async(req, res) => {
const pageSize = 8;    
const page = Number(req.query.pageNumber) || 1;
let filterObj = { brand:"" };
let under = null;
let over = null;
let size075 = null;
let size080 = null;
let size085 = null;
let size090 = null;
let size095 = null;
let size100 = null;
let size105 = null;
let size110 = null;
if(req.query.keyword.includes("jordan")){ filterObj.brand = { $eq:"Jordan" }};
if(req.query.keyword.includes("kobe")){ filterObj.brand = { $eq:"Kobe" }};
if(req.query.keyword.includes("lbj")){  filterObj.brand = { $eq:"lbj" }};
if(req.query.keyword.includes("drose")){  filterObj.brand = { $eq:"drose" }};
if(req.query.keyword.includes("under")){ 
    under = { price:{ $lte:5000 } }
    filterObj = {
        ...filterObj,
        ...under
    };
};
if(req.query.keyword.includes("over")){
    over = { price:{ $gte:5000 } }
    filterObj = {
        ...filterObj,
        ...over
    };
};
if(req.query.keyword.includes("size075")){ 
    size075 = { "countInStock.0":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size075
    };
};
if(req.query.keyword.includes("size080")){ 
    size080 = { "countInStock.1":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size080
    };
};
if(req.query.keyword.includes("size085")){
    size085 = { "countInStock.2":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size085
    };
};
if(req.query.keyword.includes("size090")){
    size090 = { "countInStock.3":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size090
    };
};
if(req.query.keyword.includes("size095")){
    size095 = { "countInStock.4":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size095
    };
};
if(req.query.keyword.includes("size100")){
    size100 = { "countInStock.5":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size100
    };
};
if(req.query.keyword.includes("size105")){
    size105 = { "countInStock.6":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size105
    };
};
if(req.query.keyword.includes("size110")){
    size110 = { "countInStock.7":{ $gt:0 } }
    filterObj = {
        ...filterObj,
        ...size110
    };
};
    try {
        // Using Object Spread Operator to adding different fields to the object,
        // and then Destructure in to Product.dind().
       if(req.query.keyword === "admin"){
         const count = await Product.countDocuments({});   
         const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));
         return res.json({ products, page, pages: Math.ceil(count / pageSize) });
       }else{
         const count = await Product.countDocuments({ ...filterObj });  
         const products = await Product.find({ ...filterObj }).limit(pageSize).skip(pageSize * (page - 1)); 
         return res.json({ products, page, pages: Math.ceil(count / pageSize) });
       };  
    
    } catch (err) {
         console.error(err.message);
         res.status(500).send("Server error"); 
    }
});


// @route     GET api/products
// @desc      Get one product
// @access    Public 
router.get('/details/:id', async(req,res) => {

    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});



// @route     GET api/products
// @desc      Get top rated products
// @access    Public 
router.get('/top', async(req,res) => {
    try {
        const products = await Product.find({}).sort({ rating:-1 }).limit(6);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


// @route    POST api/products
// @desc     Add a new product
// @access   Private
router.post('/', auth, async(req, res) => {

    const {
        user,
        name,
        price,
        brand,
        image,
        description,
        countInStock
    } = req.body
    
    try {
        const newProduct = new Product({
            user,
            name,
            price,
            brand,
            image,
            description,
            countInStock,
        });
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error"); 
    }
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', auth, async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ msg:"Product not found" });

        await Product.findByIdAndRemove(req.params.id);
        res.json({ msg:"Product removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error"); 
    }
});

// @route    PUT api/products/:id
// @desc     Update product
// @access   Private
router.put('/:id', auth, async(req, res) => {
    const {   
        name,
        price,
        brand,
        category,
        image,
        description,
        countInStock,
        rating,
        numReviews
    } = req.body;

    const productFields = {};
    if(name) productFields.name = name;
    if(price) productFields.price = price;
    if(brand) productFields.brand = brand;
    if(category) productFields.category = category;
    if(image) productFields.image = image;
    if(description) productFields.description = description;
    if(countInStock) productFields.countInStock = countInStock;
    if(rating) productFields.rating = rating;
    if(numReviews) productFields.numReviews = numReviews;

    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ msg:"Product not found" });

        product = await Product.findByIdAndUpdate(req.params.id,{$set:productFields},{new:true});
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error"); 
    }
});


// @route    POST api/products/:id/reviews
// @desc     Add new review to product
// @access   Private
router.post('/:id/reviews',auth, async(req, res) => {
     const {
         comment,
         rating
     } = req.body;

     try {
         const product = await Product.findById(req.params.id);
         if(product){
            const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user.id.toString());
            if(alreadyReviewed){
                res.status(400);
                throw new Error('Product already reviewed');
            } 

            const review = {
                name:req.user.name,
                rating:Number(rating),
                comment,
                user:req.user.id
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            
            await product.save();
            res.status(201).json({ msg:"Review added"});
         }
     } catch (err) { 
        console.error(err.message);
        res.status(500).send(err.message); 
     }
});


module.exports = router;