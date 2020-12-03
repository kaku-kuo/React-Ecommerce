import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProductFilter = ({ valueFromFilter }) => {
const [size, setSize] = useState(false);
const [price, setPrice] = useState(false);



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
               <input type="checkbox" name="size075" onChange={e => e.target.checked ? valueFromFilter(e.target.name,e.target.checked):valueFromFilter(e.target.name,e.target.checked)}/>07.5
               <span className="checkmark"/>
              </label>                     
             </div>       
             <div className="filteritem">
              <label className="checkboxcontainer">
                <input type="checkbox" name="size080" onChange={e => e.target.checked ? valueFromFilter(e.target.name,e.target.checked):valueFromFilter(e.target.name,e.target.checked)}/>08.0
                <span className="checkmark"/>
              </label>             
             </div>
             <div className="filteritem">
              <label className="checkboxcontainer">
                <input type="checkbox" name="size085" onChange={e => e.target.checked ? valueFromFilter(e.target.name,e.target.checked):valueFromFilter(e.target.name,e.target.checked)}/>08.5
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
               <input type="checkbox" name="under5000" onChange={e => e.target.checked ? valueFromFilter(e.target.name,e.target.checked):valueFromFilter(e.target.name,e.target.checked)}/>UNDER $5000
               <span className="checkmark"/>
              </label>                     
             </div>       
             <div className="filteritem">
              <label className="checkboxcontainer">
               <input type="checkbox" name="over5000" onChange={e => e.target.checked ? valueFromFilter(e.target.name,e.target.checked):valueFromFilter(e.target.name,e.target.checked)}/>OVER $5000
               <span className="checkmark"/>
              </label>             
             </div>
            </div>:null} 
          </ul> 
        </div>
    )
}

export default ProductFilter;