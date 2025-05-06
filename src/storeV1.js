// 1: import createStore and combineRducers from Redux
import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; 
   


// 2: on combineReducer function passed object of all reducers name it a rootREducer
const rootReducer = combineReducers({
    account: accountReducer,
    customer:customerReducer,
    
});

// 3: call createStore passed that rootReducer;
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));


// 4: export that store
export default store;