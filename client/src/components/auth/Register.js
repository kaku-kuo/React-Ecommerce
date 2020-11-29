import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alertActions';
import { userRegister, clearError } from '../actions/userActions';





const Register = ({ user:{ error },userRegister, clearError, setAlert }) => {

useEffect(() => {
    if(error === "User already exists" ){
        setAlert(error,"warning");
        clearError();  
    }
   // eslint-disable-next-line 
},[error])

const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
});

const { name, email, password, password2} = formData;

const handleChange = e => {
    setFormData({...formData,[e.target.name]:e.target.value})
};

const handleSubmit = e => {
    e.preventDefault();
    if(password !== password2){       
        setAlert('Password not match','danger');
    }else if(name === "" || email === "" || password === "" || password2 === ""){
        setAlert("Input field can not be empty", "warning");
    }else{
        userRegister({name, email, password});
    }   
};
    return (
        <div className="container">

            <div className="shipping-form">
            <form onSubmit={handleSubmit}>  
             <h3 className="shipping-title">REGISTER</h3> 
              <div className="form-group">
               <label htmlFor="name">Name</label>
               <input type="text" className="form-control" name="name" placeholder="Enter a name" id="name" onChange={handleChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="email">Email Adress</label>
               <input type="email" className="form-control" name="email" placeholder="Enter email address" id="email" onChange={handleChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="password">Password</label>
               <input type="password" className="form-control" name="password" placeholder="Enter password" id="password" onChange={handleChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="password2">Confirm Password</label>
               <input type="password" className="form-control" name="password2" placeholder="Confirm password" id="password2" onChange={handleChange}/>
              </div>            
              <input type="submit" className="btn btn-warning" value="REGISTER"/>        
            </form>
            </div>
            
        </div>
    )
}

Register.propTypes = {
    user:PropTypes.object,
    userRegister:PropTypes.func.isRequired,
    setAlert:PropTypes.func.isRequired,
    clearError:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user:state.user
});

export default connect(mapStateToProps ,{ userRegister,setAlert, clearError })(Register);