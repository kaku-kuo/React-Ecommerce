import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ProductFilter from './ProductFilter';
import Preloader from '../layout/Preloader';
import ProductItem from '../productPages/ProductItem';
import PropTypes from 'prop-types';
import { getProducts } from '../actions/productActions';
import Paginate from '../layout/Paginate';


const ProductList = ({ product:{ products, pages, page }, match, history, getProducts }) => {
const [filterValue, setFilterValue]  = useState("");
const pageNumber = match.params.pageNumber || 1;

// Callback for receive value from child component(ProductFilter)
const valueFromFilter = (value1, value2) => {
        // Add condition or remove condition by tick off
      if(value2){
        // Only show either under5000 or over5000 in URL
        if(filterValue.includes("under5000") && value1 === "over5000"){
          setFilterValue(pre => pre.replace("under5000", ""));
        };
        if(filterValue.includes("over5000") && value1 === "under5000"){
          setFilterValue(pre => pre.replace("over5000", ""));
        };
          setFilterValue(pre => pre + value1);
      }else{
          setFilterValue(pre => pre.replace(value1, ""));
      };    
};   

useEffect(() => { 
  if(filterValue){ 
    getProducts(match.params.brand + filterValue, pageNumber);
    history.push(`/productlist/${match.params.brand}/${filterValue}/page/${pageNumber}`);  
  }else{
    getProducts(match.params.brand, pageNumber);
    history.push(`/productlist/${match.params.brand}/page/${pageNumber}`);
  };
  //eslint-disable-next-line      
}, [match.params.brand, filterValue, pageNumber]);

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
           <Paginate brand={match.params.brand} 
           keyword={match.params.keyword ? match.params.keyword:""} 
           pages={pages} page={page}/>
          </div>
          :
          <Preloader/> 
    )
}


ProductList.propTypes = {
  product:PropTypes.object.isRequired,
  getProducts:PropTypes.func.isRequired
};


const mapStateToProps = state => ({
   product:state.product
});

export default connect(mapStateToProps, { getProducts })(ProductList);