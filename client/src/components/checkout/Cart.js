import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  CartItem  from './CartItem';

const Cart = ({ cartItems }) => {
const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
// Add total price
const PriceArr = cartItems.map(item => item.price*item.qty);
const t = PriceArr.reduce((total, currVal) => { return total + currVal },0);
setTotalPrice(t.toLocaleString())

},[cartItems]);



    return (
      <div>

        <div className="container">   
         <h1 className="display-5">My Cart</h1>   
        </div>
       {cartItems.length === 0 ? <h1 className="text-center">Cart is empty</h1>
        : 
        <div className="cart-ordersummary-page">
         <div className="cart-item-list"> 
          {cartItems.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.identifier}/>)}        
         </div> 
          
          <div className="order-summary">

           <div>
            <h3 className="summary-title">Order Summary</h3> 
           </div>
           <div className="summary">
              <dt className="summary-list">SUBTOTAL:</dt>
              <dd className="value">${totalPrice}</dd>
              <dd>{`${cartItems.length} ${cartItems.length === 1 ? "item":"items"}`}</dd> 
           </div>
           <hr/>
           <div className="summary">
              <dt className="summary-list">ESTIMATED TOTAL:</dt>
              <dd className="value">${totalPrice}</dd> 
           </div>
           <hr/>
           <div>
           </div>
          <div className="checkout">
           <Link to="/shipping">        
            <button className="btn btn-warning checkout-btn">CHECKOUT</button>  
           </Link>
          </div>    
          </div>

        </div>
        }
      </div>
    )
}

Cart.propTypes = {
   cartItems:PropTypes.array
}


const mapStateToProps = state => ({
   cartItems:state.cart.cartItems
});


export default connect(mapStateToProps,{})(Cart);