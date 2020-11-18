import React,{ useEffect,useState } from 'react';
import OrderItem from '../checkout/OrderItem';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import { cleanCartItems } from '../actions/cartActions';
import { getOrderDe, updateOrder } from '../actions/orderActions';
import { getProducts, updateStock } from '../actions/productActions';



const Order = ({ orderDe, loading , success , userDe ,product, cleanCartItems, getOrderDe, updateOrder, updateStock,getProducts , match }) => {
const paid = { isPaid:true };
const delevered = { isDelivered:true };
const [deliverDay, setDeliverDay] = useState("");
const [data, setData] = useState(null);
const [forProduct, setForProduct] = useState(null);



useEffect(() => {
// Array for collect stocks and id for update
const arr = [] 

if(success){
  cleanCartItems();   
};  
  
getOrderDe(match.params.id);
getProducts();

//Set up fake deliver day
if(orderDe){
    orderDe.isPaid && setTimeout(() => {
    updateOrder(match.params.id,delevered);
   },3000) 

   const date = new Date(orderDe.updatedAt);
   const dateToAdd = 3;
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate(); 
   setDeliverDay(`${year}-${month}-${day + dateToAdd}`);
};
   
// Update stocks
if(orderDe && product){
    orderDe.orderItems.forEach(item => 
    {
      switch(item.size){
      case "07.5":
        const forIndex0 = item.countInStock[0]-item.qty;
        item.countInStock[0] = forIndex0;
        arr.push(item);
        setData(arr);
        break;    
      case "08.0":
        const forIndex1 = item.countInStock[1]-item.qty;
        item.countInStock[1] = forIndex1
        arr.push(item);
        setData(arr);
        break;    
      case "08.5":
        arr.push({index:item.countInStock.indexOf(item.countInStock[2]), qtyForMinus:item.qty})  
        setForProduct(arr) 
        // const forIndex2 = item.countInStock[2]-item.qty;
        // item.countInStock[2] = forIndex2;
        // arr.push(item);
        // setData(arr);       
        break;   
      case "09.0":
        const forIndex3 = item.countInStock[3]-item.qty;
        item.countInStock[3] = forIndex3
        arr.push(item);
        setData(arr);
        break;  
      case "09.5":
        arr.push({index:item.countInStock.indexOf(item.countInStock[4]), qtyForMinus:item.qty}) 
        // const forIndex4 = item.countInStock[4]-item.qty;
        // item.countInStock[4] = forIndex4;
        // arr.push(item);
        // setData(arr);
        break;
      case "10.0":
        arr.push({index:item.countInStock.indexOf(item.countInStock[5]), qtyForMinus:item.qty}) 
        // const forIndex5 = item.countInStock[5]-item.qty;
        // item.countInStock[5] = forIndex5;
        // arr.push(item);
        // setData(arr);
        break;
      case "10.5":
        const forIndex6 = item.countInStock[6]-item.qty;
        item.countInStock[6] = forIndex6;
        arr.push(item);
        setData(arr);
        break;
      case "11.0":
        const forIndex7 = item.countInStock[7]-item.qty;
        item.countInStock[7] = forIndex7;
        arr.push(item);
        setData(arr);
        break;       
      default:
        console.log(item);
    };
  });
  

  let num = 0; 
  product.products && product.products.forEach(i => {
   
  //  console.log(i.countInStock[(arr[num++].index)]-(orderDe.orderItems[num++].qty))
  console.log(i.countInStock)
  });
 


};


// eslint-disable-next-line  
},[loading]);



const handleSubmit = (e) => { 
    e.preventDefault();
    updateOrder(match.params.id,{isPaid:true,orderItems:data});
    // Update stocks in DB
    data.forEach(item => updateStock({countInStock:item.countInStock},item.product));  
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
           <div className="alert alert-warning" role="alert">Order Processing</div>   
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
          <div className="price-list">
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


const mapStateToProps = state => ({
   orderDe:state.order.orderDe,
   success:state.order.success,
   loading:state.order.loading,
   userDe:state.user.userDe,
   product:state.product
});


export default connect( mapStateToProps , { cleanCartItems, getOrderDe, updateOrder, updateStock, getProducts })(Order);