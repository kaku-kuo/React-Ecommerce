const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


const User = require("../models/User");
const Product = require("../models/Product");

// @route    GET api/products
// @desc     List all products
// @access   Public
router.get('/', async(req, res) => {

    try {
       const products = await Product.find({});
       res.json(products);
    } catch (err) {
       console.error(err.message);
       res.status(500).send("Server error"); 
    }
    
});


// @route    POST api/products
// @desc     Add a new product
// @access   Private
router.post('/', auth, async(req, res) => {

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
    } = req.body
    
    try {
        const newProduct = new Product({
            name,
            price,
            brand,
            category,
            image,
            description,
            countInStock,
            rating,
            numReviews
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

module.exports = router;