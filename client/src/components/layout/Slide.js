import React from 'react';
import banner1 from '../../images/jumbotronPhoto.jpg'
import banner2 from '../../images/jumbotronPhoto2.jpg'
import banner3 from '../../images/jumbotronPhoto3.jpg'

const Slide = () => {

    return (
      <div id="carouselExampleControls" className="carousel slide text-center container" data-ride="carousel">
       <div className="carousel-inner ">
       <div className="carousel-item active">
          <img src={banner1} className="d-block w-100" alt="..."/>
       </div>
       <div className="carousel-item">
          <img src={banner2} className="d-block w-100" alt="..."/>
       </div>
       <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="..."/>
       </div>
       </div>
     </div>       
    )
}

export default Slide;