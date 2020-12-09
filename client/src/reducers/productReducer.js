import {
    GET_PRODUCTS,
    GET_ALL_PRODUCTS,
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
} from '../components/actions/types';

const initialState = {
    products:null,
    productDe:null,
    topProducts:null,
    reviewAdded:null,
    pages:0,
    page:0,    
    loading:false,
    error:null
};

export default(state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS: 
          return {
            ...state,
            products:action.payload.products,
            pages:action.payload.pages,
            page:action.payload.page, 
            loading:true  
        };
        case GET_ALL_PRODUCTS:
          return {
            ...state,
            products:action.payload,
            laoding:true
        };
        case GET_TOP_PRODUCTS_SUCCESS:
          return {
            ...state,
            topProducts:action.payload,
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
        case GET_TOP_PRODUCTS_FAIL:
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
};