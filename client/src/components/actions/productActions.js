import axios from 'axios';
import {
    GET_PRODUCTS,
    GET_PRODUCT,
    STOCK_UPDATE,
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

// Update stocks
export const updateStock = (stock,id) => async dispatch => {

    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
           }
        }
        setLoading();
        const res = await axios.put(`/api/products/${id}`, stock, config);
        dispatch({
            type:STOCK_UPDATE,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:PRODUCTS_ERROR,
            payload:err.response
        });
    }

}

export const setLoading = () => {
    return {
        type:SET_LOADING
    };
};