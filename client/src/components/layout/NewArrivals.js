import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopProducts } from '../actions/productActions';
import Preloader from '../layout/Preloader';

const NewArrivals = ({ product:{ topProducts }, getTopProducts }) => {
useEffect(() => {
getTopProducts();    
//eslint-disable-next-line
},[]);

    return (
        topProducts ?
        <div className="newarrivals container-fluid">
          <div className="newitems row justify-content-between">
           {topProducts.map(product => (
            <div className="newitem col-2" key={product._id}>
             <Link className="w-100 text-decoration-none text-dark" to={`/productlist/${product.brand}/${product._id}`}>
             <img className="w-100" src={product.image} alt="..."/>
             <div>{product.name}</div>
             </Link> 
           </div>  
           ))}   
        </div>
       </div>
       :
       <Preloader/> 
    )
}

NewArrivals.propTypes = {
    product:PropTypes.object,
    getTopProducts:PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    product:state.product
});

export default connect(mapStateToProps, { getTopProducts })(NewArrivals);