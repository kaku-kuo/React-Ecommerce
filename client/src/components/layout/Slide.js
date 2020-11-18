import React from 'react';
import banner1 from '../../images/jumbotronPhoto.jpg'
import banner2 from '../../images/jumbotronPhoto2.jpg'
import banner3 from '../../images/jumbotronPhoto3.jpg'

const Slide = () => {

    return (
      <div id="carouselExampleControls" className="carousel slide text-center" data-ride="carousel">
       <div className="carousel-inner">
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
       <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
       </a>
       <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
       </a>
     </div>
         
    )
}

export default Slide;