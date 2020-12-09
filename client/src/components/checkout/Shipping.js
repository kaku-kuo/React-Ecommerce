import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../layout/CheckOutSteps';

const Shipping = ({ saveShippingAddress, shippingAddress, history }) => {
// Set default value from localstorage 
const [address, setAddress] = useState(shippingAddress.address);    
const [city, setCity] = useState(shippingAddress.city);    
const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);    
const [country, setCountry] = useState(shippingAddress.country);    


const handleSubmitAddress = e => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    history.push("/payment"); 
};
    return (
        <div className="container">

            <CheckOutSteps step1 step2/>
          
            <form className="shipping-form" onSubmit={handleSubmitAddress}>
              
             <h3 className="shipping-title">SHIPPING</h3> 
              <div className="form-group">
               <label htmlFor="address">Address</label>
               <input type="text" className="form-control" name="address" value={address} placeholder="Enter address" id="address" onChange={e => setAddress(e.target.value)}/>
              </div>
              <div className="form-group">
               <label htmlFor="city">City</label>
               <input type="text" className="form-control" name="city" value={city} placeholder="Enter city" id="city" onChange={e => setCity(e.target.value)}/>
              </div>
              <div className="form-group">
               <label htmlFor="postalcode">Postal code</label>
               <input type="text" className="form-control" name="postalCode" value={postalCode} placeholder="Enter post code" id="postalcode" onChange={e => setPostalCode(e.target.value)}/>
              </div>
              <div className="form-group">
               <label htmlFor="country">Country</label>
               <input type="text" className="form-control" name="country" value={country} placeholder="Enter country" id="country" onChange={e => setCountry(e.target.value)}/>
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