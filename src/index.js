import React from 'react';
import ReactDOM from 'react-dom';
import {Switch , BrowserRouter as Router , Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Login from './containers/login'
import Signup from './containers/signup';
import User from './containers/user';
import Products from './containers/products'
import Postproducts from './orders/postproducts'
import createProduct from './private/createProduct'
import showProduct from './private/showProduct'
import Cart from './orders/cart'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';
import {createStore , combineReducers , applyMiddleware}   from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import authReducer from "./reducer/authReducer";
import ProductReducer from './reducer/productReducer'

const rootReducer = combineReducers({auth: authReducer,prod : ProductReducer});
const store = createStore(rootReducer, applyMiddleware(logger,thunk));


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <Router>
      <Route path = '/login' component={Login}/>
      <Route path = '/signup' component={Signup}/>
      <Route path ='/user'  exact   component={User} />
      <Route path = '/postproducts' component = {Postproducts}/>
      <Route path = '/products' component = {Products} />
      <Route path ='/createproduct' component = {createProduct}/>
      <Route path = '/showproduct' component = {showProduct}/>
      <Route path = '/cart' component = {Cart} />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
