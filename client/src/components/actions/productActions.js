import axios from 'axios';
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
    PRODUCTS_ERROR,
    SET_LOADING,
    CLEAR_REVIEW_ERROR,
    GET_TOP_PRODUCTS_SUCCESS,
    GET_TOP_PRODUCTS_FAIL
} from '../actions/types';


// Get different products by brand, price...etc
export const getProducts = (keyword, pageNumber = "") => async dispatch => {
    try {     
        const res = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({
            type:GET_PRODUCTS,
            payload:res.data
        });
        setLoading();
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
        const res = await axios.get(`/api/products/details/${id}`);
        dispatch({
            type:GET_PRODUCT,
            payload:res.data
        });
        setLoading();
    } catch (err) {
        dispatch({
            type:PRODUCTS_ERROR,
            payload:err.response
        });
    }
}

// Get top rated products
export const getTopProducts = () => async dispatch => {
    try {
        const res = await axios.get("/api/products/top");
        dispatch({
            type:GET_TOP_PRODUCTS_SUCCESS,
            payload:res.data
        });
        setLoading();
    } catch (err) {
        dispatch({
            type:GET_TOP_PRODUCTS_FAIL,
            payload:err.response
        });
    }
};

// Update product
export const updateProduct = (data,id) => async dispatch => {
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
           }
        }    
        const res = await axios.put(`/api/products/${id}`, data, config);
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:res.data
        });
          setLoading();
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


export const addReview = (productId, formData) => async dispatch => {
     try {
        const config = {
            headers:{
                "Content-Type":"application/json"
           }
        };      
        const res = await axios.post(`/api/products/${productId}/reviews`, formData, config);
        dispatch({
            type:ADD_REVIEW_SUCCESS,
            payload:res.data.msg
        });
        setLoading();
     } catch (err) {
        dispatch({
            type:ADD_REVIEW_FAIL,
            payload:err.response.data
        }); 
     } 

};


export const clearErrorReview = () => dispatch => {
     dispatch({
         type:CLEAR_REVIEW_ERROR
     });
};

export const setLoading = () => {
    return {
        type:SET_LOADING
    };
};