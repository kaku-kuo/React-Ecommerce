import React,{ Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeProduct } from '../actions/productActions';

const AdminPageProductItems = ({ productItem, removeProduct }) => {
    
    return (
        <Fragment>
         <tr>
          <td className="font-weight-normal">{productItem._id}</td>   
          <td>{productItem.name}</td>   
          <td>${productItem.price.toLocaleString()}</td>   
          <td>{productItem.brand}</td>
          <td className="text-center">
           <Link to={`/admin/updateproduct/${productItem._id}`}>
            <FontAwesomeIcon className="product-edit-delete-icon" icon={['fas', 'edit']}/>
           </Link>    
            <FontAwesomeIcon className="product-edit-delete-icon  text-danger" icon={['far', 'trash-alt']} 
            onClick={() => removeProduct(productItem._id)}/>
          </td>   
         </tr> 
        </Fragment>
    )
}


export default connect(null, {removeProduct })(AdminPageProductItems);