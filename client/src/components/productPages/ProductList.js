import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import ProductFilter from './ProductFilter';
import Preloader from '../layout/Preloader';
import ProductItem from '../productPages/ProductItem';
import PropTypes from 'prop-types';
import { getProducts } from '../actions/productActions';

const ProductList = ({ product:{ products }, getProducts }) => {
  useEffect(() => {
     getProducts();
     //eslint-disable-next-line      
  },[]);

    return (
          products ?
          <div className="container-fluid">
            <div className="row">
              <ProductFilter/>
             <div className="col-sm">
              <div className="row"> 
               {products.map(product => <ProductItem product={product} key={product._id}/>)}
              </div> 
             </div>
           </div>
          </div>
          :
          <Preloader/> 
    )
}


ProductList.propTypes = {
  product:PropTypes.object.isRequired,
  getProducts:PropTypes.func.isRequired
}


const mapStateToProps = state => ({
   product:state.product
})

export default connect(mapStateToProps,{ getProducts })(ProductList);