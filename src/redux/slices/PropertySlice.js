import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  property: null,
}; 

const propertySliceRed = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setPropertyRed: (state, action) => {
      state.property = action.payload;
    },
    clearProperty: (state) => {
      state.property = null;
    },
  },
});

export const { setPropertyRed, clearProperty } = propertySliceRed.actions;
export default propertySliceRed.reducer;
