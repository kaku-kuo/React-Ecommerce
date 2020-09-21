const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      price:{
          type:Number,
          required:true,
          default:0
      },
      brand:{
          type:String,
          required:true
      },
      category:{
          type:String,
          required:true
      },
      image:{
          type:String,
          required:true
      },
      description:{
          type:String,
          required:true
      },
      countInStock:{
          type:Number,
          required:true,
          default:0
      },
      rating:{
          type:Number,
          required:true,
          default:0
      },
      numReviews:{
          type:Number,
          required:true,
          default:0
      }
});

module.exports = mongoose.model("product", ProductSchema);