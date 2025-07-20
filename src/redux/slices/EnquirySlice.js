import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enquiry: false,    // First boolean (default: false)
  isSubmitted: false, // Second boolean (default: false)
};

const enquirySliceRed = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    // Toggles/updates `enquiry`
    setEnquiry: (state, action) => {
      state.enquiry = action.payload; // Expects boolean (true/false)
    },
    // Toggles/updates `isSubmitted`
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload; // Expects boolean (true/false)
    },
    // Resets BOTH variables to false
    clearEnquiry: (state) => {
      state.enquiry = false;
      state.isSubmitted = false;
    },
  },
});

// Export actions
export const { setEnquiry, setIsSubmitted, clearEnquiry } = enquirySliceRed.actions;
// Export reducer
export default enquirySliceRed.reducer;