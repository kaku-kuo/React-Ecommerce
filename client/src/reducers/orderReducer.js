import { 
CREATE_NEW_ORDER_REQUEST,
CREATE_NEW_ORDER_SUCCESS,
GET_ORDER,
GET_ORDERS,
UPDATE_ORDER_SUCCESS,
UPDATE_ORDER_FAIL,
ORDER_ERROR,
CREATE_NEW_ORDER_FAIL
} from '../components/actions/types';


const initialState = {
    orders:null,
    newOrder:null,
    orderDe:null,
    success:false,
    loading:false,
    error:null
};

export default(state = initialState, action) => {
    switch(action.type){
    case CREATE_NEW_ORDER_REQUEST:
        return {
           ...state,    
           loading:true 
    };    
    case CREATE_NEW_ORDER_SUCCESS:
        return {
           ...state,
           newOrder:action.payload,
           loading:false,
           success:true 
    };
    case GET_ORDERS:
        return {
           ...state,
           orders:action.payload,
           loading:true 
    };
    case GET_ORDER:
    case UPDATE_ORDER_SUCCESS:    
        return {
           ...state,
           orderDe:action.payload,
           loading:true      
    };
    case CREATE_NEW_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:    
        return {
           ...state,
           loading:false,
           error:action.payload 
    };
    case ORDER_ERROR:
        return {
          ...state,
          error:action.payload
    };
      default:
        return state;  
    };
}