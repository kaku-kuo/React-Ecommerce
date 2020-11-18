import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProductFilter = () => {

const [brand, setBrand] = useState(false);
const [color, setColor] = useState(false);
const [price, setPrice] = useState(false);



//Show and hide refine button
const showBrand = () => {
    if(!brand){
        setBrand(true);
    }else{
        setBrand(false);
    }
};

const showColor = () => {
    if(!color){
        setColor(true);
    }else{
        setColor(false);
    }
};

const showPrice = () => {
    if(!price){
        setPrice(true);
    }else{
        setPrice(false);
    }
};

const handleCheck = e => {
console.log(e.target.name,e.target.checked)
}
    return (
        <div >                    
          <ul className="filter">    

           <div className="brand" onClick={showBrand}>
            {brand === false ? 
            <li>
               BRAND
               {brand === false && <FontAwesomeIcon className="plus" icon={['fas', 'plus']}/>}                           
            </li> 
            :
             <li>
               BRAND
               {brand === true && <FontAwesomeIcon  className="minus" icon={['fas', 'minus']}/>}            
             </li>}   
            </div>            
            {brand === true && 
            <div>
            <div className="filteritem">
               <label className="checkboxcontainer">
                <input type="checkbox" name="nike" onChange={handleCheck}/>NIKE
                <span className="checkmark"/>
               </label>                     
            </div>       
            <div className="filteritem">
            <label className="checkboxcontainer">
                <input type="checkbox" name="adidas" onChange={handleCheck}/>ADIDAS
                <span className="checkmark"/>
            </label>             
            </div>
            </div>}
            
            <div className="color" onClick={showColor}>
            {color === false ? 
            <li>
               COLOR
               {color === false && <FontAwesomeIcon className="plus" icon={['fas', 'plus']}/>}                           
            </li> 
            :
             <li>
               COLOR
               {color === true && <FontAwesomeIcon  className="minus" icon={['fas', 'minus']}/>}            
             </li>}   
            </div>            
            {color === true && 
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
            </div>}

            <div className="price" onClick={showPrice}>
            {price === false ? 
            <li>
               PRICE
               {price === false && <FontAwesomeIcon className="plus" icon={['fas', 'plus']}/>}                           
            </li> 
            :
             <li>
               PRICE
               {price === true && <FontAwesomeIcon  className="minus" icon={['fas', 'minus']}/>}            
             </li>}   
            </div>            
            {price === true && 
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
            </div>} 
          </ul> 
        </div>
    )
}

export default ProductFilter;