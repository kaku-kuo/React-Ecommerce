import React,{ Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const OrderListItems = ({ orderItem }) => {
    return (
        <Fragment>
         <tr>
          <td className="font-weight-normal">{orderItem._id}</td>
          <td>{orderItem.updatedAt.substring(0, 10)}</td>
          <td>${orderItem.totalPrice.toLocaleString()}</td>
          <td className="text-center">{orderItem.isPaid ? 
          orderItem.updatedAt.substring(0, 10)
          :
          <FontAwesomeIcon className="text-danger" icon={['fas', 'times']}/>
          }
          </td>
          <td className="text-center">{orderItem.isDelivered ? 
          <FontAwesomeIcon className="text-success" icon={['fas', 'check']}/>
          :
          <FontAwesomeIcon className="text-danger" icon={['fas', 'times']}/>
          }
          </td>
          <td className="text-center last-td" style={{padding:"10px 20px"}}>
           <a href={`/order/${orderItem._id}`}>    
            DETAILS
           </a>  
          </td>
         </tr>  
        </Fragment>
    )
}

export default OrderListItems;