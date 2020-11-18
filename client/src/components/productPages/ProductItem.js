import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductItem = ({product}) => {
    return (
        <div>
        <Link to={`/productlist/${product._id}`}>
         <div className="card">
          <img className="productimg" src={product.image} alt="productimg"/>  
          <div className="productmame">
            {product.name}
          </div>
          <div className="reviewgroup">
           <div className="stars">   
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>
            <span className="reviewscore">5.0</span> 
           </div>                                
          </div>  
            <span className="productprice">${product.price}</span>
         </div> 
        </Link>
        </div>
      
    )
}


export default ProductItem;