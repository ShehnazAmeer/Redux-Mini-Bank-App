//1:initial Object
//2:Action Object
//3:reducer function
//4:tiny Action functions
//5:export Action functions

//example
//1:initial Object
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading:false,

};

//2:initial Object

//stateDomain/EventName

const ACTIONS = {
    deposit: 'account/deposit',
    withdraw: 'account/withdraw',
    requestLoan: 'account/requestLoan',
    payLoan: 'account/payLoan',
    loading:'account/loading'
    
}
//3: reducer function

//reducers not allowed to do any asynchronous logic or modify any state date


export default function accountReducer(state=initialState,action){
    switch (action.type) {
        case ACTIONS.deposit:
            return {
                ...state,
                balance: state.balance + action.payload,
                loading:false,
            };
        
        case ACTIONS.withdraw:
            return {
                ...state,
                balance: state.balance-action.payload,
            };
        
        case ACTIONS.loading:
            return {
                ...state,
                loading:true,
            }
        
        case ACTIONS.requestLoan:
            if (state.loan > 0) return state;
            return {
                ...state,
                balance:state.balance+action.payload.amount,
                loan: action.payload.amount,
                loanPurpose:action.payload.purpose,
                
            }
        
        case ACTIONS.payLoan:
            return {
                ...state,
                loan: '',
                loanPurpose: '',
                balance: state.balance - state.loan
            }
            
        default:
            return state;
    }
    
};

//4: Action functions

function deposit(amount, currency) {
    if (currency !== 'USD') {
       return async function (dispatch, getState) {
         //api call
           try { 
               dispatch({ type: ACTIONS.loading})
                const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`);
            
                const data = await res.json();
         
                const convertedData = data.rates.USD;

                dispatch({ type:ACTIONS.deposit,payload:convertedData})
            }
            catch (error) {
                console.log(error);
            }  
        } 
    }

    return { type: ACTIONS.deposit, payload: amount}
   
}

function withdraw(amount) {
    console.log(amount);
    return {
        type:ACTIONS.withdraw,payload:amount
    }
}

function requestLoan(amount, purpose) {
    return {
        type: ACTIONS.requestLoan, payload: {
            amount,
            purpose,
        }
    }
}

function payloan() {
    return {
        type:ACTIONS.payLoan,
    }
}

//5.export Action functions

export { deposit, withdraw, requestLoan, payloan };