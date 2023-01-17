// import cartData from './reducer'
import { combineReducers } from "redux";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./notesReducer";
// import  {userReduser}  from './userReducer';
import { userLoginReducer } from "./userReducer";
import { userRegisterReducer } from "./userReducer";


const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteList:noteListReducer,
    noteCreate:noteCreateReducer,
    noteUpdate:noteUpdateReducer,
    userLogout:userLoginReducer,
    noteDelete: noteDeleteReducer

})
export default rootReducer;