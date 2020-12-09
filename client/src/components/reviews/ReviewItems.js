import React,{ useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReviewItems = ({ review }) => {
const [star1] = useState(true);    
const [star2, setStar2] = useState(true);    
const [star3, setStar3] = useState(true);    
const [star4, setStar4] = useState(true);    
const [star5, setStar5] = useState(true);    

useEffect(() => {
if(!review) return;    
switch(review.rating){
    case 1:
        setStar2(false) 
        setStar3(false) 
        setStar4(false) 
        setStar5(false)
       break; 
    case 2: 
        setStar3(false) 
        setStar4(false) 
        setStar5(false)
        break;   
    case 3:
        setStar4(false) 
        setStar5(false)
        break;  
    case 4:
        setStar5(false)
        break;
    case 5:
        break;      
    default:
       console.log(review)  
}
// eslint-disable-next-line
},[review.rating]);

    return (
        <div className="container">
         <div className="review-details">
          <div>{review.name}</div>
           <div className="stars">   
            <span><FontAwesomeIcon className={star1 ? "star":"nostar"} icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className={star2 ? "star":"nostar"} icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className={star3 ? "star":"nostar"} icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className={star4 ? "star":"nostar"} icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className={star5 ? "star":"nostar"} icon={['fas', 'star']}/></span>
           </div>
           <div>{review.createdAt.substring(0, 10)}</div>                        
         </div>
         <div className="review-details">
          <p>{review.comment}</p>  
         <div/>  
         <hr/>
        </div>
       </div>
    )
}

export default ReviewItems;