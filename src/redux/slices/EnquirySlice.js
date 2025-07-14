import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enquiry: null,
};

const enquirySliceRed = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    setEnquiry: (state, action) => {
      state.property = action.payload;
    },
    clearEnquiry: (state) => {
      state.property = null;
    },
  },
});

export const { setEnquiry, clearEnquiry } = enquirySliceRed.actions;
export default enquirySliceRed.reducer;
