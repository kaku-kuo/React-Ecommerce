import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { cleanNewProduct } from '../actions/adminActions';
import Preloader from '../layout/Preloader';
import AdminPageProductItems from './AdminPageProductItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminPage = ({ products,newProduct , getProducts, cleanNewProduct }) => {

useEffect(() => {
getProducts();
if(newProduct){
 cleanNewProduct();  
};
// eslint-disable-next-line 
},[]);
    return (
        products ?
        <div className="container">
         <div className="order-list">
            <div className="d-flex justify-content-between my-4"> 
             <h3 className="font-weight-bold">ALL PRODUCTS</h3>
             <Link to={`/admin/createproduct`}>
              <button className="btn btn-warning">
               <FontAwesomeIcon icon={['fas', 'plus']}/>
               CREATE PRODUCT
              </button>
             </Link>
            </div> 
             <table className="table table-bordered table-striped">
              <thead>
               <tr>
                <th scope="col" className="id">ID</th>
                <th scope="col" className="name">NAME</th>
                <th scope="col" className="price">PRICE</th>
                <th scope="col" className="brand">BRAND</th>
                <th scope="col" className="last"/>
               </tr>
              </thead>
              <tbody>
               {products.map(product => <AdminPageProductItems productItem={product} key={product._id}/>)}
              </tbody>
             </table>
         </div>   
        </div>
        :
        <Preloader/>
    )
}

AdminPage.propTypes = {
   products:PropTypes.array,
   newProduct:PropTypes.object,
   getProducts:PropTypes.func.isRequired,
   cleanNewProduct:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   products:state.product.products,
   newProduct:state.admin.newProduct
});

export default connect(mapStateToProps, { getProducts, cleanNewProduct })(AdminPage);