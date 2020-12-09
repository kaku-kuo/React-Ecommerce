import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    EDIT_ITEM_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD, 
    CLEAN_CART_ITEMS
} from '../actions/types';


// Add item to cart
export const addToCart = (item, id) => async (dispatch, getState) =>{

    const { data } = await axios.get(`/api/products/details/${id}`); 
     const idForIdentifier = uuidv4();
     dispatch({
         type:ADD_TO_CART,
         payload:{
            identifier:idForIdentifier,
            product:data._id,
            name:data.name,
            price:data.price,
            image:data.image,
            qty:item.quantity === 0 ? 1 : item.quantity,
            size:item.size,
            countInStock:data.countInStock
         }
     });
     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};

// Edit item from cart
export const editItemFromCart = forEdit => (dispatch, getState) => {  

    dispatch({
        type:EDIT_ITEM_FROM_CART,
        payload:forEdit
    });
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};

// Remove item from cart
export const removeItemFromCart = identifier => (dispatch, getState) => {
   
     dispatch({
         type:REMOVE_ITEM_FROM_CART,
         payload:identifier
     });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping address
export const saveShippingAddress = data => dispatch => {
   
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:data
    });
   localStorage.setItem("shippingAddress", JSON.stringify(data));

};

// Save payment method
export const savePaymentMethod = payment => dispatch => {

    dispatch({
        type:SAVE_PAYMENT_METHOD,
        payload:payment
    });
   localStorage.setItem("paymentMethod",JSON.stringify(payment));

};

// Clean Cart items
export const cleanCartItems = () => (dispatch,getState) => {

    dispatch({
        type:CLEAN_CART_ITEMS
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    
};