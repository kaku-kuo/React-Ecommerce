import React from 'react';

const Products = () => {
    return (
        <div className="products">
         <div className="product card">
           <img className="productimg" src="https://via.placeholder.com/800x600" alt="productimg"/>  
           <span className="productmame">
             <div className="primaryname">AIR JORDAN 1 Retro</div>
             <span className="secondname">Black/White</span>
           </span>
           <span className="productprice">$4500</span>
         </div> 
        </div>
    )
}

export default Products;