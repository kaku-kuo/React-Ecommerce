import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AddProductModal = ({ cartItems }) => {
    return (
        <div className="modal fade" id="Cart-Item-Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Cart Items</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

             <div className="product-modal-body">
              <span>NAME</span>
              <div> 
               <span style={{margin:"40px"}}>QTY</span>
               <span>PRICE</span>
              </div> 
             </div>  
              {cartItems.length > 0 && cartItems.map(item => 
               <div className="product-modal-body" key={item.identifier}>
                <span>{item.name}</span>
                <div style={{width:"25%",display:"flex", justifyContent:"space-between"}}> 
                 <span >{item.qty}</span>
                 <span>${item.price*item.qty}</span>
                </div> 
               </div>  
              )}
            </div>
            <div className="modal-footer">
             <a href="/cart">   
              <button type="button" className="btn" style={{backgroundColor:"#ffc107",fontWeight:"bold"}}>View Cart</button>
             </a> 
            </div>
          </div>
        </div>
      </div>
    )
}

AddProductModal.propTypes ={
    cartItems:PropTypes.array.isRequired
};

const mapStateToProps = state => ({
   cartItems:state.cart.cartItems
});

export default connect(mapStateToProps, {})(AddProductModal);