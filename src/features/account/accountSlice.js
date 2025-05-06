// 1:initial Object
// 2: import createSlice() from reduxToolkit and call it which accept object of options, it will return slice which we can named it as whatever it do e.g accountSlice or customerSlice.

import { createSlice } from "@reduxjs/toolkit";

// 3: options object will have name:nameofslice, initialState:initalState, reducers: multiple reducer each for a action

// 4: each reducer have the right name as action, takes arguments state,action

// 5: this createSlice() returns object which have new reducer and actions that we need to export


//1:initial Object
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading:false,

};


const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        loading(state) {
            state.isLoading = true;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose,
                   }
               }
            },
            reducer(state, action) {
            if (state.loan > 0) return;
            state.balance += action.payload.amount;
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
        }},
        payloan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        }
    }
});

console.log(accountSlice);

export default accountSlice.reducer;
export const { withdraw, loading, requestLoan, payloan } = accountSlice.actions;

//creating Thunk by using Action creator function

export function deposit(amount, currency){
    if (currency === 'USD') return { type: 'account/deposit', payload: amount };

    return async function (dispatch, getState) {
        try { 
            dispatch({type:'account/loading'})
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`);

            const data = await res.json();
            const newAmountUSD = data.rates.USD;

            dispatch({ type: 'account/deposit', payload: newAmountUSD });
        }
        catch (error) {
            console.log(error)
        }
    }
}


//remember:
/*
by default automatically created action creators only accept 1 single argument so that become action.payload

solution:

if the action is more than one value or the payload in object then we need to prepare that data before it reaches reducer

for that turn this action into key value and value is object
then add reducer function and add prepare() this will have all those arguments and return them as a new payload
*/


