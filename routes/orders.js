const express = require("express");
const { Error } = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");


const Order = require("../models/Order");





// @route    POST api/orders
// @desc     Add a new order
// @access   Private
router.post('/',auth, async(req, res) => {

    const {
        orderItems,
        paymentMethod,
        shippingAddress,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        DeliveredAt
    } = req.body
    
   
    try { 
        if(orderItems && orderItems.length === 0){
            res.status(400);
            throw new Error("no order items");
            return
        }else{
            const newOrder = new Order({
            user:req.user.id,
            orderItems,
            paymentMethod,
            shippingAddress,
            shippingPrice,
            totalPrice,
            isPaid,
            paidAt,
            isDelivered,
            DeliveredAt
        });
            const order = await newOrder.save();
            res.status(201).json(order);
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error"); 
    }
});



// @route     GET api/orders
// @desc      Get all orders
// @access    Private 
router.get('/', auth, async(req,res) => {

    try {
        const orders = await Order.find({}).sort({date:-1});
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});




// @route     GET api/orders
// @desc      Get a order
// @access    Private 
router.get('/:id', async(req,res) => {

    try {
        const order = await Order.findById(req.params.id);
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});



// @route    PUT api/orders/:id
// @desc     Update order
// @access   Private
router.put('/:id', auth, async(req, res) => {
    const {   
       isPaid,
       isDelivered,
       orderItems
    } = req.body;

    const orderFields = {};
    if(isPaid) orderFields.isPaid = isPaid;
    if(isDelivered) orderFields.isDelivered = isDelivered;
    if(orderItems) orderFields.orderItems = orderItems;
    

    try {
        let order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({ msg:"Order not found" });

       order = await Order.findByIdAndUpdate(req.params.id,{$set:orderFields},{new:true});
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error"); 
    }
});



module.exports = router;