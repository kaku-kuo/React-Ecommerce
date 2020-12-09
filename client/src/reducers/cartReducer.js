import { 
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    EDIT_ITEM_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    CLEAN_CART_ITEMS 
} from '../components/actions/types';

const initialState = {
    cartItems:[],
    shippingAddress:{},
    paymentMethod:null
}

export default(state = initialState, action) => {
    switch(action.type){

    case ADD_TO_CART:
        const item = action.payload
        
        const existItem = state.cartItems.find(x => x.identifier === item.identifier)

    if(existItem){
         return{
         ...state,
         cartItems:state.cartItems.map(x => x.identifier === item.identifier ? item : x)
        }
        }else{
         return {
         ...state,
         cartItems:[...state.cartItems, item]
        } 
    };
    case EDIT_ITEM_FROM_CART:
       return {
         ...state,
         cartItems:state.cartItems.map(item => item.identifier === action.payload.identifier ? action.payload:item)  
    }; 
    case REMOVE_ITEM_FROM_CART:
       return{
         ...state,
         cartItems:state.cartItems.filter(item => item.identifier !== action.payload)
    };
    case SAVE_SHIPPING_ADDRESS:
       return {
        ...state,
        shippingAddress:action.payload   
    };
    case SAVE_PAYMENT_METHOD:
       return {
       ...state,
       paymentMethod:action.payload
    };
    case CLEAN_CART_ITEMS:
       return {
       ...state,
       cartItems:[]
    };        
       default:
        return state  
    };
};