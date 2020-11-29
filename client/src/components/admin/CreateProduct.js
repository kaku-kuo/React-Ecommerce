import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNewProduct } from '../actions/adminActions';
import { setAlert } from '../actions/alertActions';
import axios from 'axios';
import Preloader from '../layout/Preloader';


const CreateProduct = ({ userDe, admin:{ newProduct }, createNewProduct, history }) => {   
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
if(!newProduct) return;
setAlert("New product been created!", "success");
history.push('/admin');
// eslint-disable-next-line
},[newProduct])

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
   createNewProduct({
       user:userDe && userDe._id,
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
  });
  window.scrollTo(0,0);
};


    return (
        <div className="container">
         <form className="shipping-form" onSubmit={handleSubmit}>
          <h3 className="shipping-title">CREATE PRODUCT</h3> 
           <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter product name" id="name" onChange={e => setName(e.target.value)}/>
           </div>
           <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" name="price" placeholder="Enter price" id="price" onChange={e => setPrice(e.target.value)}/>
           </div>
           <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input type="text" className="form-control" name="brand" placeholder="Enter brand" id="brand" onChange={e => setBrand(e.target.value)}/>
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
            <input type="text" className="form-control" name="description" placeholder="Enter description" id="description" onChange={e => setDes(e.target.value)}/>
           </div>
           <div className="form-group">
            <label>Size Stocks</label>
            <div className="my-1">
             <label htmlFor="07.5">07.5:</label>
             <input type="text" className="form-control stocks mx-1" name="index0" id="07.5" onChange={handleStocks}/>
             <label htmlFor="08.0">08.0:</label>
             <input type="text" className="form-control stocks mx-1" name="index1" id="08.0" onChange={handleStocks}/>
             <label htmlFor="08.5">08.5:</label>
             <input type="text" className="form-control stocks mx-1" name="index2" id="08.5" onChange={handleStocks}/>
             <label htmlFor="09.0">09.0:</label>
             <input type="text" className="form-control stocks mx-1" name="index3" id="09.0" onChange={handleStocks}/> 
            </div>
            <div className="my-1">
             <label htmlFor="09.5">09.5:</label>
             <input type="text" className="form-control stocks mx-1" name="index4" id="09.5" onChange={handleStocks}/>
             <label htmlFor="10.0">10.0:</label>
             <input type="text" className="form-control stocks mx-1" name="index5" id="10.0" onChange={handleStocks}/>
             <label htmlFor="10.5">10.5:</label>
             <input type="text" className="form-control stocks mx-1" name="index6" id="10.5" onChange={handleStocks}/>
             <label htmlFor="11.0">11.0:</label>
             <input type="text" className="form-control stocks mx-1" name="index7" id="11.0" onChange={handleStocks}/> 
            </div>
           </div>                      
            <input type="submit" className="btn btn-warning" value="SUBMIT"/>
         </form> 
        </div>
    )
}


CreateProduct.propTypes = {
   userDe:PropTypes.object,
   admin:PropTypes.object,
   createNewProduct:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   userDe:state.user.userDe,
   admin:state.admin
});

export default connect(mapStateToProps, { createNewProduct } )(CreateProduct);