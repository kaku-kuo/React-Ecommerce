import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import { getProductDe, addReview, clearErrorReview } from '../actions/productActions';

const AddReviewModal = ({ productDe, reviewAdded, error, addReview, clearErrorReview, getProductDe }) => {
const [value, setValue] = useState(0);
const [ratingDes, setRatingDes] = useState("");
const [content, setContent] = useState("");
const [msg, setMsg] = useState(null);

// Display different rating description
useEffect(() => {
if(value === 0) return; 
switch(value){
  case null:
    setRatingDes("Click to rate!");
    break;
  case 1:
    setRatingDes("Poor");
    break;
  case 2:
    setRatingDes("Fair");
    break;
  case 3:
    setRatingDes("Average");
    break;
  case 4:
    setRatingDes("Good");
    break;
  case 5:
    setRatingDes("Execllent");
    break;                      
  default:
    console.log(value);
}; 
//eslint-disable-next-line
},[value]);

// Fire when review submitted, Display the message submit whether success
useEffect(() => {
if(error){
  setMsg(error);
};
if(reviewAdded){
  setMsg(reviewAdded);
};
//eslint-disable-next-line
},[error, reviewAdded]);


// Handle clean msg and renew page after reviewed
const handleClick = () => {
  getProductDe(productDe && productDe._id);
  clearErrorReview();
  setMsg("");
};


const submitReview = e => {
   e.preventDefault();
   addReview(productDe && productDe._id, { rating:value, comment:content });
   setValue(0);
   setContent("");
};
    return (
        <div className="modal fade" id="add-review-modal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="staticBackdropLabel">My Review</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
             <form onSubmit={submitReview}>
              <div className="modal-body">
               <div className="overall-rating d-flex">      
                 <div>Overall Rating</div>
                 <div className="mx-2 star-group p-1">   
                  <Rating name="rating" value={value} onChange={(e, newValue) => {setValue(newValue)}}/>
                 </div>
                 <div className="mx-1">{value === 0 ? "Click to rate!":ratingDes}</div>
               </div>
               <div className="form-group review-content">
                <label className="font-weight-normal" htmlFor="review">Review:</label>
                <textarea className="form-control" value={content} id="review" name="review" row="3" 
                onChange={e => setContent(e.target.value)}/>
               </div>
               {msg && 
               <div className={`text-center ${msg === "Product already reviewed" ? "text-danger":"text-success"}`}>
                 <h3>{msg}</h3>
               </div>}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-warning">SUBMIT</button>
              </div>
             </form>
            </div>
          </div>
        </div>
    )
}


const mapStateToProps = state => ({
   productDe:state.product.productDe,
   reviewAdded:state.product.reviewAdded,
   error:state.product.error
});

export default connect(mapStateToProps, { addReview, clearErrorReview, getProductDe })(AddReviewModal);