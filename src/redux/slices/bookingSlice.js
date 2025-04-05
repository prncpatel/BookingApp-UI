import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newBookingDetails: null,
    allBookingDetails: [],
};

const bookingSlice = createSlice({
    name: "booking",
    initialState: initialState,
    reducers: {
        addNewbookingDetails: (state, action) => {
            state.newBookingDetails = action.payload;
        },
        getAllBookingDetails: (state, action) => {
            state.allBookingDetails = action.payload;
        }
    }
});

export const { addNewbookingDetails, getAllBookingDetails, } = bookingSlice.actions;
export default bookingSlice.reducer