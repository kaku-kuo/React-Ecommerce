import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import ProductFilter from './ProductFilter';
import Preloader from '../layout/Preloader';
import ProductItem from '../productPages/ProductItem';
import PropTypes from 'prop-types';
import { getProducts } from '../actions/productActions';

const ProductList = ({ product:{ products,loading}, getProducts }) => {
  useEffect(() => {
     getProducts();
     //eslint-disable-next-line      
  },[])


  if(loading === true || products === null){
       return <Preloader/>
  }

    return (
        <div className="wholesection">  
          <h5>Refine Results</h5>
          <div className="filterandproduct">
            <div className="filterbox">
              <ProductFilter/>
            </div>
            <div className="productbox">
              {!loading && products.length === 0 ? (
                <p>No products to show</p>
              ) : (
                products.map(product => <ProductItem product={product} key={product._id}/>)
              )}
            </div> 
          </div>        
        </div>
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