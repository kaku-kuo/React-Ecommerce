import React from 'react';
import { Link } from 'react-router-dom';


const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <ul className="nav justify-content-center mb-4 checkout-steps">
         <li className="nav-item">
          {step1 ? 
          (<Link className="nav-link" to="/login">Login</Link>)
          :
          (<Link className="nav-link disabled" to="#">Login</Link>)
          }  
         </li>
         <li className="nav-item">
          {step2 ? 
          (<Link className="nav-link" to="/shipping">Shipping</Link>)
          :
          (<Link className="nav-link disabled" to="#">Shipping</Link>)
          }  
         </li>
         <li className="nav-item">
          {step3 ? 
          (<Link className="nav-link" to="/payment">Payment</Link>)
          :
          (<Link className="nav-link disabled" to="#">Payment</Link>)
          }  
         </li>
         <li className="nav-item">
          {step4 ? 
          (<Link className="nav-link" to="/placeorder">Place Order</Link>)
          :
          (<Link className="nav-link disabled" to="#">Place Order</Link>)
          }  
         </li>
        </ul>
    )
}
 export default CheckOutSteps;