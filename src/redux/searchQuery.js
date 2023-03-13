import { createSlice } from "@reduxjs/toolkit";

export const sliceSearchQuery = createSlice({
    // name of the state
    name: "searchQuery",
    initialState:{
        // value is a property of our state, we are setting the intial value of it
        value: {}
    },
    reducers:{
        setSearchQuery: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSearchQuery } = sliceSearchQuery.actions;

// Exporting the name of the state (the slice's reducer)
export default sliceSearchQuery.reducer;