import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrderItem from '../checkout/OrderItem';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import { cleanCartItems } from '../actions/cartActions';
import { getOrderDe, updateOrder } from '../actions/orderActions';
import { getAllProducts, updateProduct } from '../actions/productActions';



const Order = ({ orderDe , success , userDe ,product, cleanCartItems, getOrderDe, updateOrder, updateProduct ,getAllProducts, match }) => {
const [deliverDay, setDeliverDay] = useState("");
const [data, setData] = useState([]);
const [arrIndex, setArrIndex] = useState([]);
let num = 0;

useEffect(() =>{
 if(success){
  cleanCartItems();   
 };  

 if(!orderDe || !product){
  getOrderDe(match.params.id);
  getAllProducts(); 
 };
  // eslint-disable-next-line  
},[])

// Set up fake delivery date
useEffect(() => {
if(!orderDe) return;
 if(orderDe.isDelivered){
  const date = new Date(orderDe.updatedAt);
  const dateToAdd = 3;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); 
  setDeliverDay(`${year}-${month}-${day + dateToAdd}`);   
 };
// eslint-disable-next-line
},[orderDe])


useEffect(() => {
if(!orderDe) return;
// Set up the index for update product stocks
    orderDe && orderDe.orderItems.forEach(item => 
    {
      switch(item.size){
      case "07.5":
        setArrIndex(preValue => [...preValue, 0]);  
        break;    
      case "08.0":
        setArrIndex(preValue => [...preValue, 1]);  
        break;    
      case "08.5":
        setArrIndex(preValue => [...preValue, 2]);  
        break;   
      case "09.0":
        setArrIndex(preValue => [...preValue, 3]);  
        break;  
      case "09.5": 
        setArrIndex(preValue => [...preValue, 4]);
        break;
      case "10.0":
        setArrIndex(preValue => [...preValue, 5]);
        break;
      case "10.5":
        setArrIndex(preValue => [...preValue, 6]);         
        break;
      case "11.0":
        setArrIndex(preValue => [...preValue, 7]);  
        break;       
      default:
        console.log(item);
    };
  });
// eslint-disable-next-line  
},[orderDe]);


useEffect(() => {
  if(!product) return; 
  // Looking fot specific stocks value by index, and set up for update
  product.products && orderDe && product.products.forEach(p => {
    if(orderDe.orderItems.length > num &&  p._id === orderDe.orderItems[num].product){
      p.countInStock[arrIndex[num]] = p.countInStock[arrIndex[num]] - orderDe.orderItems[num].qty;  
      num++
      setData(preValue => [...preValue, {countInStock:p.countInStock, id:p._id}]);    
     }   
  });
// eslint-disable-next-line  
},[arrIndex, product]);


const handleSubmit = (e) => { 
      e.preventDefault();     
      //  Update pay status
       updateOrder(match.params.id,{isPaid:true});
       // Actuall update stocks in DB
       data.forEach(item => updateProduct({countInStock:item.countInStock},item.id)); 
    
       // Set up fake delivery date 
       setTimeout(() => {
        updateOrder(match.params.id,{isDelivered:true});
       }, 3000);  
};    


    return (
       orderDe && userDe ?
      <div className="container">
       <h2 className="my-4" style={{letterSpacing:"2px"}}>{`ORDER ${orderDe._id.toUpperCase()}`}</h2>      
       <div className="container d-flex"> 
        
         <div className="shipping" style={{margin:"0 25px", width:"650px"}}>
            
          <h2 style={{letterSpacing:"2px"}}>SHIPPING</h2>
           <div className="shipping-details">{`Name: ${userDe.name}`}</div>
           <div className="shipping-details">{`Email: ${userDe.email}`}</div>
           <div className="shipping-details">{`Address: ${orderDe.shippingAddress.address} ${orderDe.shippingAddress.city} ${orderDe.shippingAddress.postalCode} ${orderDe.shippingAddress.country}`}</div>
           {orderDe.isDelivered ? 
            <div className="alert alert-success" role="alert">{`Delivery arrival at ${deliverDay}`}</div>
           :
           orderDe.isPaid ?
           <div className="alert alert-warning" role="alert">In Transit</div> 
           :
           <div className="alert alert-warning" role="alert">Order processing</div>   
           }
           <hr/>
          <div className="payment">
           <h2 style={{letterSpacing:"2px"}}>PAYMENT METHOD</h2>
           <div className="shipping-details">{`Method: ${orderDe.paymentMethod}`}</div>
           {orderDe.isPaid ? 
            <div className="alert alert-success" role="alert">{`Paid at ${orderDe.updatedAt.substring(0, 10)}`}</div>
           :
            <div className="alert alert-danger" role="alert">Not paid</div>   
           }
          </div>
           <hr/>
          <div className="order-items">
           <h2 style={{letterSpacing:"2px"}}>ORDER ITEMS</h2>

            <div className="list-group list-group-flush">
             <div className="list-group-item" style={{padding:"0 20px"}}>
              <div className="d-flex justify-content-between">   
               <div style={{width:"90px"}}/>  
               <div className="text-center col-4 py-4"/>
               <div className="text-center font-weight-bold col py-4">Size</div>
               <div className="text-center font-weight-bold col-1 py-4" style={{position:"relative", right:"8px"}}>Qty</div>
               <div className="text-center font-weight-bold col py-4">Price</div>
              </div>
             </div>
           </div>

           {orderDe.orderItems.map(item => <OrderItem cartItem={item} key={item._id}/>)}
          </div>  
         </div>

         <div className="price" style={{width:"350px"}}>
          <div className="price-list shadow p-3 mb-5 bg-white rounded">
           <h2 className="summary-title" style={{letterSpacing:"2px"}}>ORDER SUMMARY</h2>
           <div className="summary-details">
            <div>Items</div>   
            <div className="summary-right col-4 text-left">{orderDe.orderItems.length}</div>   
           </div>  
           <div className="summary-details">
            <div>Shipping</div>   
            <div className="summary-right col-4 text-left">${orderDe.shippingPrice.toLocaleString()}</div>   
           </div>  
           <div className="summary-details-bottom">
            <div>Total</div>   
            <div className="summary-right col-4 text-left">${orderDe.totalPrice.toLocaleString()}</div>   
           </div>  
          </div> 
          {orderDe.isPaid ? 
          null 
          :
          <form className="text-center my-3" onSubmit={handleSubmit}>
           <input className="btn btn-warning checkout-btn" type="submit" value="CONFIRM AND PAY"/> 
          </form>
          }
         </div>
          
       </div>
      </div> 
      :
      <Preloader/>
    )
}

Order.propTypes = {
  orderDe:PropTypes.object,
  success:PropTypes.bool,
  loading:PropTypes.bool,
  userDe:PropTypes.object,
  product:PropTypes.object,
  cleanCartItems:PropTypes.func.isRequired,
  getOrderDe:PropTypes.func.isRequired,
  updateOrder:PropTypes.func.isRequired,
  updateProduct:PropTypes.func.isRequired,
  getAllProducts:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   orderDe:state.order.orderDe,
   success:state.order.success,
   loading:state.order.loading,
   userDe:state.user.userDe,
   product:state.product
});


export default connect( mapStateToProps , { cleanCartItems, getOrderDe, updateOrder, updateProduct, getAllProducts })(Order);