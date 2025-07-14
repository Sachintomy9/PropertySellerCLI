import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/PropertySlice';
import enquiryReducer from './slices/EnquirySlice';

export const store = configureStore({
  reducer: {
    enquiry: enquiryReducer,
    property: propertyReducer,
  },
});
