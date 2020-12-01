import React,{ Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProductRating = ({ rating }) => {

    return (
        <Fragment>   
         <FontAwesomeIcon className="star" icon={rating <= 0.4 ? ['far', 'star']:(rating >= 1 ? ['fas', 'star']:['fas', 'star-half-alt'])}/>  
         <FontAwesomeIcon className="star" icon={rating <= 1.4 ? ['far', 'star']:(rating >= 2 ? ['fas', 'star']:['fas', 'star-half-alt'])}/>  
         <FontAwesomeIcon className="star" icon={rating <= 2.4 ? ['far', 'star']:(rating >= 3 ? ['fas', 'star']:['fas', 'star-half-alt'])}/>  
         <FontAwesomeIcon className="star" icon={rating <= 3.4 ? ['far', 'star']:(rating >= 4 ? ['fas', 'star']:['fas', 'star-half-alt'])}/>  
         <FontAwesomeIcon className="star" icon={rating <= 4.4 ? ['far', 'star']:(rating >= 5 ? ['fas', 'star']:['fas', 'star-half-alt'])}/> 
        </Fragment>
    )
}

export default ProductRating;