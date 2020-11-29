import React from 'react';

const Preloader = () => {
    return (
       <div className="container d-flex justify-content-center">
        <div className="spinner-border spinner-border-sm text-warning" role="status"/>  
       </div>    
    )
}

export default Preloader;