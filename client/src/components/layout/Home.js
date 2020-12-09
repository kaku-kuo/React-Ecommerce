import React,{ Fragment } from 'react';
import Slide from './Slide';
import TopSneakers from './TopSneakers';


const Home = () => {
    return (
       <Fragment>
         <Slide/>         
        <div className="topSneakers">  
         <div>Top Sneakers</div>  
        </div>  
         <TopSneakers/>  
       </Fragment>  
    )
}

export default Home;