import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../layout/CheckOutSteps';

const Shipping = (props) => {
const [shippingAddress,setShippingAddress] = useState({
    address:props.shippingAddress.address,
    city:props.shippingAddress.city,
    postalCode:props.shippingAddress.postalCode,
    country:props.shippingAddress.country
});

const handleAddressChange = e => {
    setShippingAddress({...shippingAddress,[e.target.name]:e.target.value});
};

const handleSubmitAddress = e => {
    e.preventDefault();
    props.saveShippingAddress(shippingAddress);
    props.history.push("/payment");
};
    return (
        <div className="container">

            <CheckOutSteps step1 step2/>
          
            <form className="shipping-form" onSubmit={handleSubmitAddress}>
              
             <h3 className="shipping-title">SHIPPING</h3> 
              <div className="form-group">
               <label htmlFor="address">Address</label>
               <input type="text" className="form-control" name="address" value={shippingAddress.address} placeholder="Enter address" id="address" onChange={handleAddressChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="city">City</label>
               <input type="text" className="form-control" name="city" value={shippingAddress.city} placeholder="Enter city" id="city" onChange={handleAddressChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="postalcode">Postal code</label>
               <input type="text" className="form-control" name="postalCode" value={shippingAddress.postalCode} placeholder="Enter post code" id="postalcode" onChange={handleAddressChange}/>
              </div>
              <div className="form-group">
               <label htmlFor="country">Country</label>
               <input type="text" className="form-control" name="country" value={shippingAddress.country} placeholder="Enter country" id="country" onChange={handleAddressChange}/>
              </div>           
              <input type="submit" className="btn btn-warning" value="CONTINUE"/>
            </form>
        </div>
    )
}

Shipping.propTypes = {
   shippingAddress:PropTypes.object,
   saveShippingAddress:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   shippingAddress:state.cart.shippingAddress
});

export default connect(mapStateToProps,{ saveShippingAddress })(Shipping);