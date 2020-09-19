const express = require("express");
const router = express.Router();

// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get('/', (req, res) => {
    res.send("Show all products")
});

// @route    POST api/products
// @desc     Add a new product
// @access   Private
router.post('/', (req, res) => {
    res.send("New product added");
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', (req, res) => {
    res.send("Product deleted");
});

// @route    PUT api/products/:id
// @desc     Update product
// @access   Private
router.put('/:id', (req, res) => {
    res.send("Update product");
});

module.exports = router;