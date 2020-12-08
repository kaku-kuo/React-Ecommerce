import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const OrderItem = ({ cartItem }) => {
    return (
        <div className="list-group list-group-flush">
         <div className="list-group-item">
          <div className="d-flex justify-content-between">
          <Link to={`/productlist/${cartItem._id}`}> 
          <div className="col py-4">   
           <img src={cartItem.image} alt="sneakers" style={{width:"90px",height:"auto"}}/>
          </div> 
          </Link>    
           <div className="text-center col-4 py-4">{cartItem.name}</div>
           <div className="text-center col py-4">{cartItem.size}</div>
           <div className="text-center col-1 py-4">{cartItem.qty}</div>
           <div className="text-center col py-4">${(cartItem.qty*cartItem.price).toLocaleString()}</div>
          </div>
         </div>
         <hr/>
        </div>
    )
}

OrderItem.propTypes = {
    cartItem:PropTypes.object.isRequired
}

export default OrderItem;