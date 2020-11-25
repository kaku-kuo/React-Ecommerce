import axios from 'axios';
import {
  CREATE_NEW_PRODUCT_SUCCESS,
  CREATE_NEW_PRODUCT_FAIL,
  CLEAN_NEW_CREATE_PRODUCT
} from '../actions/types'


// Add new product to DB
export const createNewProduct = data => async dispatch => {
       try {
        const config = {
            headers:{
                "Content-Type":"application/json"
           }
        };
         
        const res = await axios.post('/api/products', data, config);
         dispatch({
            type:CREATE_NEW_PRODUCT_SUCCESS,
            payload:res.data
         });
       } catch (err) {
         dispatch({
            type:CREATE_NEW_PRODUCT_FAIL,
            payload:err.response 
         });  
       };
};


export const cleanNewProduct = () => dispatch => {
   dispatch({
     type:CLEAN_NEW_CREATE_PRODUCT
   })
};