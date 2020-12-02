import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ProductFilter from './ProductFilter';
import Preloader from '../layout/Preloader';
import ProductItem from '../productPages/ProductItem';
import PropTypes from 'prop-types';
import { getProducts } from '../actions/productActions';

const ProductList = ({ product:{ products }, match, history, getProducts }) => {
const [filterValue, setFilterValue]  = useState("");

// Callback for receive value from child component(ProductFilter)
const valueFromFilter = (value) => {
   setFilterValue(value);
};   

useEffect(() => { 
  if(filterValue){ 
    getProducts(match.params.brand+filterValue);
    history.push(`/productlist/${match.params.brand}?filter=${filterValue}`);
    console.log(filterValue)
  }else{
    getProducts(match.params.brand);
    history.push(`/productlist/${match.params.brand}`);
    console.log(filterValue)
  };
  //eslint-disable-next-line      
},[match.params.brand, filterValue]);

    return (
          products ?
          <div className="container-fluid">
            <h3>Product Filter</h3>
            <div className="row">
              <ProductFilter getPorducts={getProducts} valueFromFilter={valueFromFilter}/>
             <div className="col-sm">
              <div className="row"> 
               {products.length !== 0 ?
               products.map(product => <ProductItem product={product} key={product._id}/>)
               :
              <div className="col text-center">
                <h2>No Products</h2>    
              </div>}
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