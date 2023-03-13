import { createSlice } from "@reduxjs/toolkit";

export const sliceIsUser = createSlice({
    // name of the state
    name: "isUser",
    initialState:{
        // value is a property of our state, we are setting the intial value of it
        value: false
    },
    reducers:{
        setIsUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setIsUser } = sliceIsUser.actions;

// Exporting the name of the state (the slice's reducer)
export default sliceIsUser.reducer;