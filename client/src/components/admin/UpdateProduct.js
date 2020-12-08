import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductDe, updateProduct } from '../actions/productActions';
import { setAlert } from '../actions/alertActions';
import axios from 'axios';
import Preloader from '../layout/Preloader';


const UpdateProduct = ({ productDe, getProductDe, updateProduct, setAlert, match, history }) => {   
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [brand, setBrand] = useState("");
const [image, setImage] = useState("");
const [uploading, setUploading] = useState(false);
const [des, setDes] = useState("");
const [stocks, setStocks] = useState({
    index0:0,
    index1:0,
    index2:0,
    index3:0,
    index4:0,
    index5:0,
    index6:0,
    index7:0,
});

useEffect(() => {
if(!productDe || productDe._id !== match.params.id){
  getProductDe(match.params.id);
}else{
  setName(productDe.name);  
  setPrice(productDe.price);  
  setBrand(productDe.brand);  
  setImage(productDe.image);  
  setDes(productDe.description);
  setStocks({
    ...stocks,
    index0:productDe.countInStock[0],
    index1:productDe.countInStock[1],
    index2:productDe.countInStock[2],
    index3:productDe.countInStock[3],
    index4:productDe.countInStock[4],
    index5:productDe.countInStock[5],
    index6:productDe.countInStock[6],
    index7:productDe.countInStock[7],
 });
};
// eslint-disable-next-line
},[productDe]);


const handleUploadFile = async (e) => {
     const file = e.target.files[0];
     const formData = new FormData();
     formData.append('image', file);
     setUploading(true);

     try {
       const config = {
           headers:{
               'Content-Type':'multipart/form-data'
           }
       };
       
       const { data } = await axios.post('/api/upload', formData, config);
       setImage(data);
       setUploading(false);
     } catch (err) {
       console.error(err);
       setUploading(false);  
     };
};


const handleStocks = e => {
    setStocks({...stocks,[e.target.name]:Number(e.target.value)});
};


const handleSubmit = e => {
   e.preventDefault();
   updateProduct({
       name:name,
       price:Number(price),
       brand:brand,
       image:image,
       description:des,
       countInStock:[
        stocks.index0,
        stocks.index1,
        stocks.index2,
        stocks.index3,
        stocks.index4,
        stocks.index5,
        stocks.index6,
        stocks.index7,
    ]
  },productDe._id);

  window.scrollTo(0,0);
  setAlert("Product been updated!", "success");
  setTimeout(() => {
     history.push('/admin/page/1');
  },2000);
};


    return (
        productDe ?
        <div className="container">
         <form className="shipping-form" onSubmit={handleSubmit}>
          <h3 className="shipping-title">UPDATE PRODUCT</h3> 
           <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input type="text" className="form-control" name="name" value={name} placeholder="Enter product name" id="name" onChange={e => setName(e.target.value)}/>
           </div>
           <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" name="price" value={price} placeholder="Enter price" id="price" onChange={e => setPrice(e.target.value)}/>
           </div>
           <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <select className="form-control" value={brand} name="brand" id="brand" onChange={e => setBrand(e.target.value)}>
             <option value="jordan">Air Jordan</option>
             <option value="kobe">Kobe Bryant</option>
             <option value="lbj">LeBron James</option>
             <option value="drose">Derrick Rose</option>
            </select>
           </div>
           <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input type="text" className="form-control" name="image" value={image} placeholder="Image URL" id="image" onChange={e => setImage(e.target.value)}/>
            <div className="custom-file">
             <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={handleUploadFile}/>
             <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
            </div>       
             {uploading && <Preloader/>}
           </div>  
           <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea rows="6" className="form-control" name="description" value={des} placeholder="Enter description" id="description" onChange={e => setDes(e.target.value)}/>
           </div>
           <div className="form-group">
            <label>Size Stocks</label>
            <div className="my-1">
             <label htmlFor="07.5">07.5:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index0} name="index0" id="07.5" onChange={handleStocks}/>
             <label htmlFor="08.0">08.0:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index1} name="index1" id="08.0" onChange={handleStocks}/>
             <label htmlFor="08.5">08.5:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index2} name="index2" id="08.5" onChange={handleStocks}/>
             <label htmlFor="09.0">09.0:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index3} name="index3" id="09.0" onChange={handleStocks}/> 
            </div>
            <div className="my-1">
             <label htmlFor="09.5">09.5:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index4} name="index4" id="09.5" onChange={handleStocks}/>
             <label htmlFor="10.0">10.0:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index5} name="index5" id="10.0" onChange={handleStocks}/>
             <label htmlFor="10.5">10.5:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index6} name="index6" id="10.5" onChange={handleStocks}/>
             <label htmlFor="11.0">11.0:</label>
             <input type="text" className="form-control stocks mx-1" value={stocks.index7} name="index7" id="11.0" onChange={handleStocks}/> 
            </div>
           </div>                      
            <input type="submit" className="btn btn-warning" value="SUBMIT"/>
         </form> 
        </div>
        :
        <Preloader/>
    )
}


UpdateProduct.propTypes = {
   userDe:PropTypes.object,
   productDe:PropTypes.object,
   getProductDe:PropTypes.func.isRequired,
   updateProduct:PropTypes.func.isRequired,
   setAlert:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   userDe:state.user.userDe,
   productDe:state.product.productDe
});

export default connect(mapStateToProps, { getProductDe, updateProduct, setAlert } )(UpdateProduct);