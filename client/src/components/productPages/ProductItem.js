import React from 'react';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';

const ProductItem = ({ product }) => {


    return (  
    
         <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <Link to={`/productlist/${product.brand.toLowerCase()}/${product._id}`} style={{color:"black",textDecoration:"none"}}>    
          <div className="each-product">

            <div style={{height:"50%"}}>
             <img className="productimg" src={product.image} alt="productimg"/> 
            </div>

            <div className="card-content">
             <div className="font-weight-bold mt-2">{product.name.toUpperCase()}</div>

             <div>
              <div className="stars">   
               <ProductRating rating={product.rating}/>
               <span className="reviewscore">{product.rating === 0 ? 0 : product.rating}</span>                               
              </div>  
              <div className="productprice">${product.price}</div>
             </div>
             
            </div>

           </div>
          </Link>   
         </div> 
     
    )
}


export default ProductItem;