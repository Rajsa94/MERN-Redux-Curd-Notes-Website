// import {  configureStore} from '@reduxjs/toolkit'
import { createStore, } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux'
import thunk from  "redux-thunk"
import rootReducer from './reducers/rootReducer'

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    
    
    
    composeWithDevTools(applyMiddleware(...middleware))
  );

  
  export default store;