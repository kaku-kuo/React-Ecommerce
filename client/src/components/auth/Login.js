import React,{ useState,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin,clearError } from '../actions/userActions';
import { setAlert } from '../actions/alertActions';
import { Link } from 'react-router-dom';


const Login = (props) => {

useEffect(() => {
  if(props.user.token){

      props.setAlert("Login successfully", "success");
      if(props.cartItems.length > 0){
        props.history.push("/shipping");
      }else{
        props.history.push("/");  
      }     
      
  }

  if(props.user.error === "Invalid Credentials" ){
      props.setAlert(props.user.error,"warning");
      props.clearError();
  }
// eslint-disable-next-line  
},[props.user.error,props.user.token])

const [formData, setFormData] = useState({email:"",password:""});
const { email, password } = formData;

const handleChange = e => {
    setFormData({...formData,[e.target.name]:e.target.value});
};
const handleSubmit = e => {
    e.preventDefault();
    if(email === "" || password === "" ){
        props.setAlert("Input field can not be empty", "warning");
        props.clearError();
    }else{
        props.userLogin(formData);         
    }
    
    
};

    return (
        <div className="container">
          
            <div className="shipping-form">
            <form onSubmit={handleSubmit}>
             <h3 className="shipping-title">LOGIN</h3> 
              <div className="form-group">
               <label htmlFor="email">Email Adress</label>
               <input type="email" className="form-control" placeholder="Enter email address" name="email" id="email" onChange={handleChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="password">Password</label>
               <input type="password" className="form-control" placeholder="Enter password" name="password" id="password" onChange={handleChange}/>
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
}

const mapStateToProps = state => ({
    user:state.user,
    cartItems:state.cart.cartItems
})

export default connect(mapStateToProps ,{ userLogin, setAlert, clearError })(Login);