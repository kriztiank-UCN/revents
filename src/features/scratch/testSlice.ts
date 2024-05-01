import { createSlice } from '@reduxjs/toolkit';

type State = {
    data: number
}

const initialState: State = {
    data: 42
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
      // Action creators are generated for each reducer function
        increment: (state) => {
            state.data += 1
        },
        decrement: (state) => {
            state.data -= 1
        },
        // the action is an object that can take a payload of data which will be added to the state and updated
        incrementByAmount: (state, action) => {
            state.data += action.payload
        }
    }
})
// export the action creators
export const {increment, decrement, incrementByAmount} = testSlice.actions