import React,{ Fragment } from 'react';
import Slide from './Slide';
import TopSneakers from './TopSneakers';


const Home = () => {
    return (
       <Fragment>
        <div className="container">
         <Slide/>         
        </div>
        <div className="newarrivalstitle">  
         <div >Top Sneakers</div>  
        </div>  
         <TopSneakers/>  
       </Fragment>  
    )
}

export default Home;