import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckOutSteps from '../layout/CheckOutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const Payment = (props) => {
const [paymentMethod,setPaymentMethod] = useState("");

const handleSubmit = e => {
    e.preventDefault();
    props.savePaymentMethod(paymentMethod);
    props.history.push("/placeorder");
}
    return (
        <div className="container">

        <CheckOutSteps step1 step2 step3/>

        <div className="shipping-form">
          
         <h3 className="shipping-title">PAYMENT METHOD</h3> 
          <div>
           <div className="select-method">Select method</div>
           <form className="payment" onSubmit={handleSubmit}>         
            <input type="radio" className="payment" id="PayPal" name="paymentMethod" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}/>
            <label className="ml-2" htmlFor="PayPal">PayPal or Credit Card</label> 
            <div>
             <input type="submit" className="btn btn-warning my-2" value="CONTINUE"/>
            </div>
           </form> 
          </div>

        </div>

    </div>
    )
}

Payment.propTypes = {
  savePaymentMethod:PropTypes.func.isRequired
}

export default connect(null,{ savePaymentMethod })(Payment);