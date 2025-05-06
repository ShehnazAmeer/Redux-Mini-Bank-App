// 1: import createStore and combineRducers from Redux
import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customer/customerSlice";

// 2: import configureStore from redux tool kit
import { configureStore } from "@reduxjs/toolkit";

// 3: provide object, add rootReducer Provided by configureStore

// 4: and to that reducer provide object of customReducers

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer:customerReducer,
    }
    
});

export default store;
