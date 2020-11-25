import {
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS,
    USER_LOGOUT,
    USER_LOADED,
    USER_UPDATED,
    UPDATE_FAIL,
    AUTH_ERROR,
    CLEAR_ERROR
} from '../components/actions/types'

const initialState = {
    userDe:null,
    token:localStorage.getItem("token"),
    isAuthenticated:false,
    loading:false,
    error:null
}

export default(state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        localStorage.setItem("token",action.payload.token);    
           return {
               ...state,
               ...action.payload,
               isAuthenticated:true,
        };
        case USER_LOADED:
        case USER_UPDATED:    
        localStorage.setItem("name",action.payload.name);    
        localStorage.setItem("email",action.payload.email);        
           return {
              ...state,
              isAuthenticated:true,
              userDe:action.payload,
              loading:false
        }; 
        case USER_LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:   
        case AUTH_ERROR:  
        localStorage.removeItem("token");    
        localStorage.removeItem("name");    
        localStorage.removeItem("email");    
           return {
               ...state,
               userDe:null,
               token:null,
               isAuthenticated:false,
               loading:false,
               error:action.payload
        };
        case UPDATE_FAIL:
           return {
               ...state,
               loading:false,
               error:action.payload
        }; 
        case CLEAR_ERROR:
           return {
              ...state,
              error:null 
        };    
        default:
         return state
    }
}