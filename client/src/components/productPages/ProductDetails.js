import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../layout/Preloader';
import { setAlert } from '../actions/alertActions';
import { getProductDe } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const ProductDetails = (props) => {

const [checked, setChecked] = useState("");
const [item, setItem] = useState({
  name:"",
  price:0, 
  image:"",
  quantity:1,
  size:""
});
const [qty, setQty] = useState(0);
const [arr,setArr] = useState([]);
const [showModal,setShowModal] = useState(false);



useEffect(() => {
props.getProductDe(props.match.params.id);
// for renew qty when ckick different size
if(arr.length > 0){
  setArr([]);
}
// loop through specific countInStock for show dynamic qty
for(let i = 1; i <= qty;i++){ 
 arr.push(i);
}

// eslint-disable-next-line
}, [qty,arr]);



// Select Size
const handleSize = e => {
  
    switch(e.target.value){
        case "07.5":
           setChecked("07.5");
           setQty(props.productDe.countInStock[0]);         
           break; 
        case "08.0":
           setChecked("08.0");
           setQty(props.productDe.countInStock[1]);
           break;   
        case "08.5":
           setChecked("08.5");
           setQty(props.productDe.countInStock[2]);
           break; 
        case "09.0":
           setChecked("09.0");
           setQty(props.productDe.countInStock[3]);
           break;   
        case "09.5":
           setChecked("09.5");
           setQty(props.productDe.countInStock[4]);
           break;   
        case "10.0":
           setChecked("10.0");
           setQty(props.productDe.countInStock[5]);
           break;   
        case "10.5":
           setChecked("10.5");
           setQty(props.productDe.countInStock[6]);
           break;   
        case "11.0":
           setChecked("11.0");
           setQty(props.productDe.countInStock[7]);
           break;   
        default:
           setChecked("");        
    };
    setItem({...item,[e.target.name]:e.target.value});
    setShowModal(true);
};

// Select Quantity
const handleChange = e => {
    setItem({...item,[e.target.name]:Number(e.target.value)});
}

// Submit Item To Cart
const handleSubmit = e => {
    e.preventDefault();
    if(item.size === ""){
      props.setAlert("Please choose your size","warning");
    }else{
      props.addToCart(item,props.productDe._id);
      setShowModal(false);
    }
  
}


    return (
        <div className="container productdetaile">
         <div className="leftdetails">
          {props.productDe ? 
          <img className="detailsimg" src={props.productDe && props.productDe.image} alt="detaolsimg"/> 
          :
          <Preloader/>
          }    
         </div> 
         <div className="rightdetails">   
          <div className="detailsname">{props.productDe && props.productDe.name}</div>     
          <div className="description">{props.productDe && props.productDe.description}</div>

          <div className="reviewgroup">
           <div className="stars">   
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>  
            <span><FontAwesomeIcon className="star" icon={['fas', 'star']}/></span>
            <span className="reviewscore">5.0</span> 
           </div>                        
            <Link to="#" className="writereview">write a review </Link>         
          </div>  

          <div className="detailsprice">${props.productDe && props.productDe.price}</div>
         <form onSubmit={handleSubmit}>
          <div className="selectgroup">
            <label htmlFor="quantity">QTY :</label>
            <select name="quantity" className="selectquantity" onChange={handleChange}>
           { arr.length > 0 ? arr.map(num => <option value={num} key={num}>{num}</option>)
           :
           <option value="1">1</option>}
            </select>  
          </div> 
       
          <div className="sizegroup">
          <div>
            <label htmlFor="07.5" className={props.productDe && 
              props.productDe.countInStock[0] === 0 ? "out-of-stock"
              :
              checked === "07.5" ? "checked" : "sizebox"}>07.5</label>      
            <input type="radio" name="size" value="07.5" id="07.5" onClick={handleSize}/> 
          </div>  
         
          <div>
            <label htmlFor="08.0" className={props.productDe && 
              props.productDe.countInStock[1] === 0 ? "out-of-stock"
              :
              checked === "08.0" ? "checked" : "sizebox"}>08.0</label>      
            <input type="radio" name="size" value="08.0" id="08.0" onClick={handleSize}/> 
          </div>  

          <div>
            <label htmlFor="08.5" className={props.productDe && 
              props.productDe.countInStock[2] === 0 ? "out-of-stock"
              :
              checked === "08.5" ? "checked" : "sizebox"}>08.5</label>      
            <input type="radio" name="size" value="08.5" id="08.5" onClick={handleSize}/> 
          </div>  

          <div>
            <label htmlFor="09.0" className={props.productDe && 
              props.productDe.countInStock[3] === 0 ? "out-of-stock"
              :
              checked === "09.0" ? "checked" : "sizebox"}>09.0</label>      
            <input type="radio" name="size" value="09.0" id="09.0" onClick={handleSize}/> 
          </div>    

          <div>
            <label htmlFor="09.5" className={props.productDe && 
              props.productDe.countInStock[4] === 0 ? "out-of-stock"
              :
              checked === "09.5" ? "checked" : "sizebox"}>09.5</label>      
            <input type="radio" name="size" value="09.5" id="09.5" onClick={handleSize}/> 
          </div>    
         
          <div>
            <label htmlFor="10.0" className={props.productDe && 
              props.productDe.countInStock[5] === 0 ? "out-of-stock"
              :
              checked === "10.0" ? "checked" : "sizebox"}>10.0</label>      
            <input type="radio" name="size" value="10.0" id="10.0" onClick={handleSize}/> 
          </div>    
         
          <div>
            <label htmlFor="10.5" className={props.productDe && 
              props.productDe.countInStock[6] === 0 ? "out-of-stock"
              :
              checked === "10.5" ? "checked" : "sizebox"}>10.5</label>      
            <input type="radio" name="size" value="10.5" id="10.5" onClick={handleSize}/> 
          </div>    
         
          <div>
            <label htmlFor="11.0" className={props.productDe && 
              props.productDe.countInStock[7] === 0 ? "out-of-stock"
              :
              checked === "11.0" ? "checked" : "sizebox"}>11.0</label>      
            <input type="radio" name="size" value="11.0" id="11.0" onClick={handleSize}/> 
          </div>    
         
          </div>
           <input type="submit" value="ADD TO CART" className="btn btn-warning itemsubmitbtn" data-toggle={showModal ? "modal" : ""} data-target="#Cart-Item-Modal"/>
         </form>
         </div>
        </div>
    )
}


ProductDetails.propTypes = {
  getProductDe:PropTypes.func.isRequired,
  addToCart:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   productDe:state.product.productDe
})

export default connect(mapStateToProps,{ getProductDe, addToCart, setAlert })(ProductDetails);