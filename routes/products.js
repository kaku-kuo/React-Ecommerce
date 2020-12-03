const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


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


// @route    GET api/products
// @desc     List different products
// @access   Public
router.get('/:keyword', async(req, res) => {
let jordan = null;
let kobe = null;
let lbj = null;
let drose = null;
let under = 0;
let over = 0;
let size075 = null;
let size080 = null;
let size085 = null;
if(req.params.keyword.includes("jordan")){ jordan = "Jordan"}
if(req.params.keyword.includes("kobe")){ kobe = "Kobe"}
if(req.params.keyword.includes("lbj")){ lbj = "lbj"}
if(req.params.keyword.includes("drose")){ drose = "drose"}
if(req.params.keyword.includes("under")){ under = 5000}
if(req.params.keyword.includes("over")){ over = 5000}
if(req.params.keyword.includes("size075")){ size075 = 0}
if(req.params.keyword.includes("size080")){ size080 = 1}
if(req.params.keyword.includes("size085")){ size085 = 2}


    try {
      if(!over && !under){
        console.log("only brand")
        const Products = await Product.find({ brand:{ $eq: jordan || kobe || lbj || drose} }); 
        return res.json(Products);
      } 
      if(over || !size075 || size080 || size085){
        console.log("over + size075 080 085")
        const ProductsOver5000 = await Product.find(over ? { brand:{ $eq: jordan || kobe || lbj || drose}, price:{ $gte:over }}
          : { brand:{ $eq: jordan || kobe || lbj || drose}, price:{ $gte:over }, [`countInStock.${size075}`]:{ $gte:0 } }); 
        return res.json(ProductsOver5000);
      }          
      if(under){
        console.log("under")
        const ProductsUnder5000 = await Product.find({ brand:{ $eq: jordan || kobe || lbj || drose}, price:{ $lte:under } }); 
        return res.json(ProductsUnder5000);
      }          
      //  switch(req.params.keyword){
      //      case "jordansize075":
      //        const jordansize075Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.0":{ $gt:0 } }); 
      //        res.json(jordansize075Product);
      //        break; 
      //      case "jordansize080":
      //        const jordansize080Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.1":{ $gt:0 } }); 
      //        res.json(jordansize080Product);
      //        break; 
      //      case "jordansize085":
      //        const jordansize085Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.2":{ $gt:0 } }); 
      //        res.json(jordansize085Product);
      //        break; 
      //      case "jordansize090":
      //        const jordansize090Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.3":{ $gt:0 } }); 
      //        res.json(jordansize090Product);
      //        break; 
      //      case "jordansize095":
      //        const jordansize095Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.4":{ $gt:0 } }); 
      //        res.json(jordansize095Product);
      //        break; 
      //      case "jordansize100":
      //        const jordansize100Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.5":{ $gt:0 } }); 
      //        res.json(jordansize100Product);
      //        break; 
      //      case "jordansize105":
      //        const jordansize105Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.6":{ $gt:0 } }); 
      //        res.json(jordansize105Product);
      //        break; 
      //      case "jordansize110":
      //        const jordansize110Product = await Product.find({ brand:{ $eq: "Jordan" }, "countInStock.7":{ $gt:0 } }); 
      //        res.json(jordansize110Product);
      //        break; 
      //      case "jordan":
      //        const jordanProducts = await Product.find({ brand:{ $eq: "Jordan" } });
      //        res.json(jordanProducts);
      //        break;
      //      case "kobe":
      //        const kobeProducts = await Product.find({ brand:{ $eq: "Kobe" }});
      //        res.json(kobeProducts);
      //        break;
      //      case "lbj":
      //        const lbjProducts = await Product.find({ brand:{ $eq: "lbj" }});
      //        res.json(lbjProducts);
      //        break;
      //      case "drose":
      //        const droseProducts = await Product.find({ brand:{ $eq: "drose" } });
      //        res.json(droseProducts);
      //        break;        
      //      case "jordanunder5000":
      //        const jordanUnder5000 = await Product.find({ brand:{ $eq: "Jordan" }, price:{ $lte: 5000 }});
      //        res.json(jordanUnder5000);
      //        break; 
      //      case "jordanover5000":
      //        const jordanOver5000 = await Product.find({ brand:{ $eq: "Jordan" }, price:{ $gte: 5000 }});
      //        res.json(jordanOver5000);
      //        break;
      //      case "kobeunder5000":
      //        const kobeUnder5000 = await Product.find({ brand:{ $eq: "Kobe" }, price:{ $lte: 5000 }});
      //        res.json(kobeUnder5000);
      //        break;
      //      case "kobeover5000":
      //        const kobeOver5000 = await Product.find({ brand:{ $eq: "Kobe" }, price:{ $gte: 5000 }});
      //        res.json(kobeOver5000);
      //        break;
      //      case "lbjunder5000":
      //        const lbjUnder5000 = await Product.find({ brand:{ $eq: "lbj" }, price:{ $lte: 5000 }});
      //        res.json(lbjUnder5000);
      //        break;
      //      case "lbjover5000":
      //        const lbjOver5000 = await Product.find({ brand:{ $eq: "lbj" }, price:{ $gte: 5000 }});
      //        res.json(lbjOver5000);
      //        break;
      //      case "droseunder5000":
      //        const droseUnder5000 = await Product.find({ brand:{ $eq: "drose" }, price:{ $lte: 5000 }});
      //        res.json(droseUnder5000);
      //        break;
      //      case "droseover5000":
      //        const droseOver5000 = await Product.find({ brand:{ $eq: "drose" }, price:{ $gte: 5000 }});
      //        res.json(droseOver5000);
      //        break;                                    
      //      default:
      //       const products = await Product.find({});
      //       res.json(products);      
      //  };        
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