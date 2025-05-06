// 1:initial state
// 2: Action Object
// 3: reducer function
// 4: action function
// exporting reducer function and named export of action functions


//1

const initialStateCustomer = {
    fullName: '',
    nationalId: '',
    createdAt:''
}

//2

const ACTIONS_CUST = {
   createCustomer: 'customer/createCusomter',
    updateCustName:'customer/updateName',
}

//3
export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case ACTIONS_CUST.createCustomer:
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt:action.payload.createdAt,

            };
        case ACTIONS_CUST.updateCustName:
            return {
                ...state,
                fullName: action.payload,
            };
        
        default:
            return state;
    }
}
//4
function createCustomer(fullName, nationalId) {
    return {
        type: ACTIONS_CUST.createCustomer, payload: {
            fullName,
            nationalId,
            createdAt:new Date().toLocaleDateString()
    }}
};

function updateCustName(fullName) {
    return { type: ACTIONS_CUST.updateCustName, payload: fullName };
    
}
export { createCustomer, updateCustName };


