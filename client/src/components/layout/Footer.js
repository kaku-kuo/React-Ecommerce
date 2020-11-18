import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
    <div className="footer">
      <hr/>  
      <div className="container containerinfooter">
       <FontAwesomeIcon className="footerbasketballLogo" icon={['fas', 'basketball-ball']}/>  
        <div className="info1">       
         <div className="location">Location: Taiwan, Taipei</div> 
         <div className="businesshour">Business Hour: 13:00-22:00</div>              
        </div>       
        <div className="info2">       
         <div className="">Project Owner: Alan Kuo</div>             
        </div>
      </div>
      <p className="copyright">KAKU Tech All Rights Reserved</p>
    </div>
    )
}

export default Footer;