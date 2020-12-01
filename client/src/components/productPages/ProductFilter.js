import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProductFilter = () => {
const [size, setSize] = useState(false);
const [price, setPrice] = useState(false);



const handleCheck = e => {
console.log(e.target.name,e.target.checked)
};
    return (
        <div className="col-sm-2">                    
          <ul className="filter">    
            
          <ul className="size p-0" onClick={() => !size ? setSize(true):setSize(false)}>
           <li>
            SIZE
            <FontAwesomeIcon className={size ? "minus":"plus"} icon={size ? ['fas', 'minus']:['fas', 'plus']}/>
           </li>
          </ul>          
            {size ? 
            <div>
             <div className="filteritem">
               <label className="checkboxcontainer">
                <input type="checkbox" name="white" onChange={handleCheck}/>WHITE
                <span className="checkmark"/>
               </label>                     
             </div>       
             <div className="filteritem">
              <label className="checkboxcontainer">
                <input type="checkbox" name="black" onChange={handleCheck}/>BLACK
                <span className="checkmark"/>
              </label>             
             </div>
             <div className="filteritem">
              <label className="checkboxcontainer">
                <input type="checkbox" name="grey" onChange={handleCheck}/>GREY
                <span className="checkmark"/>
              </label>             
             </div>
            </div>:null}

            <ul className="price p-0" onClick={() => !price ? setPrice(true):setPrice(false)}>
             <li>
              PRICE
              <FontAwesomeIcon className={price ? "minus":"plus"} icon={price ? ['fas', 'minus']:['fas', 'plus']}/>
             </li>
            </ul>            
            {price ?
            <div>
            <div className="filteritem">
               <label className="checkboxcontainer">
                <input type="checkbox" name="under1200" onChange={handleCheck}/>UNDER $1200
                <span className="checkmark"/>
               </label>                     
            </div>       
            <div className="filteritem">
            <label className="checkboxcontainer">
                <input type="checkbox" name="over1200" onChange={handleCheck}/>OVER $1200
                <span className="checkmark"/>
            </label>             
            </div>
            </div>:null} 
          </ul> 
        </div>
    )
}

export default ProductFilter;