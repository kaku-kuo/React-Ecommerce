import axios from 'axios';
import {
  CREATE_NEW_ORDER_REQUEST,  
  CREATE_NEW_ORDER_SUCCESS,
  GET_ORDER,
  GET_ORDERS,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  STOCK_UPDATE,
  ORDER_ERROR,
  CREATE_NEW_ORDER_FAIL
} from './types';


// Create a new order
export const createNewOrder = (orderData) => async dispatch => {
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
  
    try {
        dispatch({ type:CREATE_NEW_ORDER_REQUEST });

        const res = await axios.post('api/orders', orderData, config);
        
        dispatch({
            type:CREATE_NEW_ORDER_SUCCESS,
            payload:res.data
        });
     
    } catch (err) {
        dispatch({
            type:CREATE_NEW_ORDER_FAIL,
            payload:err.response
        });
    }
}

// Get all orders
export const getOrders = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/orders/');

        dispatch({
            type:GET_ORDERS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:ORDER_ERROR,
            payload:err.response
        });
    }
}


// Get a order
export const getOrderDe = id => async dispatch => {
    try {
        
        const res = await axios.get(`/api/orders/${id}`);

        dispatch({
            type:GET_ORDER,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:ORDER_ERROR,
            payload:err.response
        });
    }
}


// Update order stocks, paid and delivery status
export const updateOrder = (id,data) => async dispatch => {
    try {
        
        const res = await axios.put(`/api/orders/${id}`, data);
  
        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:err.response
        });
    }
}

// Update stock
export const updateStock = (data,id) => async dispatch => {
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
        }
    }
        const res = await axios.put(`api/products/${id}`, data, config);
        dispatch({
            type:STOCK_UPDATE,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:ORDER_ERROR,
            payload:err.response
        });
    }
}