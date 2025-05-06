// 1:initial state

import { createSlice } from "@reduxjs/toolkit"

//1
const initialState = {
    fullName: '',
    nationalId: '',
    createdAt:''
}

const cusomterSlice = createSlice({
    name: 'cusotmer',
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createAt: new Date().toLocaleDateString(),
                    },
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createAt;
            },
        },
        updateCustName(state, action) {
            state.fullName = action.payload;
        }
    }
});

export const { createCustomer, updateCustName } = cusomterSlice.actions;
export default cusomterSlice.reducer;

