import React,{ useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser,userLogout } from '../actions/userActions';
import { setAlert } from '../actions/alertActions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bounce } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Preloader from '../layout/Preloader';

// For npunce animation
const Bounce = styled.div`animation:2s ${keyframes`${bounce}`} infinite`;

const Navbar = ({ user:{ token, userDe },cartItems, loadUser, userLogout, setAlert }) => {
const [displayBallJs, setDisplayBallJs] = useState(false);
const [displayBallKb, setDisplayBallKb] = useState(false);
const [displayBallLbj, setDisplayBallLbj] = useState(false);
const [displayBallRose, setDisplayBallJRose] = useState(false);


//Keep user login 
useEffect(() => {
   if(token){
     loadUser();
   }
  //eslint-disable-next-line 
},[token,cartItems]);

// User logout
const handleLogout = () => {
   userLogout();
   setAlert("Logout successfully!", "success");
};

    return (
       <Fragment>   
        <nav className="navbar navbar-light">
          <div className="mx-sm-0 mx-auto">
           <Link to="/" className="navbar navbar-brand">
             <FontAwesomeIcon className="basketballLogo mr-1" icon={['fas', 'basketball-ball']}/>
              HOOP CLUB
           </Link>
          </div>
          <div className="mx-sm-0 mx-auto">   
           <Link to="/cart" style={{position:"relative"}}>
            <FontAwesomeIcon className="carticon" icon={['fas', 'shopping-cart']}/>
            {cartItems.length > 0 ? <span className="num-in-cart"><span style={{position:"relative",bottom:"3px"}}>{cartItems.length}</span></span>
            :
            null
            }            
           </Link>   

          {localStorage.name && localStorage.token ? 
          <div className="signIn dropdown d-inline-block">
           <Link className="nav-link dropdown-toggle" style={{color:"black",padding:0}} data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">
            {localStorage.name}
           </Link>                 
           <div className="dropdown-menu">
           {userDe ? 
            <div> 
            <a className="dropdown-item" href="/profile">Profile</a>
             {userDe.isAdmin && <Link className="dropdown-item" to="/admin/page/1">Admin</Link>}
             <Link className="dropdown-item" to="#" onClick={handleLogout}>Log out</Link>
            </div>
             :  
            <Preloader/>}
           </div>
          </div>       
          :
          <Link className="signIn" to="/login">Login</Link>}
          </div>
        </nav>


        <ul className="category">  
           <li onMouseEnter={() => setDisplayBallJs(true)} onMouseLeave={() => setDisplayBallJs(false)}>
           <Bounce>   
            <FontAwesomeIcon style={{fontSize:"20px"}}  className={displayBallJs ? "basketballLogo":"basketballLogohide"} icon={['fas', 'basketball-ball']}/>
           </Bounce>    
            <Link to="/productlist/jordan/page/1">                        
             JORDAN
            </Link>            
           </li>
           <li onMouseEnter={() => setDisplayBallKb(true)} onMouseLeave={() => setDisplayBallKb(false)}>
           <Bounce>   
            <FontAwesomeIcon style={{fontSize:"20px"}}  className={displayBallKb ? "basketballLogo":"basketballLogohide"} icon={['fas', 'basketball-ball']}/>
           </Bounce>  
            <Link to="/productlist/kobe/page/1">
             KOBE
            </Link>            
           </li>  
           <li onMouseEnter={() => setDisplayBallLbj(true)} onMouseLeave={() => setDisplayBallLbj(false)}>
           <Bounce>    
            <FontAwesomeIcon style={{fontSize:"20px"}}  className={displayBallLbj ? "basketballLogo":"basketballLogohide"} icon={['fas', 'basketball-ball']}/>
           </Bounce>    
            <Link to="/productlist/lbj/page/1">
             LBJ
            </Link>            
           </li>  
           <li onMouseEnter={() => setDisplayBallJRose(true)} onMouseLeave={() => setDisplayBallJRose(false)}>
           <Bounce>  
            <FontAwesomeIcon style={{fontSize:"20px"}}  className={displayBallRose ? "basketballLogo":"basketballLogohide"} icon={['fas', 'basketball-ball']}/>
           </Bounce>   
            <Link to="/productlist/drose/page/1">            
             D.ROSE
            </Link>            
           </li>
         </ul> 
       </Fragment>   

    )
}


Navbar.propTypes ={
  user:PropTypes.object.isRequired,
  cartItems:PropTypes.array.isRequired,
  loadUser:PropTypes.func.isRequired,
  userLogout:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired
};


const mapStateToProps = state => ({
   user:state.user,
   cartItems:state.cart.cartItems
});


export default connect(mapStateToProps,{ loadUser ,userLogout, setAlert })(Navbar);