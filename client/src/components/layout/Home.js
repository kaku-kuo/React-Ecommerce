import React,{ Fragment } from 'react';
import Slide from './Slide';
import NewArrivals from './NewArrivals';


const Home = () => {
    return (
       <Fragment>
        <div className="container">
         <Slide/>         
        </div>
        <div className="newarrivalstitle">  
         <div >Top Sneakers</div>  
        </div>  
         <NewArrivals/>  
       </Fragment>  
    )
}

export default Home;