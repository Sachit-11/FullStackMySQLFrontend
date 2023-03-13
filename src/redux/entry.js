import { createSlice } from "@reduxjs/toolkit";

export const sliceEntry = createSlice({
    // name of the state
    name: "entry",
    initialState:{
        // value is a property of our state, we are setting the intial value of it
        value: [false, "Sign In"]
    },
    reducers:{
        setEntry: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setEntry } = sliceEntry.actions;

// Exporting the name of the state (the slice's reducer)
export default sliceEntry.reducer;