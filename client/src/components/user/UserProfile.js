import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userUpdate, userLogout } from '../actions/userActions';
import { getOrders } from '../actions/orderActions';
import { setAlert } from '../actions/alertActions';
import Preloader from '../layout/Preloader';
import OrderListItems from '../order/OrderListItems';



const UserProfile = ({ userDe , orders, loading,  userUpdate, userLogout, setAlert, history, getOrders }) => {
const [name, setName] = useState(localStorage.name);
const [email, setEmail] = useState(localStorage.email);
const [password, setPassword] = useState("");
const [password2, setPassword2] = useState("");
const [orderList, setOrderList] = useState([]);

useEffect(() => {
 getOrders();
 // eslint-disable-next-line
},[]);

useEffect(() => {
 if(!userDe && !orders) return; 
 if(userDe && orders){
   const list = orders.filter(order => order.user === userDe._id);
   setOrderList(list);
  } 
// eslint-disable-next-line
},[orders,userDe]);



const handleSubmit = e => {
    e.preventDefault();
    if(password !== password2){      
        setAlert('Password not match','danger');
        setPassword("");
        setPassword2("");
    }else if(name === "" || email === ""){
        setAlert("Input field can not be empty", "warning");
    }else{
        if(userDe){   

         if(password !== "" && password2 !== ""){
           userUpdate({name,email,password,password2}, userDe._id);
           setAlert("Password updated! Please log in again","success");  
           history.push("/"); 
           userLogout(); 
         }else{
           setAlert("Updated successfully!", "success");    
           userUpdate({name,email,password,password2}, userDe._id);  
         }    
       
        } 
    }   
}

    return (
      userDe && orders ? 
        <div className="d-flex" style={{margin:"0 60px"}}>

           <form className="update-user-form" onSubmit={handleSubmit}>            
              <h3 className="shipping-title">USER PROFILE</h3> 
               <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input type="text" className="form-control" value={name} placeholder="Enter name" id="name" onChange={(e) => setName(e.target.value)}/>
               </div>
               <div className="form-group">
                <label htmlFor="Email Address">Email Address</label>
                <input type="email" className="form-control" value={email} placeholder="Enter email" id="Email Address" onChange={(e) => setEmail(e.target.value)}/>
               </div>
               <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={password} placeholder="Enter password" id="password" onChange={(e) => setPassword(e.target.value)}/>
               </div>
               <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" className="form-control" name="password2" value={password2} placeholder="Confirm password" id="password2" onChange={(e) => setPassword2(e.target.value)}/>
               </div>           
               <input type="submit" className="btn btn-warning" value="UPDATE"/>
            </form> 

            <div className="order-list">
             <h3 className="shipping-title">MY ORDERS</h3>
             {orderList.length === 0 ?
              <h4>NO ORDERS</h4> 
              : 
             <table className="table table-bordered table-striped">
              <thead>
               <tr>
                <th scope="col" className="id-col">ID</th>
                <th scope="col" className="date-col">DATE</th>
                <th scope="col" className="total-col">TOTAL</th>
                <th scope="col" className="paid-col text-center">PAID</th>
                <th scope="col" className="delivered-col text-center">DELIVERED</th>
                <th scope="col" className="last-col"/>
               </tr>
              </thead>
              <tbody>
               {orderList.map(order => <OrderListItems orderItem={order} key={order._id}/>)}
              </tbody>
             </table>
             }
            </div>
        </div>
      :
      <Preloader/>  
    )
}

UserProfile.propTypes = {
  userDe:PropTypes.object,
  orders:PropTypes.array,
  loading:PropTypes.bool,
  userUpdate:PropTypes.func.isRequired,
  userLogout:PropTypes.func.isRequired,
  getOrders:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userDe:state.user.userDe,
  orders:state.order.orders,
  loading:state.order.loading
});

export default connect(mapStateToProps ,{ setAlert, userUpdate, userLogout, getOrders })(UserProfile);