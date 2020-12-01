import React from 'react';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';

const ProductItem = ({ product }) => {


    return (  
    
         <div className="col-sm-3 mb-4">
          <div className="each-product">
          <Link to={`/productlist/${product._id}`} style={{color:"black",textDecoration:"none"}}>
           <img className="productimg" src={product.image} alt="productimg"/>  
            <div className="card-content" style={{padding:"15px"}}>
            <div className="productmame">
             {product.name}
            </div>      
            <div className="stars">   
             <ProductRating rating={product.rating}/>
             <span className="reviewscore">{product.rating === 0 ? 0 : product.rating}</span>                               
            </div>  
            <span className="productprice">
             ${product.price}
            </span>
           </div>
          </Link>  
         </div> 
         </div> 
     
    )
}


export default ProductItem;