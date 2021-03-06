const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
     },
    name:{type:String, required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true}
},{
    timestamps:true
})


const ProductSchema = mongoose.Schema({
      user:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"User"
      },
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
      image:{
          type:String,
          required:true
      },
      description:{
          type:String,
          required:true
      },
      countInStock:[
         {type:Number,default:0},
         {type:Number,default:0},
         {type:Number,default:0},
         {type:Number,default:0},
         {type:Number,default:0},
         {type:Number,default:0},
         {type:Number,default:0},
         {type:Number,default:0},
      ],
      reviews:[ReviewSchema],
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