import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckOutSteps from '../layout/CheckOutSteps';
import OrderItem from './OrderItem';
import { createNewOrder } from '../actions/orderActions';





const PlaceOrder = ({ cart:{ shippingAddress,cartItems },order:{ success, newOrder }, createNewOrder, history }) => {

const { address, city, postalCode, country } = shippingAddress;
const [subtotal, setSubtotal] = useState(0);
const [shipping, setShipping] = useState(0);
const [total, setTotal] = useState(0);
const [order, setOrder] = useState({
  orderItems:cartItems,
  paymentMethod:JSON.parse(localStorage.getItem("paymentMethod")),
  shippingAddress:shippingAddress,
  shippingPrice:shipping,
  totalPrice:total
});


useEffect(() => {
// Add all items price
const PriceArr = cartItems.map(item => item.price*item.qty);
const t = PriceArr.reduce((total, currVal) => { return total + currVal },0);
setSubtotal(t.toLocaleString());

// Set sjipping price
if(t > 5000){
  setShipping(200);
}else{
  setShipping(400);
}

setTotal((t + shipping).toLocaleString());

setOrder({...order, shippingPrice:shipping, totalPrice:(t + shipping) });

// Redirect to order page
if(success){
  history.push(`/order/${newOrder._id}`)
};

// eslint-disable-next-line
},[cartItems,subtotal,shipping,success]);

const SubmitOrder = e => {
  e.preventDefault();
  createNewOrder(order);
};

    return (
      <div>
        <div className="container">  
         <CheckOutSteps step1 step2 step3 step4/>    
        </div>

        <div className="cart-ordersummary-page">

          <div className="cart-item-list">

           <h2>SHIPPING</h2>
           <div className="my-3" style={{fontSize:"20px"}}>
             {`Address: ${address}, ${city}, ${postalCode}, ${country}`}
           </div>
           <hr/>
           <h2>PAYMENT METHOD</h2>
           <div className="my-3" style={{fontSize:"20px"}}>
             {`Method: ${JSON.parse(localStorage.getItem("paymentMethod"))}`}
           </div>
           <hr/>
           <h2>ORDER ITEMS</h2>  
         <div className="my-3 order-item-list">
      
         <div className="list-group list-group-flush">
         <div className="list-group-item">
          <div className="d-flex justify-content-between">
           <div style={{width:"90px"}}/>   
           <div className="text-center col-4"/>
           <div className="text-center font-weight-bold col">Size</div>
           <div className="text-center font-weight-bold col-1" style={{position:"relative",right:"5px"}}>Qty</div>
           <div className="text-center font-weight-bold col">Price</div>
          </div>
         </div>    
        </div>
          {cartItems.map(item => <OrderItem cartItem={item} key={item.identifier}/>)} 
         </div>        
        </div>

          <div className="order-summary">

           <div>
            <h3 className="summary-title">Order Summary</h3> 
           </div>
           <div className="summary">
              <dt className="summary-list">SUBTOTAL:</dt>
              <dd className="value">${subtotal}</dd>
              <dd>{`${cartItems.length} ${cartItems.length === 1 ? "item":"items"}`}</dd> 
           </div>
           <hr/>
           <div className="summary">
              <dt className="summary-list">Shipping:</dt>
              <dd className="value">${shipping}</dd>
              <dd>{`${address}, ${city}, ${postalCode}, ${country}`}</dd> 
           </div>
           <hr/>
           <div className="summary">
              <dt className="summary-list">ESTIMATED TOTAL:</dt>
              <dd className="value">${total}</dd> 
           </div>
           <hr/>
           <div>
           </div>
          <div className="checkout">     
          <form onSubmit={SubmitOrder}>   
            <button className="btn btn-warning checkout-btn" >PLACE ORDER</button>
          </form>         
          </div>    
          </div>

        </div>

      </div>
    )
}

PlaceOrder.propTypes = {
  cart:PropTypes.object,
  order:PropTypes.object,
  createNewOrder:PropTypes.func.isRequired
};



const mapStateToProps = state => ({
   cart:state.cart,
   order:state.order
});

export default connect(mapStateToProps, { createNewOrder } )(PlaceOrder);