import authReducer from "./auth-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import registrationReducer from "./registration-reducer";

let reducers = combineReducers({
   auth: authReducer,
   registration: registrationReducer,
   form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;