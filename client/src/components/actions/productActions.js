import axios from 'axios';
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    PRODUCTS_ERROR,
    SET_LOADING
} from '../actions/types';


// Get all products
export const getProducts = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get("/api/products");

        dispatch({
            type:GET_PRODUCTS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:PRODUCTS_ERROR,
            payload:err.response
        });
    }
}
// Get a product
export const getProductDe = id => async dispatch => {
    try {
        setLoading();
        const res = await axios.get(`/api/products/${id}`);

        dispatch({
            type:GET_PRODUCT,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:PRODUCTS_ERROR,
            payload:err.response
        });
    }
}

// Update product
export const updateProduct = (data,id) => async dispatch => {

    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
           }
        }
        setLoading();
        const res = await axios.put(`/api/products/${id}`, data, config);
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:err.response
        });
    }

}


// Remove product
export const removeProduct = id => async dispatch => {
    try {
       axios.delete(`/api/products/${id}`);
       dispatch({
        type:REMOVE_PRODUCT,
        payload:id
     });  
    } catch (err) {
       dispatch({
           type:PRODUCTS_ERROR,
           payload:err.respnose
    }); 
    }
    
};



export const setLoading = () => {
    return {
        type:SET_LOADING
    };
};