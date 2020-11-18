import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItemFromCart,editItemFromCart } from '../actions/cartActions';



const CartItem = ({ cartItem, removeItemFromCart, editItemFromCart }) => {

const [editItemBtn, setEditItemBtn] = useState(false);
const [forEdit, setForEdit] = useState(cartItem);
const [num, setNum] = useState(0);
const [arr, setArr] = useState([]);


const handleRemoveCartItem = () => {
  removeItemFromCart(cartItem.identifier)
};


useEffect(() => {

if(num === 0 && arr.length === 0){
  switch(cartItem.size){
    case "07.5":
       setNum(cartItem.countInStock[0]);    
       break; 
    case "08.0":
       setNum(cartItem.countInStock[1]);
       break;   
    case "08.5":
       setNum(cartItem.countInStock[2]);
       break; 
    case "09.0":
       setNum(cartItem.countInStock[3]);
       break;   
    case "09.5":
       setNum(cartItem.countInStock[4]);
       break;   
    case "10.0":
       setNum(cartItem.countInStock[5]);
       break;   
    case "10.5":
       setNum(cartItem.countInStock[6]);
       break;   
    case "11.0":
       setNum(cartItem.countInStock[7]);
       break;   
    default:
       setNum("")        
 };
}
for(let i = 1; i <= num;i++){ 
    arr.push(i) 
}
setForEdit({...cartItem,size:forEdit.size});

// eslint-disable-next-line
}, [num,arr])


// Show update fields
const handleEditCartItem = () => {
     if(!editItemBtn){
       setEditItemBtn(true);
     }else{
       setEditItemBtn(false);      
     }  
};

// Actual update
const handleCartItemUpdate = () => {
    if(!editItemBtn){
      setEditItemBtn(true);
    }else{
      setEditItemBtn(false);   
      editItemFromCart(forEdit);   
    }
};

const handleSize = e => {
if(arr.length > 0){
  setArr([])
};
  switch(e.target.value){
    case "07.5":
       setNum(cartItem.countInStock[0]);    
       break; 
    case "08.0":
       setNum(cartItem.countInStock[1]);
       break;   
    case "08.5":
       setNum(cartItem.countInStock[2]);
       break; 
    case "09.0":
       setNum(cartItem.countInStock[3]);
       break;   
    case "09.5":
       setNum(cartItem.countInStock[4]);
       break;   
    case "10.0":
       setNum(cartItem.countInStock[5]);
       break;   
    case "10.5":
       setNum(cartItem.countInStock[6]);
       break;   
    case "11.0":
       setNum(cartItem.countInStock[7]);
       break;   
    default:
       setNum("")        
 };
 setForEdit({...forEdit,[e.target.name]:e.target.value});
};

const handleQty = e => {
 setForEdit({...forEdit,[e.target.name]:Number(e.target.value)});
};

    return (
        <div className="cart-item">
          <div className="item-img-card">
            <img className="item-img" src={cartItem.image} alt="item-img"/>
          </div>
          <div className="item-details-card">

           <div className="item-details">
            <div className="cart-item-name">{cartItem.name}</div>
           <div>
            <div className="cart-item-size">SIZE:</div>
            {editItemBtn ? 
              <select name="size" onChange={handleSize} value={forEdit.size}>
               {cartItem.countInStock[0] !== 0 ? <option value="07.5">07.5</option>:null} 
               {cartItem.countInStock[1] !== 0 ? <option value="08.0">08.0</option>:null} 
               {cartItem.countInStock[2] !== 0 ? <option value="08.5">08.5</option>:null} 
               {cartItem.countInStock[3] !== 0 ? <option value="09.0">09.0</option>:null} 
               {cartItem.countInStock[4] !== 0 ? <option value="09.5">09.5</option>:null} 
               {cartItem.countInStock[5] !== 0 ? <option value="10.0">10.0</option>:null} 
               {cartItem.countInStock[6] !== 0 ? <option value="10.5">10.5</option>:null} 
               {cartItem.countInStock[7] !== 0 ? <option value="11.0">11.0</option>:null} 
              </select>
              :
              <span>{cartItem.size}</span>
              }    
           </div>
            <div>
            <div className="cart-item-size">QTY:</div>
            {editItemBtn ?
             <select name="qty" onChange={handleQty} value={forEdit.qty}>
              {num > 0  && arr.map(x => <option value={x} key={x}>{x}</option>)} 
             </select>
             :
            <span>{cartItem.qty}</span>   
            }                               
            </div>   
            <div>
            <div className="cart-item-size">PRICE:</div>
             <span>${(cartItem.price*cartItem.qty).toLocaleString()}</span>            
            </div>   
           </div>

          
            <div>
             <ul className="item-remove-edit">
              <li onClick={handleRemoveCartItem} className="cartitem-btn">Remove</li>   
              {editItemBtn ? 
               <li onClick={handleCartItemUpdate} className="cartitem-btn">Update</li>
               :       
              <li onClick={handleEditCartItem} className="cartitem-btn">Edit</li>   
              }   
             </ul>  
            </div>
          </div>           
        </div>
        
    )
}

CartItem.propTypes = {
   cartItem:PropTypes.object.isRequired,
   removeItemFromCart:PropTypes.func.isRequired,
   editItemFromCart:PropTypes.func.isRequired
}


export default connect(null,{ removeItemFromCart, editItemFromCart })(CartItem);