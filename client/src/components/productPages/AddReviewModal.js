import React,{ useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddReviewModal = () => {
const [ratingStar1, setRatingStar1] = useState(false);    
const [ratingStar2, setRatingStar2] = useState(false);    
const [ratingStar3, setRatingStar3] = useState(false);    
const [ratingStar4, setRatingStar4] = useState(false);    
const [ratingStar5, setRatingStar5] = useState(false);    
const [clickStar, setClickStar] = useState(false);
const [clickStar2, setClickStar2] = useState(false);
const [clickStar3, setClickStar3] = useState(false);
const [clickStar4, setClickStar4] = useState(false);
const [clickStar5, setClickStar5] = useState(false);
const [rateComment, setRateComment] = useState("Click to rate!");
// useEffect(() => {
// if(!ratingStar1 && !ratingStar2 && !ratingStar3 && !ratingStar4 && !ratingStar5){
//     setRateComment("Click to rate!")
// }
// },[ratingStar1,ratingStar2,ratingStar3,ratingStar4,ratingStar5])
// useEffect(() => {
//   if(clickStar && clickStar2 && clickStar3 && clickStar4 && clickStar5){
//     setRateComment("Click to rate!")
//   }
// },[ratingStar1,ratingStar2,ratingStar3,ratingStar4,ratingStar5])
    
    return (
        <div className="modal fade" id="add-review-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">My Review</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
               <div className="overall-rating d-flex">      
                 <div>Overall Rating</div>
                 <div className="mx-2 star-group"
                    onMouseLeave={() => 
                    (setRatingStar1(false),
                    setRatingStar2(false),
                    setRatingStar3(false),
                    setRatingStar4(false),
                    setRatingStar5(false))}>   
                  <span>
                   <FontAwesomeIcon className={ratingStar1 || clickStar || clickStar2 || clickStar3 || clickStar4 || clickStar5 ? "rating-star-hover":"rating-star"} icon={['fas', 'star']}
                   onMouseEnter={() => (setRatingStar1(true),setRatingStar2(false),setRateComment("Poor"))}
                   onMouseLeave={() => clickStar2 ? (setRatingStar2(true),setRateComment("Fair")):setRateComment("Click to rate")}
                   onClick={() => (setClickStar(true),setClickStar2(false),setClickStar3(false),setClickStar4(false),setClickStar5(false))}
                   />                 
                  </span>  
                  <span>
                   <FontAwesomeIcon className={ratingStar2 || clickStar3 || clickStar4 || clickStar5 ? "rating-star-hover":"rating-star"} icon={['fas', 'star']}
                   onMouseEnter={() => (!ratingStar2 || clickStar2) && (setRatingStar1(true),setRatingStar2(true),setRateComment("Fair"))}
                   onMouseLeave={() => clickStar2 ? (setRatingStar2(true),setRateComment("Fair")):(setRatingStar2(false),setRateComment("Poor"))}
                   onClick={() => (setClickStar2(true),setClickStar(false),setClickStar3(false),setClickStar4(false),setClickStar5(false))}
                   />
                  </span>  
                  <span>
                   <FontAwesomeIcon className={ratingStar3 || clickStar3 || clickStar4 || clickStar5 ? "rating-star-hover":"rating-star"} icon={['fas', 'star']}
                    onMouseEnter={() => !ratingStar3 && (setRatingStar1(true),setRatingStar2(true),setRatingStar3(true),setRateComment("Average"))}
                    onMouseLeave={() => ratingStar3 && (setRatingStar3(false),setRateComment("Fair"))}
                    onClick={() => (setClickStar3(true),setClickStar4(false),setClickStar5(false))}
                    />
                  </span>  
                  <span>
                   <FontAwesomeIcon className={ratingStar4 || clickStar4 || clickStar5 ? "rating-star-hover":"rating-star"} icon={['fas', 'star']}
                    onMouseEnter={() => !ratingStar4 && (setRatingStar1(true),setRatingStar2(true),setRatingStar3(true),setRatingStar4(true),setRateComment("Good"))}
                    onMouseLeave={() => ratingStar4 && (setRatingStar4(false),setRateComment("Average"))}
                    onClick={() => (setClickStar4(true),setClickStar5(false))}
                    />
                  </span>  
                  <span>
                   <FontAwesomeIcon className={ratingStar5 || clickStar5 ? "rating-star-hover":"rating-star"} icon={['fas', 'star']}
                    onMouseEnter={() => !ratingStar5 && (setRatingStar1(true),setRatingStar2(true),setRatingStar3(true),setRatingStar4(true),setRatingStar5(true),setRateComment("Excellent"))}
                    onMouseLeave={() => ratingStar5 && (setRatingStar5(false),setRateComment("Good"))}
                    onClick={() => setClickStar5(true)}
                    />
                  </span>
                 </div>
                  <div className="mx-4">{rateComment}</div>
               </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default AddReviewModal;