import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser,userLogout } from '../actions/userActions';
import { setAlert } from '../actions/alertActions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Preloader from '../layout/Preloader';


const Navbar = ({ user:{ token, userDe },cartItems, loadUser, userLogout, setAlert }) => {

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
       <div>   
        <nav className="navbar navbar-light">
          <div>
           <Link to="/" className="navbar navbar-brand">
             <FontAwesomeIcon className="basketballLogo" icon={['fas', 'basketball-ball']}/>
              HOOP CLUB
           </Link>
          </div>
          <div>   
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
             {userDe.isAdmin && <Link className="dropdown-item" to="/admin">Admin</Link>}
             <Link className="dropdown-item" to="#" onClick={handleLogout}>Log out</Link>
            </div>
             :  
            <Preloader/>}
           </div>
          </div>       
          :
          <Link className="signIn" to="/login">Login</Link>
          }
          </div>
        </nav>


        <ul className="category">
           <li>             
            <Link to="/productlist/jordan">
            <FontAwesomeIcon className="basketballLogo" icon={['fas', 'basketball-ball']}/>     
             JORDAN
            </Link>            
           </li>
           <li>
            <Link to="/productlist/kobe">
             KOBE
            </Link>            
           </li>  
           <li>
            <Link to="/productlist/lbj">
             LBJ
            </Link>            
           </li>  
           <li>
            <Link to="/productlist/drose">            
             D.ROSE
            </Link>            
           </li>    
         </ul> 
       </div>   

    )
}


Navbar.propTypes ={
  user:PropTypes.object.isRequired,
  cartItems:PropTypes.array.isRequired,
  loadUser:PropTypes.func.isRequired,
  userLogout:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired
}


const mapStateToProps = state => ({
   user:state.user,
   cartItems:state.cart.cartItems
});


export default connect(mapStateToProps,{ loadUser,userLogout,setAlert })(Navbar);