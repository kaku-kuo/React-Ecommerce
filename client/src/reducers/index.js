import { combineReducers } from 'redux';
import productReducer from './productReducer';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    product:productReducer,
    user:userReducer,
    alert:alertReducer,
    cart:cartReducer,
    order:orderReducer,
    admin:adminReducer
});