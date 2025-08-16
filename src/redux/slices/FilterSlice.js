// src/store/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  emirateId: '',
  emirateName:'',
  cityId: '',
  cityName: '',
  developers: '',
  facilities: '',
  completionType: 'all',
  projectTypeFirst: 'off-plan-projects',
  projectTypeLast: 'all',
  propertyType: '',
  priceMin: '',
  priceMax: '',
  areaMin: '',
  areaMax: '',
  beds: '',
  handoverYear: '',
  handoverQuarter: '',
  paymentPlan: '',
  discount: 'all',
  furnishing: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { updateFilter, setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
