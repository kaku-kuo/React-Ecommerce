import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopProducts } from '../actions/productActions';
import Preloader from './Preloader';

const TopSneakers = ({ product:{ topProducts }, getTopProducts }) => {
useEffect(() => {
getTopProducts();    
//eslint-disable-next-line
},[]);

    return (
        topProducts ?
        <div className="newarrivals container-fluid">
          <div className="newitems row justify-content-between">
           {topProducts.map(product => (
             <div className="newitem col-md-2 col-sm-4 col-4 mb-md-0 mb-sm-3 mb-3" key={product._id}> 
              <Link className="w-100 text-decoration-none text-dark" to={`/productlist/${product.brand}/${product._id}`}>
              <div className="h-50">
               <img className="w-100" src={product.image} alt="..."/>
              </div>  
              <div className="mt-lg-4 mt-sm-3">{product.name}</div>
             </Link> 
            </div>     
           ))}   
        </div>
       </div>
       :
       <Preloader/> 
    )
}

TopSneakers.propTypes = {
    product:PropTypes.object,
    getTopProducts:PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    product:state.product
});

export default connect(mapStateToProps, { getTopProducts })(TopSneakers);