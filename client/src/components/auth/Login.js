import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin, clearError } from '../actions/userActions';
import { setAlert } from '../actions/alertActions';
import { Link } from 'react-router-dom';


const Login = ({ user, cartItems, userLogin, setAlert, clearError, history}) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

useEffect(() => {

  if(user.token){
        setAlert("Login successfully", "success");
      if(cartItems.length > 0){
        history.push("/shipping");
      }else{
        history.push("/");  
      }           
  };
  if(user.error === "Invalid Credentials" ){
      setAlert(user.error,"warning");
      clearError();
  };

// eslint-disable-next-line  
},[user.error, user.token])


const handleSubmit = e => {

    e.preventDefault();
    if(email === "" || password === "" ){
        setAlert("Input field can not be empty", "warning");
        clearError();
    }else{
        userLogin({ email, password });                     
    };
    
};

    return (
        <div className="container"> 
          <div className="shipping-form">
            <form onSubmit={handleSubmit}>
             <h3 className="shipping-title">LOGIN</h3> 
              <div className="form-group">
               <label htmlFor="email">Email Adress</label>
               <input type="email" className="form-control" placeholder="Enter email address" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
              </div>
              <div className="form-group">
               <label htmlFor="password">Password</label>
               <input type="password" className="form-control" placeholder="Enter password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
              </div>
              <input type="submit" value="LOGIN" className="btn btn-warning"/>     
                <span className="ml-3">New Customer? <Link to="/register">Register</Link></span>
            </form>          
          </div>
        </div>
    )
}


Login.propTypes = {
    user:PropTypes.object,
    cartItems:PropTypes.array,
    userLogin:PropTypes.func.isRequired,
    setAlert:PropTypes.func.isRequired,
    clearError:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user:state.user,
    cartItems:state.cart.cartItems
});

export default connect(mapStateToProps ,{ userLogin, setAlert, clearError })(Login);