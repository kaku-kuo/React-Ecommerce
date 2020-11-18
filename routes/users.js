const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require('express-validator');
const auth = require("../middleware/auth");

const User = require("../models/User");

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/', [
    check( "name", "Name is required" ).not().isEmpty(),
    check( "email", "Please include valid email").isEmail(),
    check( "password", "Please enter password with 6 or more characters").isLength({
        min:6
    })
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user){
          return res.status(400).json({ msg:"User already exists" });  
        }
    
        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash( password, salt );

        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign( payload, config.get("jwtSecret"), {
            expiresIn: 360000
        },(err,token) => {
            if(err) throw err;
            res.json({token});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// @route    PUT api/users
// @desc     Update a user
// @access   Private
router.put('/profile/:id',auth, async(req, res) => {
   const user = await User.findById(req.params.id);

   try {
     if(user){
     user.name = req.body.name || user.name
     user.email = req.body.email || user.email
     if(req.body.password){
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(req.body.password, salt);
      }  
     const updatedUser = await user.save();
   
     res.json({
         _id:updatedUser._id,
         name:updatedUser.name,
         email:updatedUser.email,
         isAdmin:updatedUser.isAdmin
     });
    } 
   } catch (err) {
     console.error(err.message);
     res.status(404).send("User not found");
   }

});

module.exports = router;