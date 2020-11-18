import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    return (
        <div className="newarrivals">
         <div className="newarrivalstitle">  
          <div >New Arrivals</div>  
         </div> 
          <div className="newitems">
           <div className="newitem">
            <Link to="#"><img src="https://via.placeholder.com/150" alt="newitem1"/></Link> 
            <div>Air max3</div>
           </div>
           <div className="newitem">
            <Link to="#"><img src="https://via.placeholder.com/150" alt="newitem2"/></Link> 
            <div>Air max</div>
           </div>
           <div className="newitem">
            <Link to="#"><img src="https://via.placeholder.com/150" alt="newitem3"/></Link> 
            <div>Air max</div>
           </div>
           <div className="newitem">
            <Link to="#"><img src="https://via.placeholder.com/150" alt="newitem3"/></Link> 
            <div>Air max</div>
           </div>
           <div className="newitem">
            <Link to="#"><img src="https://via.placeholder.com/150" alt="newitem3"/></Link> 
            <div>Air max</div>
           </div>
        </div>
       </div> 
    )
}


export default NewArrivals;