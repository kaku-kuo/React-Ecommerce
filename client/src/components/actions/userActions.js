import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    USER_LOGOUT,
    USER_LOADED,
    USER_UPDATED,
    UPDATE_FAIL,
    AUTH_ERROR,
    CLEAR_ERROR
} from './types'


// User login
export const userLogin = formData => async dispatch => {
     const config = {
         headers:{
             "Content-Type":"application/json"
         }
     }
     try {
         const res = await axios.post('/api/auth', formData, config);
  
         dispatch({
             type:LOGIN_SUCCESS,
             payload:res.data
         });
        loadUser();
     } catch (err) {
         dispatch({
             type:LOGIN_FAIL,
             payload:err.response.data.msg
         });
     }
}

// User logout
export const userLogout = () => dispatch => {  
    localStorage.removeItem("token");    
    localStorage.removeItem("name");  
        dispatch({
            type:USER_LOGOUT
        });
}

// User register
export const userRegister = (formData) => async dispatch => {
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        const res = await axios.post('api/users', formData, config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        loadUser();
    } catch (err) {
        dispatch({
            type:REGISTER_FAIL,
            payload:err.response.data.msg    
        });
    }
   
}

// User update
export const userUpdate = (formData,id) => async dispatch => {


    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {  
        const res = await axios.put(`api/users/profile/${id}`, formData, config);
        dispatch({
            type:USER_UPDATED,
            payload:res.data
        });
        loadUser();
    } catch (err) {
        dispatch({
            type:UPDATE_FAIL,
            payload:err.response  
        });
    }
 
   
}


// Load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
       try {
           const res = await axios.get('/api/auth');
           dispatch({ type:USER_LOADED, payload:res.data });
       } catch (err) {
           dispatch({type:AUTH_ERROR});
       }
    }
    
}

// Clear erroe
export const clearError = () => dispatch => {
    dispatch({type:CLEAR_ERROR})
}