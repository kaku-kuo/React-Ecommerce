import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import ProductList from './components/productPages/ProductList';
import ProductDetails from './components/productPages/ProductDetails';
import Cart from './components/checkout/Cart';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/user/UserProfile';
import Shipping from './components/checkout/Shipping';
import Payment from './components/checkout/Payment';
import PlaceOrder from './components/checkout/PlaceOrder';
import Order from './components/order/Order';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import AddProductModal from './components/productPages/AddProductModal';



library.add(far,fab,fas);

const App = () => {
  return (
  <Provider store={store}> 
   <BrowserRouter> 
    <div className="App">
     <div className="container"> 
      <Navbar/> 
     </div>
     <Alert/>
     <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/productlist" component={ProductList}/>
      <Route exact path="/productlist/:id" component={ProductDetails}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <PrivateRoute exact path="/profile" component={UserProfile}/>
      <PrivateRoute exact path="/shipping" component={Shipping}/>
      <PrivateRoute exact path="/payment" component={Payment}/>
      <PrivateRoute exact path="/placeorder" component={PlaceOrder}/>
      <PrivateRoute exact path="/order/:id" component={Order}/>
     </Switch>   
      <AddProductModal/>
    </div>
    <Footer/>   
   </BrowserRouter>
  </Provider>  
  );
}

export default App;
