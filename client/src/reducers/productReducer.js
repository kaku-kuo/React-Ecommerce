import {
    GET_PRODUCTS,
    GET_PRODUCT,
    STOCK_UPDATE,
    PRODUCTS_ERROR,
    SET_LOADING
} from '../components/actions/types';

const initialState = {
    products:null,
    productDe:null,
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
        case STOCK_UPDATE:
        case GET_PRODUCT:
          return {
            ...state,
            productDe:action.payload,
            loading:true  
        };
        case SET_LOADING:
          return {
            ...state,
            loading:true
        };
        case PRODUCTS_ERROR:
          return {
             ...state,
             error:action.payload 
        }; 
        default:
          return state;
    }
}