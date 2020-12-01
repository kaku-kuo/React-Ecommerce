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
    CLEAR_REVIEW_ERROR
} from '../components/actions/types';

const initialState = {
    products:null,
    productDe:null,
    reviewAdded:null,
    loading:false,
    error:null
};

export default(state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
          return {
            ...state,
            products:action.payload,
            loading:true  
        };
        case UPDATE_PRODUCT_SUCCESS:
        case GET_PRODUCT:
          return {
            ...state,
            productDe:action.payload,
            loading:true  
        };
        case REMOVE_PRODUCT:
           return {
            ...state,
            products:state.products.filter(product => product._id !== action.payload),
            loading:true
        };
        case ADD_REVIEW_SUCCESS:
          return {
            ...state,
            reviewAdded:action.payload,
            loading:true
        };
        case SET_LOADING:
          return {
            ...state,
            loading:true
        };
        case ADD_REVIEW_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case PRODUCTS_ERROR:
          return {
             ...state,
             error:action.payload 
        };
        case CLEAR_REVIEW_ERROR:
          return {
            ...state,
            reviewAdded:null,
            error:null           
        }; 
        default:
          return state;
    }
}